require("dotenv/config");

const {env} = process;

const config = {
  port: env.PORT,
};

module.exports = config;
