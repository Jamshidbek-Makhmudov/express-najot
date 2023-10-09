const {Router} = require("express");
const router = Router();

const { create, findAll,} = require("../controllers/promocod.cont");

router.post("/promocod",create );
router.get("/promocod",findAll );

module.exports = router;