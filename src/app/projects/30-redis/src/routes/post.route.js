const {create, find, findOne} = require("../controllers/post.controller");
const fileUpload = require("../middlewares/fileUpload");
const isAuth = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/posts", isAuth, fileUpload, create);
router.get("/posts", find);
router.get("/posts/:id", findOne);

module.exports = router;
