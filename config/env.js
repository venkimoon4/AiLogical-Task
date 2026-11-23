const dotenv = require("dotenv");

const mode = "dev"; // production || dev

if (mode === "production") {
  dotenv.config();
} else {
  dotenv.config({ path: `./.env.${mode}` });
}

module.exports = {
  MODE: mode,

  PORT: process.env.PORT,

  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USER_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: "postgres",

  AUTH_SECRET: process.env.AUTH_SECRET,
};
