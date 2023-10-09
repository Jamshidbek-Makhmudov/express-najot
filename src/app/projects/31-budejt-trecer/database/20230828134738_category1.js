/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =  async function(knex) {
    await knex.raw('create extension if not exists "uuid-ossp"');
    return knex.schema
    .createTable('category1', (table)=> {
        table.uuid("c1_id").notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"))
        .primary();
        table.string("c1_name", 64).notNullable();
        table.float("c1_price").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
