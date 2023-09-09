const {Router} = require("express");
const router = Router();

const {create, updated, getAll, getById, Delete} = require("../controllers/services.controllers");
const token = require("../middlewares/isAuth")

router.post("/services/create",token, create);
router.put("/services/updated/:id",token, updated);
router.get("/services/:id", getById);
router.get("/services", getAll)
router.delete("/services/:id",token, Delete);

module.exports = router