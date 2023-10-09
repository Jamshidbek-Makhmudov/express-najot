const {Router} = require("express");

const {register, login,} = require("../controllers/login-register");
const { update, updateEmail, find, buyBook, balanceUpdate} = require("../controllers/user.cont");

const isAuth = require("../middlewares/isAuth");
const currentUser = require("../middlewares/current-user");
const fileUpload = require("../middlewares/file-upload");


const router = Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.put("/user/profile", isAuth, currentUser,fileUpload,  update);
router.put("/user/changeEmail",isAuth, currentUser, updateEmail);
router.put("/user/balance",isAuth, currentUser, balanceUpdate);
router.get("/user", isAuth, currentUser, find);
router.get("/user/buy/:id", isAuth, currentUser, buyBook);


module.exports = router;
