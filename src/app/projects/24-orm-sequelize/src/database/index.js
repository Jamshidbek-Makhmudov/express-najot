const { Sequelize } = require('sequelize');
const { config } = require('../../config');

const sequelize = new Sequelize('postgres://postgres:Jamshid2171491!@localhost:5432/orm');

module.exports = sequelize;
