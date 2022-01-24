export default {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "username": process.env.DB_USERNAME,
  "password": null,
  "database": process.env.DB_DATABASE,
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migrations/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "./src/entity/",
    "migrationsDir": "./src/migrations/",
    "subscribersDir": "./src/subscriber/"
  }
}