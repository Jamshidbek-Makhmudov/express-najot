const {Router} = require("express");
const {getProfile, updateProfile} = require("../controllers/users.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const router = Router();

router.get("/users/profile", isAuth, getProfile);
router.put("/users/profile", isAuth, updateProfile);

module.exports = router;
