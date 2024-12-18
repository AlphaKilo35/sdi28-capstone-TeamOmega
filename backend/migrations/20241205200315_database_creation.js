/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('departure_tbl', function (table) {
    table.increments('id');
    table.string('departure_name');

  })

  .createTable('drop_zone_tbl', function (table) {
    table.increments('id');
    table.string('dropzone_name');

  })

    .createTable('flight_tbl', function (table) {
      table.increments('id');
      table.string('airframe');
      table.string('type_tod');
      table.string('type_load');
      table.integer('departure_id');
      table.foreign('departure_id').references('departure_tbl.id');
      table.integer('drop_zone_id');
      table.foreign('drop_zone_id').references('drop_zone_tbl.id');
      table.timestamp('date_time');
      table.integer('number_pax');
      table.integer('number_passes');
  })

  .createTable('users_tbl', table => {
    table.increments('id');
    table.string('username').unique({indexName: 'username_unique'});
    table.string('password');
    table.string('name');
    table.string('email').unique({indexName: 'email_unique'});
    table.string('role');
    table.boolean('jm').defaultTo(false);
    table.boolean('previousLogin').defaultTo(false);
    table.string('mos');
    table.string('rank');
    table.string('uic');
    table.timestamp('ets')
  })

  .createTable("external_credentials", (table) => {
    table.increments("id");
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("users_tbl.id")
      .onDelete("cascade")
      .deferrable("deferred");
    table.string("provider");
    table.string("subject");
    table.string("email")
  })

  .createTable('manifest_tbl', table => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('users_tbl.id');
    table.integer('flight_id');
    table.foreign('flight_id').references('flight_tbl.id').onDelete("CASCADE");
    table.string('status');
    table.integer('lift');
    table.boolean('jump_duty');
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('flight_tbl', table => {
      table.dropForeign('departure_id')
      table.dropForeign('drop_zone_id')
    })

    .alterTable('manifest_tbl', table => {
      table.dropForeign('user_id');
      table.dropForeign('flight_id');
    })

    .alterTable('external_credentials', table => {
      table.dropForeign('user_id')
    })

    .then( function () {
      return knex.schema
      .dropTableIfExists('manifest_tbl')
      .dropTableIfExists('flight_tbl')
      .dropTableIfExists('drop_zone_tbl')
      .dropTableIfExists('departure_tbl')
      .dropTableIfExists('users_tbl')
      .dropTableIfExists('external_credentials')
    })
};