const geoLib = require('geolib');
const stringSimilarity = require('string-similarity');

const calcDocDistanceScore = (desc1 = '', desc2 = '') => {
  console.log({ desc1, desc2 });
  if (!desc1 || !desc2) {
    return 0;
  }
  return stringSimilarity.compareTwoStrings(desc1, desc2) * 10;
};

const metersToKm = (distanceInMeters) => distanceInMeters / 1000;
const calcDistanceScore = (l1, l2) => {
  const tolatObject = ([lat, lang]) => ({ latitude: lat, longitude: lang });
  const distance = geoLib.getDistance(tolatObject(l1), tolatObject(l2));

  return Math.max(0, 15 - metersToKm(distance));
};

const calcDateScore = (d1, d2) => {
  console.log({ d1, d2 });
  const score = Math.floor(
    Math.abs(Date.parse(d1) - Date.parse(d2)) / 86400000
  );

  if (score > 15 || score < 0) {
    return 0;
  }
  return 15 - score;
};

const calcLabelsMatchStrengthScore = (l1, l2) => {
  for (let label of l1) {
    if (label !== 'other' && l2.includes(label)) {
      return 30;
    }
  }
  if (l1.some((l) => l === 'other') || l2.some((l) => l === 'other')) {
    return 0;
  }
  return -100;
};
const calcColorMatchScore = (c1, c2) => {
  return c1 === c2 ? 5 : 0;
};

module.exports.calcMatchScore = (originEntry, entry) => {
  const distanceScore = calcDistanceScore(originEntry.location, entry.location);
  const dateScore = calcDateScore(originEntry.createdAt, entry.createdAt);
  const labelsMatchStrengthScore = calcLabelsMatchStrengthScore(
    originEntry.labels,
    entry.labels
  );
  const colorScore = calcColorMatchScore(originEntry.color, entry.color);
  const docsDescriptionDistanceScore = calcDocDistanceScore(
    originEntry.description,
    entry.description
  );

  return (
    distanceScore +
    dateScore +
    labelsMatchStrengthScore +
    colorScore +
    docsDescriptionDistanceScore
  ).toFixed(1);
};
