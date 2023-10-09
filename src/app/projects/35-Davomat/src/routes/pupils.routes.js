const Router = require("express");

const {create, login, findAll,findUser, findOne} = require("../controllers/pupils.cont");
const isAuth = require("../middlewares/is_auth");
const isUser = require("../middlewares/is_user");
const router = Router();

router.post("/pupils/create",isAuth, isUser, create);
router.post("/pupils/login",login);

router.get("/pupils/:id",isAuth, isUser, findOne);
router.get("/pupil", isAuth, findUser)
router.get("/pupils",isAuth, isUser, findAll);

module.exports = router;