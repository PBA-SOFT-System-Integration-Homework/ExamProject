const connection = require('./DBConnector')
const pool = connection.getPool();
const bcrypt = require('bcrypt');
// get connections by using pool.get pool.getConnection();
const createUser = async (username, password) => {
    const conn = await pool.getConnection();
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    try {
        const result = await conn.execute('INSERT INTO users (username, password, role) VALUES (?,?,?)', [username, hashedPwd, 'user']);

        if (result[0].length !== 0) {
            return result[0];
        } else {
            console.log('no user added...')
            throw Error('')
        }

    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while adding user');
    } finally {
        conn.release();
    }
}

const getUserByUsername = async (username) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('SELECT username FROM users WHERE username = ?', [username]);
        if (result[0].length !== 0) return result[0];
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while finding');
    } finally {
        conn.release();
    }
    return null;
}
module.exports = {
    createUser,
    getUserByUsername,
}