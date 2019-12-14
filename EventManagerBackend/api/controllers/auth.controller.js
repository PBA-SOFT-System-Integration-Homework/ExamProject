const { loginAuth } = require('../../db/authDb');

/**
 * Login 
 */
const login = (username, password) => {
    if (!username || !password || username === "" || password === "") {
        return { error: 'Username or password is missing' }
    }
    try {
        return user = loginAuth(username, password);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}


module.exports = {
    login
}