require("dotenv/config");

const {env} = process;

const config = {
    token: env.TOKEN,
}

module.exports = config;