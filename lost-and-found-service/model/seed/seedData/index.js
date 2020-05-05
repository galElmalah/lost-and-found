module.exports.mapEntriesSeedData = mapEntriesSeedData = [
  {
    name: 'example 1',
    description: 'A big key with 3 holes',
    location: [31.78123199999997, 34.7],
    reporter: { id: 123, name: 'gal' },
    entryType: 'lost',
    color: '#FF6900'
  },
  {
    name: 'example 2',
    description: 'A big key with 3 holes and also the color key is blue',
    location: [31.8, 34.6899093],
    reporter: { id: 123, name: 'gal' },
    entryType: 'found',
    color: '#FF6900'

  },
  {
    name: 'example 3',
    description: 'A big key with 3 holes and also the color key is blue',
    location: [31.7, 34.6899093],
    reporter: { id: 1234, name: 'yoel' },
    entryType: 'lost',
    color: '#F78DA7'
  },
  {
    name: 'example 4',
    description: 'A big key with 3 holes',
    location: [31.9, 34.6899093],
    reporter: { id: 1234, name: 'yoel' },
    labels: ['keys', 'red'],
    entryType: 'found',
    color: '#F78DA7'
  },
];
