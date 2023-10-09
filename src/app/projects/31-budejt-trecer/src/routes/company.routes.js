const {Router} = require("express");

const {
  findAllC1,
  findAllC2,
  findOneC1,
  findOneC2,
  check
} = require("../controllers/company.cont");


const isAuth = require("../middlewares/isAuth");

const router = Router();

router.get("/category1",isAuth, findAllC1);
router.get("/category2", isAuth, findAllC2);
router.get("/getmoney/:id", isAuth,findOneC1);
router.get("/buymoney/:id",isAuth, findOneC2);
router.get("/check",isAuth, check);


module.exports = router;
