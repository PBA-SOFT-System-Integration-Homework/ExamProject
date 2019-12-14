const connection = require('./DBConnector')
const pool = connection.getPool();
const bcrypt = require('bcrypt');

// get connections by using pool.get pool.getConnection();

const loginAuth = async (username, password) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('SELECT * FROM users WHERE username = ?', [username])
        console.log(result);
        if (result.length === 0) throw Error('Username does not exist');

        if (await bcrypt.compare(password, result[0].password)) {
            return { username: result[0].username, role: result[0].role }
        } else {
            console.log('Bcrypt fail');
            throw Error('Wrong username or password');
        }
    } catch (err) {
        throw Error('An connection error occured')
    } finally {
        conn.release();
    }
}

module.exports = {
    loginAuth,
}