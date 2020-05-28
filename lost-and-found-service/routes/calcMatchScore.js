const geoLib = require('geolib');

const metersToKm = (distanceInMeters) => distanceInMeters / 1000;
const calcDistanceScore = (l1, l2) => {
  const tolatObject = ([lat, lang]) => ({ latitude: lat, longitude: lang });
  const distance = geoLib.getDistance(tolatObject(l1), tolatObject(l2));

  return Math.max(0, 15 - metersToKm(distance));
};
module.exports.calcMatchScore = (originEntry, entry) => {
  // console.log(originEntry);
  const distanceScore = calcDistanceScore(originEntry.location, entry.location);
  console.log(Date.parse(originEntry.createdAt) - Date.parse(entry.createdAt));
  const dateScore = Math.floor(
    (Date.parse(originEntry.createdAt) - Date.parse(entry.createdAt)) / 86400000
  );

  console.log({ distanceScore, dateScore });
};
