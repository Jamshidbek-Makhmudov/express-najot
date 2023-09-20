require("dotenv/config");

const {env} = process;

const config = {
  PORT: env.PORT,
  DB_URL: env.DB_LOCAL_PAYME,
};

module.exports = config;
