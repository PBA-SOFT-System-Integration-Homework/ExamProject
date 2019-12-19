const connection = require('./DBConnector')
const pool = connection.getPool();

// get connections by using pool.get pool.getConnection();
const getEvents = async () => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('SELECT * FROM events');
        if (result[0].length !== 0) return result[0];
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while finding');
    } finally {
        conn.release();
    }
    return null;
}

const addEvent = async (name, description, date, amountOfPeople, location) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('INSERT INTO events (name, description, date, amount_of_people, location) VALUES (?,?,?,?,?)', [name, description, date, amountOfPeople, location]);
        if (result[0].length !== 0) return result[0];
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while adding');
    } finally {
        conn.release();
    }
    return null;
}

module.exports = {
    getEvents,
    addEvent
}