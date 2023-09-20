const {Router} = require("express");
const {create, findAll, find, remove} = require("../controllers/worker.cont")
const isAuth = require("../middlewares/isAuth");

const router = Router();


router.post("/worker", isAuth, create);
router.get("/worker", isAuth, findAll);
router.get("/worker/:id",isAuth, find);
router.delete("/worker/:id",isAuth, remove);

module.exports = router;