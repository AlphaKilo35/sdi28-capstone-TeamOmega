const knex = require('knex');
require('dotenv').config({path: '../.env'});

const knexConfig = require('./knexfile.js')[process.env.NODE_ENV ]; //|| 'development'];

module.exports = knex(knexConfig);