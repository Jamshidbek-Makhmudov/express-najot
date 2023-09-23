require("dotenv/config");

const {env} = process;

const config = {
  port: env.PORT,
  dbUrl: env.DB_URL,
};

module.exports = config;
