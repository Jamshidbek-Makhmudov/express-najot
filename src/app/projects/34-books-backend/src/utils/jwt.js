
const {sign, verify} = require("jsonwebtoken");
const config = require("../../config");

const secretKey = config.jwt_key;

const generateToken  = (playload)=> sign(playload, secretKey, {expiresIn:"72h"});
const verifyToken = (playload, callback) => verify(playload, secretKey,callback)

module.exports  = {generateToken, verifyToken}