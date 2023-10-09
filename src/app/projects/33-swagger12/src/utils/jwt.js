const {sign, verify} = require("jsonwebtoken");
const config = require("../../config");

const secret = config.jwtSecret;

const generateToken = (payload) => sign(payload, secret, {expiresIn: "24h"});
const verifyToken = (payload, callback) => verify(payload, secret, callback);

module.exports = {generateToken, verifyToken};
