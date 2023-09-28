const errorHandler = require("../middlewares/error-handler");
const routes = require("../routes");

const modules = async (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use("/api", routes);

  app.use(errorHandler);
};

module.exports = modules;
