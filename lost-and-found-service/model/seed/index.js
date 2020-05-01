const seeder = require('mongoose-seed');
const seedData = require('./seedData');

seeder.connect('mongodb://localhost/test', function () {
  // Load Mongoose models
  seeder.loadModels(['./model/models/MapEntryModel.js']);

  // Clear specified collections
  seeder.clearModels(['MapEntryModel'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function (err, dons) {
      if (err) {
        console.error(`something went wrond while seeding::${err}`);
      }
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'MapEntryModel',
    documents: seedData.mapEntriesSeedData,
  },
];
