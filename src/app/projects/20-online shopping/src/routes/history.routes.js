const {Router} = require("express");
const {create, findAll, find, findYear} = require("../controllers/history.cont")

const router = Router();

router.post("/history", create);
router.get("/history",findAll);
router.get("/history/:id",find);
router.post("/history/find",findYear);

module.exports = router;