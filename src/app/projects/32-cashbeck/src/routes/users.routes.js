const {Router} = require("express");
const router = Router();

const {create, update, remove, find, findAll} = require("../controllers/users.cont");


router.post("/users",create );
router.put("/users/:id", update);
router.delete("/users/:id", remove);
router.get("/users/:id",find );
router.get("/users",findAll );


module.exports = router;