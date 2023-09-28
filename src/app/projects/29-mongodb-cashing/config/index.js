require("dotenv/config");

const {env} = process;

const config = {
  port: env.PORT,
  mongoUri: env.MONGO_URI,
  jwtSecret: env.JWT_SECRET,
  expiresToken: env.EXPIRES_TOKEN,
  smtp: {
    host: env.SMTP_HOST,
    password: env.SMTP_PASSWORD,
    port: env.SMTP_PORT,
    mail: env.SMTP_MAIL,
  },
};
// console.log(config);

module.exports = config;
