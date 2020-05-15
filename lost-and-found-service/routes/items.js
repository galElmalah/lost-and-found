const express = require('express');
const { applyFilters } = require('./filters');
const router = express.Router();
const { extractUserDetails } = require('../middlewares/extractUserDetails');
const DB = require('../model/DB');

router.use(extractUserDetails);

const findMatches = async (entry) => {
  const { location, entryType: type } = entry;
  const entriesWithinRange = await DB.mapEntries().getEntriesWithOpositeTypesWithinRadius(
    { type, location }
  );
  const toMatchShape = (entry) => ({
    matchedWithEntryId: entry._id,
    seen: false,
    score: Math.random() * 100,
  });

  return entriesWithinRange.map(toMatchShape);
};

router.get('/', async (req, res, next) => {
  if (req.query.range) {
    const entriesInRange = await DB.mapEntries().getAllInRadius(
      undefined,
      req.query.range
    );

    const entriesAfterFilters = applyFilters(req.query, entriesInRange);

    res.send(entriesAfterFilters);

    return;
  }
  try {
    const entries = await DB.mapEntries().getAll();
    res.send(entries);
  } catch (e) {
    console.error(e);
  }
});

router.get('/:id', async (req, res, next) => {
  if (!req.user.userId) {
    return res
      .statusCode(403)
      .send({ message: 'You must be logged in you stupid fuck' });
  }

  const entries = await DB.mapEntries().getByUserId(req.user.userId);
  res.send(entries);
});

router.post('/', async (req, res, next) => {
  let entry = await DB.mapEntries().add(req.body.item, req.user);
  try {
    const matches = await findMatches(entry);
    await Promise.all([
      DB.mapEntries().updateMatchesByIds({
        matches,
        matchedWith: entry._id,
      }),
      DB.mapEntries().updateMatchesForSpecificId({
        matches,
        matchedWith: entry._id,
      }),
    ]);
  } catch (e) {}
  entry = await DB.mapEntries().getById(entry._id);
  res.status(201).send(entry);
});

module.exports = router;
