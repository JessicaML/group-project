module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "bookclub",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "bookclub_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "bookclub_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
