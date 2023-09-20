const {Router} = require("express");
const {create, findAll, find, remove, update} = require("../controllers/catagory.cont")
const router = Router();

router.post("/catagory",create);
router.put("/catagory/:id",update);
router.get("/catagory",findAll);
router.get("/catagory/:id",find);
router.delete("/catagory/:id",remove);

module.exports = router;