/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =  async function(knex) {
    return knex.schema
    .createTable('history', (table)=> {
        table.string("h_name", 64).notNullable();
        table.float("h_price", 64).notNullable();
        table.string("status", 32).notNullable();
        table.float("balance").notNullable()
        table.timestamp ("created_at")
        .notNullable()
        .defaultTo(knex.raw('current_timestamp'))
        table.uuid("h_id").references("register.r_id ");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
