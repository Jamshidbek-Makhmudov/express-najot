//express ni ichidan keladigan routerni chaqirib qoyilsa, nodemon eng avval app.js ni oqiydi yani express da server yurgan fileni va router ham shu fayl qilgan ishlarni qila oladi
const { Router } = require('express');
const router = Router();
const { userPost, getALL, Money } = require('../controllers/user.js');

router.post('/user', userPost);
router.get('/user', getALL);
router.post('/transit', Money);

module.exports = router;
