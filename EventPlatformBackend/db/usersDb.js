const connection = require('./DBConnector')
const pool = connection.getPool();

// get connections by using pool.get pool.getConnection();
const createUser = async (username, password) => {
    const conn = await pool.getConnection();

    try {
        const result = await conn.execute('INSERT INTO users (username, password, role) VALUES (?,?,?)', [username, password, 'user']);

        if (result[0].length !== 0) {
            return await getUserByUsername(username);
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
        const [rows] = await conn.execute('SELECT username, role FROM users WHERE username = ?', [username]);
        if (rows.length !== 0) {
            return { username: rows[0].username, role: rows[0].role }
        }


    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while finding');
    } finally {
        conn.release();
    }
}

module.exports = {
    createUser,
    getUserByUsername,
}