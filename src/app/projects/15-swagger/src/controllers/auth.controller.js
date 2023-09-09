const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const path = require('path');

const { generateToken } = require('../utils/jwt');

const Io = require('../utils/Io');
const User = require('../models/User.model');
const { registerValidation, loginValidation } = require('../validations/auth.validation');

const Users = new Io('./database/users.json');
//login
const login = async (req, res) => {
	// try {
		const { userName, password } = req.body;

		const error = loginValidation({
			userName,
			password,
		});
		if (error) return res.status(400).json({ message: error.message });

		const users = await Users.read();
		const findUser = users.find(user => user.userName === userName);
		if (!findUser) return res.status(403).json({ message: 'User name not found!' });
;
		const compare = await bcrypt.compare(password, findUser.password);
		if (!compare) return res.status(403).json({ message: 'Incorrect password' });
		const token = generateToken({ id: users.id });
		res.cookie('token', token, {
			maxAge: 3600 * 1000,
		});
		res.status(201).json({ message: 'Success', token }); 
// 	} catch (error) {
// 		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
// 	}
};

//register

const register = async (req, res) => {
	try {
		const { firstName, lastName, userName, password, age } = req.body;
		const photo = req.files?.photo;

		const error = registerValidation({
			firstName,
			lastName,
			userName,
			password,
			photo,
			age,
		});
		if (error) return res.status(400).json({ message: error.message });

		const users = await Users.read();
		const findUser = users.find(user => user.userName === userName);
		if (findUser) return res.status(403).json({ message: 'User name is already exists' });

		const photoName = v4() + path.extname(photo.name);
		photo.mv(process.cwd() + '/uploads' + photoName);

		const hashedPass = await bcrypt.hash(password, 12);

		const newUser = new User(firstName, lastName, userName, hashedPass, photoName, age);

		const data = users.length ? [...users, newUser] : [newUser];

		await Users.write(data);

		const token = generateToken({ id: newUser.id });
		res.cookie('token', token, { maxAge: 3600 * 1000 });

		res.status(201).json({ message: 'Success', token });
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
	}
};

module.exports = {
	login,
	register,
};



