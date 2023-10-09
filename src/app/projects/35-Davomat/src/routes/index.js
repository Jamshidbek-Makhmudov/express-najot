const examRoutes = require("./exam.routes");
const groupRoutes = require("./group.routes");
const pupilsRoutes = require("./pupils.routes");
const userRoutes = require("./user.routes");
const pupilExamRoutet = require("./pupilsExam.routes");

module.exports = [examRoutes, groupRoutes, pupilsRoutes, userRoutes, pupilExamRoutet];