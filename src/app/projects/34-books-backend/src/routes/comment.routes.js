const {Router} = require("express");
const {create} = require("../controllers/comment.cont");

const isAdmin = require("../middlewares/isAdmin");
const fileUpload = require("../middlewares/file-upload");
const isAuth = require("../middlewares/isAuth");
const { find } = require("../controllers/user.cont");


const router = Router();

router.put("/comment/create/:id",isAuth, create);
router.get("/comment",isAuth, find);


module.exports = router;
