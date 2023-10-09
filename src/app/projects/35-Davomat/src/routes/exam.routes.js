const Router = require("express");

const router = Router();
const {create, find, findOne,} = require("../controllers/exam.cont");
const isAuth = require("../middlewares/is_auth");
const isUser = require("../middlewares/is_user");

router.post("/exam/create",isAuth, isUser, create)
router.get("/exam", isAuth, isUser, find);
router.get("/exam/:id", isAuth, isUser, findOne);

module.exports = router;