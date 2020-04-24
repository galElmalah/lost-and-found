const mongoose = require('mongoose');
const {MapEntryModel} = require('./MapEntryModel')
const db = [];
module.exports = class DB {

  static async getById(id) {
    return db.find(entry => entry.id === id)
  }

  static async getAll() {
    console.log(MapEntryModel)
    return MapEntryModel.find({})
  }

  static async add(item) {
    console.log({item})
    const mapEntry = new MapEntryModel(item)
    return mapEntry.save()
  }

  static async connect({port,user,password}) {
    return mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
  }

}

