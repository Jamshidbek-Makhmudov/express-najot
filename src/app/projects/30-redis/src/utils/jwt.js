const config = require("config");
const jwt = require("jsonwebtoken");

const secret = config.get("jwtSecret");

const verify = (payload, callback) => jwt.verify(payload, secret, callback);
const sign = (payload) => jwt.sign(payload, secret, {expiresIn: "24h"});

module.exports = {
  verify,
  sign,
};
