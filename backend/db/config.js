const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'calculator',
  password: 'blackbird',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
