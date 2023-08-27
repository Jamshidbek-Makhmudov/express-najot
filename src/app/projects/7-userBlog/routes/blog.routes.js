const {Router} = require("express");
const router = Router();

const {create, getById, getAll} = require("../controller/Blog")

const token = require("../middlewares/token")

router.use("/blog/create",token, create);
router.use("/blog/:id",token, getById);
router.use("/blog",token, getAll)

module.exports = router; 