const authRouter = require("./auth.route");
const filmRouter = require("./film.route");
const userRouter = require("./user.route");

module.exports = [authRouter, filmRouter, userRouter];
