const config = require("config");
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(config.get("dbUrl"));

module.exports = sequelize;
