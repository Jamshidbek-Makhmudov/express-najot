const jwt = require('../utils/jwt');

const isAuth = (req, res, next) => {
	//const token = req.headers.authorization;  //bu header orqali ishlash 1cho variant
	const token = req.cookies?.token; // bu esa 2- varinat cookiega saqlab ishlash

	if (!token) return res.status(401).json({ message: 'Invalid Token' });

	jwt.verify(token, (err, data) => {
		if (err) return res.status(401).json({ message: 'Invalid Token' });

		req.user = data;
		next();
	});
};

module.exports = isAuth;
