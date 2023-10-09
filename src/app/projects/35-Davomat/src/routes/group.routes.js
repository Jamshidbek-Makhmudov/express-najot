const Router = require("express");

const router = Router();
const {create, find, findOne,} = require("../controllers/group.cont");
const isAuth = require("../middlewares/is_auth");
const isUser = require("../middlewares/is_user");

router.post("/group/create",isAuth, isUser, create)
router.get("/group",isAuth, isUser, find);
router.get("/group/:id",isAuth, isUser, findOne);

module.exports = router;