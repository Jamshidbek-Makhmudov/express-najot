const {Router} = require("express");
const {create} = require("../controllers/payment/payment");

const router = Router();

router.post("/transaction", create);

module.exports = router;
