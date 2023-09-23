const {Router} = require("express");

const {
  find,
  findOne,
  create,
  update,
  remove,
} = require("../controllers/products.controller");

const router = Router();

router.get("/product", find);
router.get("/product/:id", findOne);
router.post("/product", create);
router.put("/product/:id", update);
router.delete("/product/:id", remove);

module.exports = router;
