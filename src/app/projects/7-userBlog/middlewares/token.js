const jwt = require('jsonwebtoken');
const config = require('../config');
const Token = require('../utils/Io');

const tokens = new Token(process.cwd() + '/database/tokens.json');

//middlware root fileda app.use bolib ishlatilsa global boladi va shunda har bir requestda hamma route lar uchun ishlidi.
//bir ketin bir nechta middleware larni ham ishlatsak boladi.
//1ta middelwaredan ikkinchi middleware ga malumot yuborib shu ikkinchi middewareda tutib olsak boladi, ya'ni middlewaredan middleware malumot almashsak boladi
const isToken = async (req, res, next) => {
	const token = req.headers.authorization;

	const readToken = await tokens.read();

	if (!token) return res.status(401).json({ message: 'Invalid token' });

	jwt.verify(token, config.jwtSecretKey, (error, data) => {
		if (error) return res.status(404).json({ message: 'You need register' });
		req.userID = data.id;

		next();
	});
};

module.exports = isToken;
