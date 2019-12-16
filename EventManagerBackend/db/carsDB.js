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
    console.log(cars, eventId)
    const conn = await pool.getConnection();
    let bookedCars = []
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
    return bookedCars;
}

module.exports = {
    getCarsFromMiniproject,
    bookCars
}