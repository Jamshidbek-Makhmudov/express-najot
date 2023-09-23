const {Router} = require("express");
const {find, findOne, create, update, remove} = require("../controllers/todos");

const router = Router();

router.get("/todos", find);
router.get("/todos/:id", findOne);
router.post("/todos", create);
router.put("/todos/:id", update);
router.delete("/todos/:id", remove);

module.exports = router;
