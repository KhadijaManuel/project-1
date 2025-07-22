const mysql = require('mysql2/promise');
require('dotenv').config();

//connection data that is stored in the .env to store the keys needed 
// using pool rather then connection plus its a lot shorter since it allows for a lot more easy and faster CRUD

const pool = mysql.createPool({
  host: process.env.DB_HOST,//hostname
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
