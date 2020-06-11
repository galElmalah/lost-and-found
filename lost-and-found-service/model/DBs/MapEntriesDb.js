const { MapEntryModel } = require('../models/MapEntryModel');

const kmToMiles = (distanceInKm) => distanceInKm / 1.609;

const EARTH_RADIUS = 3963.2;
module.exports.MapEntriesDb = class MapEntryDb {
  static getById(id) {
    return MapEntryModel.find(id);
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
    reporterId,
    radius = 20,
  }) {
    return MapEntryModel.find(
      {
        entryType: {
          $ne: type,
        },
        'reporter.id': {
          $ne: reporterId,
        },
        location: {
          $geoWithin: {
            $centerSphere: [location, kmToMiles(radius) / EARTH_RADIUS],
          },
        },
      },
      {
        location: 1,
        createdAt: 1,
        labels: 1,
        color: 1,
        _d: 1,
      }
    );
  }

  static getAllInRadius(location = [31.78123199999997, 34.7], radius) {
    return MapEntryModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [location, kmToMiles(radius) / 3963.2],
        },
      },
    });
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
    _matches.forEach(({ matchedWithEntryId, score, location }) => {
      updatePromises.push(
        MapEntryModel.updateOne(
          {
            _id: { $eq: matchedWithEntryId },
          },
          {
            $push: {
              matches: {
                score,
                matchedWithEntryId: matchedWith,
                location,
              },
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
