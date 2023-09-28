require("dotenv").config();

const {env} = process;

module.exports = {
  port: env.PORT,
  dbUri: env.DB_LOCAL_URI,
  jwtSecret: env.JWT_SECRET,
  expToken: env.EXP_TOKEN,
};
