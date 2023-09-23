const {Router} = require("express");
const {register, login} = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;
