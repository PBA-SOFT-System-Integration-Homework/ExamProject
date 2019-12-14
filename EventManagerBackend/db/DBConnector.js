const mysql = require('mysql2');
let pool;
module.exports = {
    getPool: function () {
      if (pool) return pool;
      pool = mysql.createPool({
        host     : 'localhost',
        user     : 'jeff',
        password : 'myNameIsJeff',
        database : 'db'
      });
      return pool;
    }
};