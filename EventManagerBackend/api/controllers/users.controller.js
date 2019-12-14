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
        return await createUser(username, password);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

/**
 * Remove user
 */
const removeUser = () => {

}

/**
 * Update existing user
 */
const updateUser = () => {

}


module.exports = {
    addUser,
    removeUser,
    updateUser,
}