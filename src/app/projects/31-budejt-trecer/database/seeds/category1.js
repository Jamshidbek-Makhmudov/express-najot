/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category1').del()
  await knex('category1').insert([
    {c1_name: "Sport", c1_price: 12000},
    {c1_name: "Restaurant", c1_price: 45000},
    {c1_name: "Home", c1_price: 34509},
    {c1_name: "Game", c1_price: 98000},
    
  ]);
};
