const { Router } = require('express');
const { find } = require('../controllers/users.controller');
const isAuth = require('../middlewares/is-auth.middleware');

const router = Router();

router.get('/users', isAuth, find);

module.exports = router;
