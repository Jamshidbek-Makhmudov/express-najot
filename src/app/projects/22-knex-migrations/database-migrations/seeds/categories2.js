/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del();
  await knex('category').insert([
    { category_name: 'Talaba' }, // Uppercase "B"
    { category_name: 'ta' },
    { category_name: 'rowVwwwalue3' },
  ]);
};