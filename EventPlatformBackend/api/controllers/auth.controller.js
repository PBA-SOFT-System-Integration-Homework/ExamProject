const bcrypt = require('bcrypt');

const { loginAuth } = require('../../db/authDb');
/**
 * Login 
 */
const login = async (username, password) => {
    if (!username || !password || username === "" || password === "") {
        return { error: 'Username or password is missing' }
    }
    try {
        const result = await loginAuth(username, password);
        // If an error occurs in db (they are not stacktraces but handled error messages)
        if (result.error) throw Error(result.error);
        // Check password
        const match = await bcrypt.compare(password, result.password);
        console.log(match)
        if (match) {
            return { username: result.username, role: result.role, id: result.user_id };
        } else {
            console.error('Bcrypt fail');
            throw Error('Wrong username or password1');
        }
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}


module.exports = {
    login
}