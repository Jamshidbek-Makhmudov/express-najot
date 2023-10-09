const {Router} = require("express");
const {create, findAll, findOne} = require("../controllers/books.cont");

const isAdmin = require("../middlewares/isAdmin");
const fileUpload = require("../middlewares/file-upload");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/book/create",isAuth,  fileUpload, create);
router.get("/book", isAuth, findAll);
router.get("/books", isAuth, findOne);



module.exports = router;
