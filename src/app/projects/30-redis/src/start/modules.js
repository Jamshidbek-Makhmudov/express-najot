require("../models/associations");

const fileUpload = require("express-fileupload");
const errorHandler = require("../middlewares/error-handler");
const routes = require("../routes");

const modules = async (express, app) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(fileUpload());
  app.use(express.static(process.cwd() + "/uploads"));

  app.use("/api", routes);

  app.use(errorHandler);
};

module.exports = modules;
