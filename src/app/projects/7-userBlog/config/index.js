//require("dotenv/config");
require("dotenv/config");
const {env} = process;

const config={
    port : env.PORT || 6000,
    jwtSecretKey : env.jwt_key_secret
}


module.exports = config;