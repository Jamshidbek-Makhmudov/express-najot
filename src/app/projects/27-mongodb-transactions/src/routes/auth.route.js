const {register} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/auth/register", register);

module.exports = router;
