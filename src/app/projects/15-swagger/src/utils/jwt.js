//const config = require('config');
//const secretKey = config.get('jwtSecretKey');
const jwt = require('jsonwebtoken');
const config = require(process.cwd() + '/config');
const secretKey = config.jwtSecretKey;

const generateToken = payload => jwt.sign(payload, secretKey, { expiresIn: '3h' });
const verifyToken = (payload, callback) => jwt.verify(payload, secretKey, callback);

module.exports = {
	generateToken,
	verifyToken,
};

/**
 jwt ni syntax si:formulasi
 jwt.sign(payload,"secretKey, {expiresIn:3h}");
 jwt.verify(token, "secretKey", callbak)

 payload- yaxshirmoqchi bolgan narsamiz, idni beramiz
 payload yechmoqchi bolgan narsamiz   token ni beramiz

 */
