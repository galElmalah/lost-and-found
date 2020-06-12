module.exports.LabelsDb = class LabelsDb {
  static getAll() {
    const labels = {
      animales: ['dog', 'cat', 'rabbit',],
      miscs: ['keys', 'wallet', 'glasses', 'gloves', 'watch',],
      electronic: ['phone', 'laptopt', 'electric bicycle', 'phone charger',
        'headphone', ],
      value: ['money', 'bank card',],
      jewellery: ['earrings', 'ring', 'necklace', 'bracelet']
    };
    return Promise.resolve(labels);
  }
};
