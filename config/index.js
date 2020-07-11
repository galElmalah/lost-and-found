module.exports = {
  server: {
    port: process.env.PORT || 3001,
  },
  db: {
    port: process.env.DB_PORT || 3002,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    uri: process.env.MONGODB_URI || 'mongodb://localhost/test',
  },
};
