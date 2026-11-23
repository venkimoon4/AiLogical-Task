const { Sequelize } = require("sequelize");
const { Client } = require("pg");
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
} = require("./env");

const client = new Client({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DIALECT,
});

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  post: DB_PORT,
  logging: false,
  dialect: DB_DIALECT,
});

(async () => {
  try {
    await client.connect();
    const query = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`,
    );
    if (query.rowCount === 0) {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log("Database Created Successfully");
    }
    await db.authenticate();
    await db.sync();
    console.log("Connected To Database Successfully");
  } catch (error) {
    console.error(`Error in connecting to database (error:${error.message})`);
    throw error;
  } finally {
    await client.end();
  }
})();

module.exports = db;
