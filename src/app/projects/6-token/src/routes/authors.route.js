const {Router} = require("express");
const isAuth = require("../middlewares/isAuth.middleware");
const {create, getAll, getById} = require("../controllers/authors.controller");
const router = Router();

router.post("/authors", isAuth, create);
router.get("/authors", getAll);
router.get("/authors/:id", getById);

module.exports = router;
