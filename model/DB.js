const mongoose = require('mongoose');
const { MapEntriesDb } = require('./DBs/MapEntriesDb');
const { LabelsDb } = require('./DBs/LabelsDb');

module.exports = class DB {
  static mapEntries() {
    return MapEntriesDb;
  }

  static labels() {
    return LabelsDb;
  }

  static users() {
    return UsersDb;
  }

  static connect({ port, user, password,mongoUri }) {
    return mongoose.connect(mongoUri, {
      useNewUrlParser: true,
    });
  }
};
