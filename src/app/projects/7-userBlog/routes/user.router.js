const {Router} = require("express");
const router = Router();

const {Register} = require("../controller/User");


router.use("/user", Register);

module.exports = router;