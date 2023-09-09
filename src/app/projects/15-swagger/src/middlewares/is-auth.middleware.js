const jwt = require('../utils/jwt');

const isAuth = (req, res, next) => {
	//const token = req.headers.authorization?.split(" ")[1] ||req.headers.authorization;  //bu header orqali ishlash 1chi variant. bunda headerga login qivotgan front end manual token ni "bearer token" qilib jonatadi, biz bi yerda probelni ong taraf chap taraf qilib ajratamiz
	const token = req.cookies?.token; // bu esa 2- varinat cookiega saqlab ishlash

	if (!token) return res.status(401).json({ message: 'Invalid Token' });

	jwt.verifyToken(token, (err, data) => {
		if (err) return res.status(401).json({ message: 'Invalid Token' });

		req.user = data;
		next();
	});
};

module.exports = isAuth;
