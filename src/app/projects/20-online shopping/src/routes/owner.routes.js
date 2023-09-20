const {Router} = require("express");
const {find} = require("../controllers/owner.cont")


const router = Router();

router.post("/owner",find);

module.exports = router;