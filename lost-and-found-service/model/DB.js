const mongoose = require('mongoose');
const { MapEntriesDb } = require('./DBs/MapEntriesDb');

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
