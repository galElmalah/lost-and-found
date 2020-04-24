var express = require('express');
var router = express.Router();
const DB = require('../model/DB')

router.get('/', async (req, res, next) => {
  try {
  const entries = await DB.mapEntries().getAll() 
  res.send(entries);
  } catch(e){
    console.error(e)
  }
});

router.get('/:id', async (req, res, next) => {
  const entries = await DB.mapEntries().getById(req.params.id)
  res.send(entries);
});

router.post('/', async (req, res, next) => {
  const id = await DB.mapEntries().add(req.body.item)
  res.status(201).send({id})
});

module.exports = router;
