const {Router} = require("express");
const {
  changeBalance,
  find,
  create,
  getStatistics,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/is-auth.middleware");
const currentUser = require("../middlewares/current-user.middleware");
const isAdmin = require("../middlewares/is-admin.middleware");

const router = Router();

router.post("/user/payment", isAuth, currentUser, changeBalance);
router.get("/user", isAuth, currentUser, isAdmin, find);
router.post("/user", isAuth, currentUser, isAdmin, create);
router.get("/user/statistics", isAuth, currentUser, isAdmin, getStatistics);

module.exports = router;
