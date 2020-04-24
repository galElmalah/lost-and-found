const mongoose = require('mongoose');
const {MapEntriesDb} = require('./DBs/MapEntriesDb')
const {UsersDb} = require('./DBs/UsersDb')

module.exports = class DB {

  static mapEntries() {
    return MapEntriesDb
  }
  
  static users() {
    return UsersDb
  }

  static async connect({port,user,password}) {
    return mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
  }

}

