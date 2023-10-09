const {Router} = require("express");
const router = Router();

const {find, findAll, create} = require("../controllers/company.cont");
 
router.get("/company",findAll );
router.get("/company/:id",find );
router.post("/company",create );

module.exports = router;