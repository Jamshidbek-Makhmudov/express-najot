const {Router} = require("express");
const router = Router();

const {find, findAll, create, remove, update, sellProduct} = require("../controllers/product.cont");

const isAuth = require("../middlewares/isAuth");


router.get("/product/:id", isAuth,find );
router.get("/product",isAuth, findAll );
router.post("/product",isAuth, create );
router.delete("/product/:id",isAuth, remove);
router.put("/product/:id", isAuth, update);
router.put("/sellproduct/:id",isAuth, sellProduct);

module.exports = router;