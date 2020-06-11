var express = require('express');
var router = express.Router();
const db = require('../model/DB');
/* GET home page. */
console.log({ db });
router.get('/labels', async (req, res, next) => {
  const l = await db.labels().getAll();
  res.send(l);
});
module.exports = router;
