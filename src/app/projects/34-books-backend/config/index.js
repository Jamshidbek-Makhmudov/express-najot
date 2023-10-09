require("dotenv/config");

const {env} = process;

const config = {
    port: env.PORT,
    dbUrl: env.DB_URL,
    jwt_key: env.JWT_KEY, 
}

module.exports = config