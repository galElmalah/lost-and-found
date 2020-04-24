const PointSchema = require('./PointSchema')
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const entriesTypes = ['lost', 'found']

module.exports.MapEntrySchema = new Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  reporterId: String,
  entryType: {
    type: String,
    enum: entriesTypes
  },
  labels: [String],
  location: {
    type: PointSchema,
    required: true
  }
});