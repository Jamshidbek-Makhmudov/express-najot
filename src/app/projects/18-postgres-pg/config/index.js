require("dotenv/config");

const {env} = process;

const config = {
  PORT: env.PORT,
};

module.exports = config;
