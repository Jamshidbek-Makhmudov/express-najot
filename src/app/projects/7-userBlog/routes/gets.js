const { Router } = require('express');
const { Register } = require('../controller/User');
const { private, public } = require('../controller/gets');
const Io = require('../utils/Io');

const Users = new Io('../database/users.json');

const router = Router();
//global middleware
const middle = async (req, res, next) => {
	console.log(req.headers.authorization);
	const userId = req.headers.authorization;
	//front olding sign up qilib userlarni backdan oladi,
	//va keyingi request yuborishida headernda authorization nomi blan userni id sini qayta yuboradi
	//biz bu yerda tutib olib userni id si orqali qolgan malumotlarini qidiramiz

	const users = await Users.read();
	const findUser = users.find(value => value.id === userId);
	if (findUser) {
		next();
	} else {
		res.status(403).json({ message: 'you are not logged in' });
	}
};

router.get('/private', middle, private);

router.get('/public', public);

module.exports = router;
