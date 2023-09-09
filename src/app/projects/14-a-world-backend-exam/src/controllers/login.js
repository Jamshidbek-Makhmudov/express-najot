const config = require('../../config');
const Admin = require('../models/admin.model');

const Io = require('../utils/Io');
const admin = new Io(process.cwd() + '/database/admin.json');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
	try {
		const { username, password } = req.body;

		const admin_json = await admin.read();

		const findAdmin = admin_json.find(item => item.username == username);
		if (!username || !password) return res.status(401).json({ message: 'Error' });

		if (findAdmin) return res.status(401).json({ message: 'This username already exsits' });

		if (!findAdmin) {
			const id = (admin_json[admin_json.length - 1]?.id || 0) + 1;

			const newadmin = new Admin(id, username, await bcrypt.hash(password, 12));

			const data = admin_json.length ? [...admin_json, newadmin] : [newadmin];

			await admin.write(data);

			const token = jwt.sign({ id: newadmin.id }, config.jwtsecretkey, { expiresIn: '72h' });
			res.json({ message: 'successfully', token });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'INVALID SERVER ERROR' });
	}
};

module.exports = { create };
