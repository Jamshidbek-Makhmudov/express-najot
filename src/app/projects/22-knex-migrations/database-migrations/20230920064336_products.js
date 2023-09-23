/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw('create extension if not exists "uuid-ossp"');

  return knex.schema.createTable("products2", (table) => {
    table.uuid("product_id").notNullable().defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.string("product_name", 32).notNullable();
    table.string("product_description", 1024).notNullable();
    table.float("product_price").notNullable();
		table.uuid("category").references("categories2.category_id");
		table.timestamp("created_at").notNullable().defaultTo(knex.raw("current_timestamp"));

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
	await knex.schema.dropTable("products");
	
	
  
};
