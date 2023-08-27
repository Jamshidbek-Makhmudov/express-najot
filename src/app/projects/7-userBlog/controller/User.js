const path = require('path');

const Io = require('../utils/Io');
const users = new Io(process.cwd() + '/database/users.json');
const { v4: uuid } = require('uuid');

const People = require('../modules/User.class');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const Register = async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;

		const user_json = await users.read();
		const find = user_json.find(item => item.email == email);

		if (find) return res.satus(403).json({ message: 'email already exist' });

		//const id = (user_json[user_json.length - 1]?.id || 0) + 1;
		const id = uuid();

		const newUser = new People(id, firstname, lastname, email, await bcrypt.hash(password, 12));

		const data = user_json.length ? [...user_json, newUser] : [newUser];

		await users.write(data);

		//delete newUser.password;  frontga res qilib bervotganda userni passwordii yubormimiz qolgan malumotlarini yuborvoramiz

		const token = jwt.sign({ id: newUser.id }, config.jwtSecretKey, { expiresIn: '72h' });

		res.json({ message: 'Successfully', token });
	} catch (error) {
		res.status(500).json({ message: 'INVALID SERVER ERROR' });
	}
};

//sign in
const SignIn = async (req, res) => {
	const { username, password, name } = req.body;
	const users = await users.read();
};

module.exports = { Register };
