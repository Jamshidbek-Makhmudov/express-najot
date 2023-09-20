const {sign, verify} = require("jsonwebtoken");
const secretKey = "BU!hashed@SECRe1T";

function generateJwt(payload) {
  return sign(payload, secretKey, {expiresIn: "24h"});
}

function extractJwt(payload, callback) {
  return verify(payload, secretKey, callback);
}

module.exports = {extractJwt, generateJwt};
