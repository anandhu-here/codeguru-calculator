const { Pool } = require('pg');
const pool = require('./config');

async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log('Users table created (if not exists)');
    client.release()
  } catch (error) {
    console.error('Error creating users table:', error);
  }finally {
    pool.end(); // Close the connection pool
  }
}

async function createCalculatorTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      description TEXT,
      amount NUMERIC(10, 2) NOT NULL,
      income NUMERIC(10, 2) NOT NULL,
      date DATE NOT NULL,
      user_id INTEGER NOT NULL
    );
  `;

  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log('Users table created (if not exists)');
    client.release()
  } catch (error) {
    console.error('Error creating users table:', error);
  }finally {
    pool.end(); // Close the connection pool
  }
}

module.exports = { pool, createUsersTable, createCalculatorTable };
