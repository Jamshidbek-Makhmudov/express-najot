const {create} = require("../controllers/transaction.controller");
const isAuth = require("../middlewares/is-auth.controller");

const router = require("express").Router();

router.post("/transaction", isAuth, create);

module.exports = router;
