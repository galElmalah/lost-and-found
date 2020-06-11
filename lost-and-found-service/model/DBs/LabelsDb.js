module.exports.LabelsDb = class LabelsDb {
  static getAll() {
    const labels = {
      animales: ['dog', 'cat'],
      miscs: ['keys', 'etc'],
    };
    return Promise.resolve(labels);
  }
};
