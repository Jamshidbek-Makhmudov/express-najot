const {Router} = require("express");
const {
  find,
  findOne,
  create,
  update,
  changeStatus,
  remove,
  search,
} = require("../controllers/todos.controller");

const router = Router();

router.get("/todos/", find);
router.get("/search/todos", search);
router.get("/todos/:id", findOne);
router.post("/todos", create);
router.put("/todos/:id", update);
router.put("/todos/status/:id", changeStatus);
router.delete("/todos/:id", remove);

module.exports = router;
