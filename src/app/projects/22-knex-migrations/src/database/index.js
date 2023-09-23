const knexFile = require("../../knexfile");
const kx = require("knex");

const knex = kx(knexFile["development"]);

module.exports = {knex};
