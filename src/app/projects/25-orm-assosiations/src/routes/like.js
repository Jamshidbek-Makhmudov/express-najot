const { Router } = require("express");
const { find, create } = require("../controllers/users.controller");
const router = Router();

router.get("/likes",find);
router.post("/likes",create);

module.exports =router;
