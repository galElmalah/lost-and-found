var express = require('express');
var router = express.Router();
const DB = require('../model/DB')

router.get('/', async (req, res, next) => {
  const entries = await DB.getAll()
  res.send(entries);
});

router.get('/:id', async (req, res, next) => {
  const entries = await DB.getById(req.params.id)
  res.send(entries);
});

router.post('/', async (req, res, next) => {
  const id = await DB.add(req.body.item)
  res.status(201).send({id})
});

module.exports = router;
