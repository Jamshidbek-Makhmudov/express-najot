/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
    return knex.schema
    .createTable('category2', (table)=> {
        table.uuid("c2_id").notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary();
        table.string("c2_name", 64).notNullable();
        table.float("c2_price").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
