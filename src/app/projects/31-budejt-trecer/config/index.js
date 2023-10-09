require("dotenv/config");

const {env} = process;

const config = {
  port: env.PORT,
  dbUrl: env.DB_URL,
  JSW_KEY: env.JSW_KEY
};

module.exports = config;
