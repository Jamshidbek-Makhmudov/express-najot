const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:Jamshid2171491!@localhost:5432/orm');

module.exports = sequelize;
