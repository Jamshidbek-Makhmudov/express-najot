const {register, findOne} = require("../controllers/auth.controller");
const fileUpload = require("../middlewares/fileUpload");
const isAuth = require("../middlewares/isAuth");

const router = require("express").Router();

router.post("/auth/register", fileUpload, register);
router.get("/me", isAuth, findOne);

module.exports = router;
