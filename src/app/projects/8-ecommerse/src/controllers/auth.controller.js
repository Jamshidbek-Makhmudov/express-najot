const bcrypt = require('bcrypt');
const Joi = require('joi');

const Io = require('../utils/Io');
const User = require('../models/User.model');
const jwt = require('../utils/jwt');

const Users = new Io('./database/users.json');

const login = async (req, res) => {
	try {
		const { phoneNumber, password } = req.body;

		const phoneNumberRegex = /^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;
		// for more info: joi.dev -the official joi documentation
		const schema = Joi.object({
			phoneNumber: Joi.string().regex(phoneNumberRegex).min(13).max(13).required(),
			password: Joi.string().min(6).required(),
		});

		const { error } = schema.validate({
			phoneNumber,
			password,
		});

		if (error) return res.status(400).json({ message: error.message });

		const users = await Users.read();

		const user = users.find(user => user.phoneNumber === phoneNumber);

		if (!user) return res.status(403).json({ message: 'Phone Number not found' });

		const compare = await bcrypt.compare(password, user.password);
		if (!compare) return res.status(403).json({ message: 'Incorrect password' });

		//const token = jwt.sign({ id: user.id });

		const token = jwt.sign({ id: user.id });
		res.cookie('token', token, {
			maxAge: 3600 * 1000,
		});

		res.status(201).json({ message: 'Success', data: token }); //shunda data:token ni ochirib yuborihs kerak
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

const register = async (req, res) => {
	try {
		const { firstName, lastName, phoneNumber, password } = req.body;

		const phoneNumberRegex = /^\+998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/;

		const schema = Joi.object({
			firstName: Joi.string().min(3).max(32).required(),
			lastName: Joi.string().min(3).max(32).required(),
			phoneNumber: Joi.string().regex(phoneNumberRegex).min(13).max(13).required(),
			password: Joi.string().min(6).required(),
		});

		const { error } = schema.validate({
			firstName,
			lastName,
			phoneNumber,
			password,
		});

		if (error) return res.status(400).json({ message: error.message });

		const users = await Users.read();

		const user = users.find(user => user.phoneNumber === phoneNumber);

		if (user) return res.status(403).json({ message: 'Phone Number already exists' });

		const id = (users[users.length - 1]?.id || 0) + 1;
		const hashedPass = await bcrypt.hash(password, 12);

		const newUser = new User(id, firstName, lastName, phoneNumber, hashedPass);

		const data = users.length ? [...users, newUser] : [newUser];

		await Users.write(data);

		//const token = jwt.sign({ id: newUser.id });
		const token = jwt.sign({ id: user.id });
		res.cookie('token', token, {
			maxAge: 3600 * 1000,
		});

		res.status(201).json({ message: 'Success', data: token }); //bu yerda ham data:token ni ochirib yuborish kerak
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

module.exports = {
	login,
	register,
};
