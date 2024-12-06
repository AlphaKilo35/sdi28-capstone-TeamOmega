/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('ability_tbl', function (table) {
      table.increments('id');
      table.string('ability_name', 25);
      table.timestamps(true, true);
    })
    .createTable('type_tbl', function (table) {
      table.increments('id');
      table.string('type_name', 25);
      table.timestamps(true, true);
    })
    .createTable('pkmn_stats_tbl', function (table) {
      table.increments('id');
      table.integer('hitpoints');
      table.integer('attack');
      table.integer('defence');
      table.integer('spec_attack');
      table.integer('spec_defence');
      table.integer('speed');
      table.timestamps(true, true);
    })
    .createTable('pokemon_data_tbl', function (table) {
      table.increments('id');
      table.string('Name', 50);
      table.integer('Height');
      table.integer('Weight');
      table.integer('Level');
      table.integer('Experience');
      table.integer('stats_tbl_id');
      table.foreign('stats_tbl_id').references('id').inTable('pkmn_stats_tbl').onDelete('cascade');
      table.timestamps(true, true);
    })
    .createTable('pkmn_type_ref_tbl', function (table) {
      table.increments('id');
      table.integer('pkmn_id');
      table.foreign('pkmn_id').references('id').inTable('pokemon_data_tbl').onDelete('cascade');
      table.integer('type_1');
      table.foreign('type_1').references('id').inTable('type_tbl').onDelete('cascade');
      table.integer('type_2');
      table.foreign('type_2').references('id').inTable('type_tbl').onDelete('cascade');
      table.timestamps(true, true);
    })
    .createTable('pkmn_ability_ref_tbl', function (table) {
      table.increments('id');
      table.integer('pkmn_id');
      table.foreign('pkmn_id').references('id').inTable('pokemon_data_tbl').onDelete('cascade');
      table.integer('slot_1');
      table.foreign('slot_1').references('id').inTable('ability_tbl').onDelete('cascade');
      table.integer('slot_2');
      table.foreign('slot_2').references('id').inTable('ability_tbl').onDelete('cascade');
      table.integer('slot_3');
      table.foreign('slot_3').references('id').inTable('ability_tbl').onDelete('cascade');
      table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('pkmn_ability_ref_tbl', table => {
      table.dropForeign('slot_3')
      table.dropForeign('slot_2')
      table.dropForeign('slot_1')
      table.dropForeign('pkmn_id')
    })
    .alterTable('pkmn_type_ref_tbl', table => {
      table.dropForeign('type_2')
      table.dropForeign('type_1')
      table.dropForeign('pkmn_id')
    })
    .alterTable('pokemon_data_tbl', table => {
      table.dropForeign('stats_tbl_id')
    })
    .then( function () {
      return knex.schema
        .dropTableIfExists('type_tbl')
        .dropTableIfExists('pkmn_stats_tbl')
        .dropTableIfExists('pkmn_type_ref_tbl')
        .dropTableIfExists('pokemon_data_tbl')
        .dropTableIfExists('pkmn_ability_ref_tbl')
        .dropTableIfExists('ability_tbl')
    })
};
