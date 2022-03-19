const mysql = require('mysql2');
require('dotenv').config();
const PORT = process.env.PORT || 3306;
// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    port: PORT,
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = db;
