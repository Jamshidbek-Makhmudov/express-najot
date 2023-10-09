const {Router} = require("express");
const {create, findAll, findOne} = require("../controllers/author.cont");

const isAdmin = require("../middlewares/isAdmin");
const fileUpload = require("../middlewares/file-upload");
const isAuth = require("../middlewares/isAuth");


const router = Router();

router.post("/author/create",isAuth, fileUpload, create);
router.get("/author", isAuth, findAll);
router.get("/author/:id", isAuth, findOne);

module.exports = router;
