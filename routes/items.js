const express = require('express');
const { applyFilters } = require('./filters');
const router = express.Router();
const { extractUserDetails } = require('../middlewares/extractUserDetails');
const DB = require('../model/DB');
const { calcMatchScore } = require('./calcMatchScore');

router.use(extractUserDetails);

const findMatches = async (entry) => {
  const {
    location,
    entryType: type,
    reporter: { id },
  } = entry;
  const entriesWithinRange = await DB.mapEntries().getEntriesWithOpositeTypesWithinRadius(
    { type, location, reporterId: id }
  );

  const toMatchShape = (_entry) => ({
    matchedWithEntryId: _entry._id,
    seen: false,
    score: calcMatchScore(entry, _entry),
    location: _entry.location || [],
  });

  hasPositiveScore = (e) => e.score > 0;

  return entriesWithinRange.map(toMatchShape).filter(hasPositiveScore);
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
      .status(403)
      .send({ message: 'You must be logged in you stupid fuck' });
  }

  const entries = await DB.mapEntries().getById(req.params.id);
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
  } catch (e) {
    console.error(e);
  }
  entry = await DB.mapEntries().getById(entry._id);
  res.status(201).send(entry);
});

router.delete('/:id', async (req, res, next) => {
  try {
    let entry = await DB.mapEntries().delete(req.params.id);
    res.status(200).send(req.params.id);
  } catch (e) {
    res.status(403).send(req.params.id);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { user, ...item } = req.body;
    let entry = await DB.mapEntries().updateItem(req.params.id, item);
    console.log({ entry });
    res.status(200).send(req.params.id);
  } catch (e) {
    console.log(e);
    res.status(403).send(req.params.id);
  }
});
module.exports = router;
