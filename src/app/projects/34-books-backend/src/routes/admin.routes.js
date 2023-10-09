const {Router} = require("express");

const {login, register} = require("../controllers/admin.cont");
const router = Router();

router.post("/auth/admin/login",login );
router.post("/auth/admin/register",register );
module.exports = router;