const mysql = require('mysql2/promise');

let pool;
// const dbName = process.env.NODE_ENV === 'test' ? process.env.DB_NAME + '_test' : process.env.DB_NAME;
module.exports = {
  getPool: function () {
    if (pool) return pool;
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME + '_test' : process.env.DB_NAME
    });
    return pool;
  }
};
