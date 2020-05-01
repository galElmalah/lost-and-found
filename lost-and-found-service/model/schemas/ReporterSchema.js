const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.MapEntrySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});
