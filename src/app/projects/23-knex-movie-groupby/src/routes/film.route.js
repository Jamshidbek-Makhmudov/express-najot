const {Router} = require("express");
const {create, findOne, find} = require("../controllers/film.controller");
const isAuth = require("../middlewares/is-auth.middleware");
const currentUser = require("../middlewares/current-user.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");
const fileUpload = require("../middlewares/file-upload.middleware");

const router = Router();

router.post("/film", isAuth, currentUser, isAdmin, fileUpload, create);
router.get("/film/:id", findOne);
router.get("/film", find);

module.exports = router;
