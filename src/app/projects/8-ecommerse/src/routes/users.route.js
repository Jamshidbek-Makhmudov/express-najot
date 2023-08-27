const {Router} = require("express");
const {find} = require("../controllers/users.controller");

const router = Router();

router.get("/", find);

module.exports = router;
