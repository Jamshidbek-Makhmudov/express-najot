require("dotenv/config");
const {env} = process;

const config = {
    port:env.PORT || 6000,
}


module.exports = config;
