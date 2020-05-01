const {MapEntryModel} = require('../models/MapEntryModel')


module.exports.MapEntriesDb = class MapEntryDb {

  static getById(id) {
    return MapEntryModel.find({where: id})
  }

  static getAll() {
    return MapEntryModel.find({})
  }

  static getAllInRadius(radius) {
    return MapEntryModel.find({})
  }

  static add(item) {
    const mapEntry = new MapEntryModel(item)
    return mapEntry.save()
  }

}