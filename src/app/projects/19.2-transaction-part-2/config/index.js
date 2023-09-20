require("dotenv/config");

const {env} = process;

const config={
    PORT : env.PORT || 5000,
    DB_URL: env.DB_URL,
    JsonWebToken_key : env.JsonWebToken_key
}

module.exports = config;