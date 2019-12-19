const bcrypt = require('bcrypt');

const { createUser, getUserByUsername } = require('../../db/usersDb');
/**
 * Register user to database
 */
const addUser = async (username, password) => {
    if (!username || !password || username === "" || password === "") {
        return { error: 'Username or password is missing' }
    }

    if (await getUserByUsername(username)) return { error: "Username already exists" };
    try {
        const salt = 10;
        const hashedPwd = await bcrypt.hash(password, salt);
        return await createUser(username, hashedPwd);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

module.exports = {
    addUser,
}