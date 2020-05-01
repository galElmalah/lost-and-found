const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.MatchesSchema = new Schema({
  userId: { type: String, required: true },
  entryId: { type: String, required: true },
  matches: { type: [String], required: true },
});
