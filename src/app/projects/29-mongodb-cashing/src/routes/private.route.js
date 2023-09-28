const {findOne} = require("../controllers/private.controller");
const currentUser = require("../middlewares/current-user");
const isAuth = require("../middlewares/is-auth");

const router = require("express").Router();

router.get("/private", isAuth, currentUser, findOne);

module.exports = router;
