const kx = require("knex");

const knexFile = require("../../knexfile");

const knex = kx(knexFile["development"]);

module.exports = {
  knex,
};
