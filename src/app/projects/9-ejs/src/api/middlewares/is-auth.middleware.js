const jwt = require('jsonwebtoken');
const config = require('../../../config');

const isAuth = (req, res, next) => {
	const token = req.cookies?.token;
	if (!token) return res.redirect('/api/login');

	jwt.verify(token, config.jwtSecretKey, (err, data) => {
		if (err) return res.redirect('/api/login');
	});
	//req.user = data;
	next();
};
module.exports = isAuth;
