const knexFile = require("../../knexfile");
const dbKnex = require("knex");

const knex = dbKnex(knexFile["development"]);

module.exports = {knex};
