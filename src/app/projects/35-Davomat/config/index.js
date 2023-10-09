require("dotenv/config")

const {env} = process;

const config = {
    port: env.PORT,
    md_url : env.MD_URL,
    jwt_key : env.JWT_KEY,
    expireToken : env.expireToken,
}
module.exports = config