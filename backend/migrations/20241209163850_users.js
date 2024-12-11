/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('username').unique({indexName: 'username_unique'});
    table.string('password');
    table.string('name');
    table.string('email');
    table.string('role');
    table.boolean('jm');
    table.boolean('previousLogin').defaultTo(false)
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
