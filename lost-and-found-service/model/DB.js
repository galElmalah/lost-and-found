const mongoose = require('mongoose');
const { MapEntriesDb } = require('./DBs/MapEntriesDb');
const { MatchesDb } = require('./DBs/MatchesDb');

module.exports = class DB {
  static mapEntries() {
    return MapEntriesDb;
  }

  static users() {
    return UsersDb;
  }

  static connect({ port, user, password }) {
    return mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
    });
  }
};
