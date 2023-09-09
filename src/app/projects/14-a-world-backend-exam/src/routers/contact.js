const {Router} = require("express");

const router = Router();

const {create, getById} = require("../controllers/contact");
const token = require("../middlewares/isAuth");

router.post("/contact/create", create);
router.get("/contact/:id", token, getById)



module.exports = router