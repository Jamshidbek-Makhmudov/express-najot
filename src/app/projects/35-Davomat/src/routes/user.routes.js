const Router = require("express");

const router = Router();
const {login} = require("../controllers/user.cont")


router.put("/auth/user", login);


module.exports = router;