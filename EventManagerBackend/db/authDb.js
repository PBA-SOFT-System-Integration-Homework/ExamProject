const connection = require('./DBConnector')
const pool = connection.getPool();

// get connections by using pool.get pool.getConnection();
