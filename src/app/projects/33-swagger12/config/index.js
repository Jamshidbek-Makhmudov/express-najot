require("dotenv/config");

const {env} = process;

const config = {
  port: env.PORT,
  dbUrl: env.DB_URL,
  jwtSecret: env.JWT_SECRET,
};

module.exports = config;
