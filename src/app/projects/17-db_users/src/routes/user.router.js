const { Router } = require("express");
const router=Router();
router.post('/create/user',UserController.POST_USR)
router.get('/users/:userId',UserController.USER_GET_BYID);
module.exports = router;
