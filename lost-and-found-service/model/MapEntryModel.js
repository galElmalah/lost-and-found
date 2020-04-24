const schemas = require('./schemas');
const mongoose = require('mongoose');

module.exports.MapEntryModel = mongoose.model('MapEntryModel', schemas.MapEntrySchema);
