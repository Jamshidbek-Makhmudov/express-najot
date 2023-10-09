/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category2').del()
  await knex('category2').insert([
    {c2_name: "Education", c2_price: 120000},
    {c2_name: "Books", c2_price: 97000},
    {c2_name: "Market", c2_price: 500000},
    {c2_name: "Taxi", c2_price: 15000},
    
  ]);
};
