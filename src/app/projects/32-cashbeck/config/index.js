require("dotenv/config");

const {env} = process;

const config = {
    PORT: env.PORT || 5000,
    DB_URL: env.DB_URL,
    JSW_KEY:env.JSW_KEY,
};

module.exports = config;
