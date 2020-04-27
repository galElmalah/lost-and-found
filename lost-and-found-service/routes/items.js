const express = require('express');
const router = express.Router();
const { extractUserDetails } = require('../middlewares/extractUserDetails');
const DB = require('../model/DB');

router.use(extractUserDetails);

router.get('/', async (req, res, next) => {
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
  const id = await DB.mapEntries().add(req.body.item);
  res.status(201).send({ id });
});

module.exports = router;
