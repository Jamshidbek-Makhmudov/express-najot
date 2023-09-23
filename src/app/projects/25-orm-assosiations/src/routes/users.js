const {Router} = require("express");
const {find, create} = require("../controllers/users.controller");

const router = Router();

router.get("/users", find);
router.post("/users", create);

module.exports = router;
