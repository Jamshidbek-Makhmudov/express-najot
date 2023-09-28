const {sign, verify} = require("jsonwebtoken");
const config = require("../../config");

const secret = config.jwtSecret;
const expiresIn = config.expiresToken;

const generateToken = (payload) => {
  return sign(payload, secret, {expiresIn});
};

const verifyToken = (payload, callback) => {
  return verify(payload, secret, callback);
};

module.exports = {
  generateToken,
  verifyToken,
};
