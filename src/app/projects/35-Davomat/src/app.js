const express = require("express")

const app = express();

require("./start/moduls")(express, app)
require("./start/run")(app)

