/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('create extension if not exists "uuid-ossp"');

  return knex.schema.createTable("categories2", (table) => {
    table.uuid("category_id").notNullable().defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.string("category_name", 32).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
