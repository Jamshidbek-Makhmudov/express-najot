const {Router} = require("express");

const router = Router();

const {create,updated, getAll, getById, Delete} = require("../controllers/feedback");


const token = require("../middlewares/isAuth")

router.post("/feedback/create", create);
router.put("/feedback/updated/:id",token, updated);
router.get("/feedback/:id", getById);
router.get("/feedback", getAll)
router.delete("/feedback/:id",token, Delete);

module.exports = router