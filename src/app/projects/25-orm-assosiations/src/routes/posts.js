const {Router} = require("express");
const {find, create} = require("../controllers/posts.controller");

const router = Router();

router.get("/post", find);
router.post("/post", create);

module.exports = router;
