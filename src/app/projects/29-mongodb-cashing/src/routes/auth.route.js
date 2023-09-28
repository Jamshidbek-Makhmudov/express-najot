const {register, verify} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/auth/register", register);
router.post("/auth/verify", verify);

module.exports = router;
