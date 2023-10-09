const {Router} = require("express");

const {
  register,
  login
} = require("../controllers/register.cont");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/register", register);
router.post("/login",isAuth, login);

module.exports = router;
