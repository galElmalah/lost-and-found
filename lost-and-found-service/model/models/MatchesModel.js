const schemas = require('../schemas');
const mongoose = require('mongoose');


module.exports.MatchesModel = mongoose.model('MatchesModel', schemas.MatchesSchema);
