const { Router } = require('express');
const { create, find, findOne, edit, remove } = require('../controllers/product.controller');
const fileUpload = require('../middlewares/file-upload.middleware');
const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');

const router = Router();

router.post('/products', isAuth, isAdmin, fileUpload, create);
router.get('/products', find);
router.get('/products/:id', findOne);
router.put('/products/:id', isAuth, isAdmin, edit);
router.delete('/products/:id', isAuth, isAdmin, remove);

module.exports = router;
