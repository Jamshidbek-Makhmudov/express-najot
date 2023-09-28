const router = require("express").Router();
const {find} = require("../controllers/workers.controller");

router.get("/workers", find);

module.exports = router;
