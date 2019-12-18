const connection = require('./DBConnector')
const pool = connection.getPool();

// get connections by using pool.get pool.getConnection();

const loginAuth = async (usernameLogin, passwordLogin) => {
    const conn = await pool.getConnection();
    try {
        const [rows, fields] = await conn.execute('SELECT * FROM users WHERE username = ?', [usernameLogin])
        if (rows.length === 0) {
            return { error: 'Wrong username or password' };
        }
        // return user;
        return rows[0];
    } catch (err) {
        console.log('ERROR', err)
        throw Error('An connection error occured')
    } finally {
        conn.release();
    }
}

module.exports = {
    loginAuth,
}