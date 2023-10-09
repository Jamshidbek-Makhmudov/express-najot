/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
    return knex.schema
    .createTable('register', (table)=> {
        table.integer("r_id").serial().notNullable()
        .primary();
        table.string("firstname", 64).notNullable();
        table.string("lastname", 64).notNullable();
        table.text("email").notNullable();
        table.string("password", 64).notNullable();
        table.float("balance").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
