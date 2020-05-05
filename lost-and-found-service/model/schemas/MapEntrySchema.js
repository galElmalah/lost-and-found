const PointSchema = require('./PointSchema');
const ReporterSchema = require('./ReporterSchema');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entriesTypes = ['lost', 'found'];

const MatchSchema = new Schema({
  matchedWithEntryId: { type: String, required: true },
  seen: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
});
module.exports.MapEntrySchema = new Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  lostOrFoundAt: { type: Date, default: Date.now },
  reporter: { type: ReporterSchema, required: true },
  entryType: {
    type: String,
    enum: entriesTypes,
  },
  labels: [String],
  color: String,
  location: {
    type: PointSchema,
    required: true,
  },
  matches: {
    type: [MatchSchema],
    default: [],
  },
});
