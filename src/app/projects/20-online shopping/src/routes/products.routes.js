const {Router} = require("express");
const {create, findAll, find, remove} = require("../controllers/products.cont")
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/product", isAuth, create);
router.get("/product", findAll);
router.get("/product/:id", find);
router.delete("/product/:id",isAuth, remove);

module.exports = router;