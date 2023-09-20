const {Router} = require("express");
const {
  find,
  findOne,
  create,
  update,
} = require("../controllers/category.controller");
const router = Router();

router.get("/category", find);
router.get("/category/:id", findOne);
router.post("/category", create);
router.put("/category/:id", update);

module.exports = router;
