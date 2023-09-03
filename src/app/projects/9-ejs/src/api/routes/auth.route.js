const { Router } = require('express');
const { login, register, logout } = require('../controllers/auth.controller');
const isAuth = require('../middlewares/is-auth.middleware');

const router = Router();

router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('auth/logout', logout);

router.get('/login', (req, res) => {
	res.render('login');
});
router.get('/dashboard', isAuth, (req, res) => {
	res.render('dashboard');
});

router.get('/logout', logout);

router.get('/register', (req, res) => {
	res.render('register');
});

module.exports = router;
