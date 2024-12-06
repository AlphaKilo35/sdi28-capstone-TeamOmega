/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ability_tbl').del()
  await knex('type_tbl').del()
  await knex('pkmn_stats_tbl').del()
  await knex('pkmn_type_ref_tbl').del()
  await knex('pkmn_ability_ref_tbl').del()
  await knex('pokemon_data_tbl').del()

  await knex('ability_tbl').insert([
    {ability_name: 'overgrow'},
    {ability_name: 'chlorophyll'},
  ]);
  await knex('type_tbl').insert([
    {type_name: 'grass'},
    {type_name: 'poison'},
  ]);
  await knex('pkmn_stats_tbl').insert([
    {hitpoints: 45, attack: 49, defence: 49,
      spec_attack: 65, spec_defence: 65, speed: 45},
  ]);
  await knex('pokemon_data_tbl').insert([
    {Name: 'bulbasaur', Height: 7, Weight: 69,
      Level: 1, Experience: 0, stats_tbl_id: 1},
  ])
  await knex('pkmn_type_ref_tbl').insert([
    {pkmn_id: 1, type_1: 1, type_2: 2},
  ]);
  await knex('pkmn_ability_ref_tbl').insert([
    {pkmn_id: 1, slot_1: 1, slot_2: 2},
  ]);
};
