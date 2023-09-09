const {Router} = require("express");
const router = Router();
const {create} = require("../controllers/login");

router.post("/login/create", create);

module.exports = router;
