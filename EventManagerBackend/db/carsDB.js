const connection = require('./DBConnector')
const pool = connection.getPool();
const fetch = require('node-fetch')

const MINIPROJECT_URL = "http://167.172.98.125:3001/car";

const getCarsFromMiniproject = async () => {
    let cars = await fetch(MINIPROJECT_URL).then(res => {
        return res.json();
    });
    return cars;
}

const bookCars = async (cars, eventId) => {
    const conn = await pool.getConnection();
    try {
        for (let idx in cars) {
            const { make, year, number_of_seats, car_type_name } = cars[idx]
            console.log([make, year, number_of_seats, 0, car_type_name, eventId])
            const result = await conn.execute('INSERT INTO cars (make, year, amount_of_seats, amount_of_seats_taken, type, event_id) VALUES (?,?,?,?,?,?)',
                                                                            [make, year, number_of_seats, 0, car_type_name, eventId]);
        }
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while adding');
    } finally {
        conn.release();
    }
    return cars;
}

const getCarsByEventId = async (eventId) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('SELECT * FROM cars where event_id = ?', [eventId])
        return result[0];
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while getting cars');
    } finally {
        conn.release();
    }
}



module.exports = {
    getCarsFromMiniproject,
    bookCars,
    getCarsByEventId
}