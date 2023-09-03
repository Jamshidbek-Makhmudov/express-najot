const jwt = require('jsonwebtoken');
const config = require('../../../config');

const users = [{ email: 'james@gmail.com', password: '123' }];
const login = async (req, res) => {
	const { email, password } = req.body;
	const user = users.find(user => user.email === email);
	if (!user) return res.redirect('/api/register');

	const compare = user.password === password;
	if (!compare) return res.redirect('/api/register');

	const token = jwt.sign({ id: user.id }, config.jwtSecretKey);
	res.cookie('token', token, { maxAge: 900000 });
	res.redirect('/api/dashboard');
};

const register = async (req, res) => {
	console.log(req.body);
	console.log(req.files);
};

const logout = async (req, res) => {
	res.clearCookie('token');
	res.redirect('/api/login');
};

module.exports = {
	login,
	register,
	logout,
};
