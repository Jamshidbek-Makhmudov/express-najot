const {sign, verify} = require("jsonwebtoken");
const config = require("../../config");

const secret = config.jwt_key
const expiresIn = config.expireToken

const generateToken = (playload) =>{
    return sign(playload, secret, {expiresIn});
};

const verifyToken =  (playload, callback) =>{
    return verify(playload, secret, callback);
}


module.exports = {
  generateToken,
  verifyToken,
};
