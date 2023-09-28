const config = require("config");
const sequelize = require("../utils/sequelize");

const run = async (app) => {
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({
    logging: false,
    alter: true,
  });

  app.listen(config.get("port"), () => {
    console.log(config.get("port"));
  });
};

module.exports = run;
