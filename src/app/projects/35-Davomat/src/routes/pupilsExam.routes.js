const Router = require("express");

const {findAll, findOne, mark, exam} = require("../controllers/pupilsExam.cont");
const isAuth = require("../middlewares/is_auth");
const isUser = require("../middlewares/is_user");
const currentUser = require("../middlewares/current_user");
const fileUpload = require("../middlewares/file-upload");

const router = Router();


router.put("/pupilsExams",isAuth, isUser, mark);
router.put("/pupilsExam",isAuth, currentUser, fileUpload, exam);

router.get("/pupilsExam/:id",isAuth, isUser, findOne);
router.get("/pupilsExam",isAuth, isUser, findAll);


module.exports = router;