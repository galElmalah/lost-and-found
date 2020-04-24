var express = require('express');
var router = express.Router();
const DB = require('../model/DB');
const verifyLogin = (req, res, next) => {
  console.log(process.env);
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  const token = req.something; // pass the token here somewhow
  console.log('decode token and verify something');
  req.userId = email;
  // if logged in next() else send 403
};
router.use(verifyLogin);

router.get('/', async (req, res, next) => {
  try {
    const entries = await DB.mapEntries().getAll();
    res.send(entries);
  } catch (e) {
    console.error(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const entries = await DB.mapEntries().getById(req.params.id);
  res.send(entries);
});

router.post('/', async (req, res, next) => {
  const id = await DB.mapEntries().add(req.body.item);
  res.status(201).send({ id });
});

module.exports = router;
