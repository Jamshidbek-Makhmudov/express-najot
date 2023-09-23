const { Router } = require("express");
const { find, create, findBy, findOne, findAll, update, remove } = require("../controllers/task-manager.controller");

const router = Router();

router.get("/", findAll);
router.post("/", create);
router.post("/:id", findBy);
router.post("/by/:id", findOne);
router.get("/todo", find);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports =router;
