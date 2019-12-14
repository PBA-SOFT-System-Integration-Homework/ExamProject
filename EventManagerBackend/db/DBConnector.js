const mysql = require('mysql2');
const { dbUsername, dbHost, dbName, dbPassword } = require('../config/config');
let pool;
module.exports = {
  getPool: function () {
    if (pool) return pool;
    pool = mysql.createPool({
      host: dbHost,
      user: dbUsername,
      password: dbPassword,
      database: dbName
    });
    return pool;
  }
};