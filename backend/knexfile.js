// Update with your config settings.
//require('dotenv').config({path: '../.env'});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
console.log(process.env.DB_CONNECTION_STRING)
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://postgres:docker@database:5432/postgres',
    pool: {
      min:0,
      max:10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
