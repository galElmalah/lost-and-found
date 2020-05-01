const { MapEntryModel } = require('../models/MapEntryModel');

module.exports.MapEntriesDb = class MapEntryDb {
  static getById(id) {
    return MapEntryModel.find({ where: id });
  }

  static getAll() {
    return MapEntryModel.find({});
  }

  static getUserMatches(userId) {
    return;
  }

  static getEntriesWithOpositeTypesWithinRadius({
    type,
    location,
    radius = 20,
  }) {
    const kmToMiles = (distanceInKm) => distanceInKm / 1.609;
    return MapEntryModel.find(
      {
        entryType: {
          $ne: type,
        },
        location: {
          $geoWithin: {
            $centerSphere: [location, kmToMiles(radius) / 3963.2],
          },
        },
      },
      {
        _d: 1,
      }
    );
  }

  static getAllInRadius(radius) {
    return MapEntryModel.find({});
  }

  static updateMatchesForSpecificId({ matches: _matches, matchedWith }) {
    return MapEntryModel.updateOne(
      {
        _id: {
          $eq: matchedWith,
        },
      },
      {
        $push: { matches: _matches },
      }
    );
  }

  static updateMatchesByIds({ matches: _matches, matchedWith }) {
    const updatePromises = [];
    _matches.forEach(({ matchedWithEntryId, score }) => {
      updatePromises.push(
        MapEntryModel.updateOne(
          {
            _id: { $eq: matchedWithEntryId },
          },
          {
            $push: {
              matches: { score, matchedWithEntryId: matchedWith },
            },
          }
        )
      );
    });
    return Promise.all(updatePromises);
  }

  static add(item, user) {
    const mapEntry = new MapEntryModel({
      ...item,
      reporter: {
        id: user.googleId,
        name: user.name,
      },
    });
    return mapEntry.save();
  }
};
