const knexFile = require("../knexfile");
const dbknex = require("knex");

const knex = dbknex(knexFile["development"]);

module.exports = {knex}