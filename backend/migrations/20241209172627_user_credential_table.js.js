/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('external_credentials', table => {
        table.integer("user_id").unsigned();
        table.foreign('user_id').references('users.id').onDelete('cascade').deferrable('deferred');
        table.increments('id');
        table.string('provider');
        table.string('subject');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.
    alterTable('external_credentials', table => {
        table.dropForeign('user_id')
  })
  .then(function(){return knex.schema.dropTableIfExists('external_credentials')}) 
};