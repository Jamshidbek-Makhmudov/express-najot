const {Router} = require("express");
const {find, findOne, create, update, remove} = require("../controllers/posts.controller");

const router = Router();

router.get("/posts", find);
router.get("/posts/:id", findOne);
router.post("/posts", create);
router.put("/posts/:id", update);
router.delete("/posts/:id", remove);

module.exports = router;
