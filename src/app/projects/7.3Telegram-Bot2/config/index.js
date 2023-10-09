require("dotenv/config");

const {env} = process;

const config = {
    token: env.token,
};

module.exports = config;