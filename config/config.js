module.exports = {
  "development": {
    "username": "mike",
    "password": process.env.YOUR_PASSWORD,
    "database": "book-project",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "test",
    "password": null,
    "database": "blog-app",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "test",
    "password": null,
    "database": "blog-app",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
