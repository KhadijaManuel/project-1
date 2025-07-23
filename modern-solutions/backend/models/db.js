const mysql = require('mysql2/promise');
require('dotenv').config();

// using pool over making a maunal connection that will take more time to run and make the datbase slow 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = pool;
