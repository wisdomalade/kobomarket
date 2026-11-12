
const knex = require('knex');
const env = require('./env');

if (!env.databaseUrl) {
  throw new Error('DATABASE_URL is missing from your .env file');
}

const db = knex({
  client: 'pg',
  connection: env.databaseUrl,
  pool: {
    min: 0,
    max: 10
  }
});

module.exports = db;
