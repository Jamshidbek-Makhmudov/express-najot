const adminRouter = require("./admin.routes");
const userRouter = require("./users.routes");
const authorRouter  = require("./authors.routes");
const bookRouter  = require("./books.routes");
const commentROuter = require("./comment.routes");

module.exports = [ adminRouter, userRouter, authorRouter, bookRouter, commentROuter]