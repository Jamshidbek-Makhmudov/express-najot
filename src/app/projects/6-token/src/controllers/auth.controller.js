//serverdan chiqadigan  xatolar 500dan boshlanadi
//500gacha bolgan xatolar client tomonidan chiqadi
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Io = require('../utils/Io');
const Users = new Io('./database/users.json');

const User = require('../models/User.model');
const config = require('../../config');

const checkUser = async (email, users) => {
	const findUser = users.find(user => user.email === email); //find object

	return findUser ? findUser : false;
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const users = await Users.read();

		const user = await checkUser(email, users);

		if (!user) return res.status(403).json({ message: 'Invalid email or password' });

		const compare = await bcrypt.compare(password, user.password);

		if (!compare) return res.status(403).json({ message: 'Invalid email or password' });

		const token = jwt.sign({ id: user.id }, config.jwtSecretKey, {
			expiresIn: '24h',
		});

		res.json({ message: 'Success', token });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

const register = async (req, res) => {
	try {
		const { firstName, lastName, phoneNumber, email, password } = req.body;

		const users = await Users.read();

		const result = await checkUser(email, users);

		if (result) return res.status(403).json({ message: 'Incorrect username or password' });

		const id = (users[users.length - 1]?.id || 0) + 1;

		const newUser = new User(
			id,
			firstName,
			lastName,
			phoneNumber,
			await bcrypt.hash(password, 12),
			email
		);

		const data = users.length ? [...users, newUser] : [newUser];

		await Users.write(data);
		const token = jwt.sign({ id: newUser.id }, config.jwtSecretKey, {
			expiresIn: '24h',
		});

		res.status(201).json({ message: 'Successfully registered', token });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

module.exports = {
	login,
	register,
};
