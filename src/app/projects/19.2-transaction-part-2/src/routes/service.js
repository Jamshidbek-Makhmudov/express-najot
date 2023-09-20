const {Router} = require("express");
const {create, findAll, findOne} = require("../controllers/service.cont");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/service",isAuth, create);
router.get("/service", isAuth, findAll);
router.get("/service/:id",isAuth, findOne);

module.exports = router;
