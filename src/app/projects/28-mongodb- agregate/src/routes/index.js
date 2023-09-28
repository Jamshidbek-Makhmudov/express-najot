const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const trxRoute = require("./transaction.route");
const workersRoute = require("./workers.route");

module.exports = [authRoute, userRoute, trxRoute,workersRoute];
