const connection = require('./DBConnector')
const pool = connection.getPool();
const fetch = require('node-fetch')


const getCarsFromCarRentalService = async (carType, numberOfSeats) => {
    let URL = `http://167.172.98.125:4006/api/v1/cars?carType=${carType}&numberOfSeats=${numberOfSeats}`
    console.log(URL)
    let cars = await fetch(URL).then(res => {
        return res.json();
    });
    return cars;
}

const bookCars = async (cars, eventId) => {
    const conn = await pool.getConnection();
    try {
        for (let idx in cars) {
            if (!cars[idx].make) cars[idx]['make'] = null
            if (!cars[idx].year) cars[idx]['year'] = null

            const { make, year, number_of_seats, car_type_name, origin } = cars[idx]
            const result = await conn.execute('INSERT INTO cars (make, year, amount_of_seats, amount_of_seats_taken, type, origin, event_id) VALUES (?,?,?,?,?,?,?)',
                                                                            [make, year, number_of_seats, 0, car_type_name, origin, eventId]);
        }
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while adding');
    } finally {
        conn.release();
    }
    return cars;
}

const bookCar = async (carId, userId) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('INSERT INTO users_cars (user_id, car_id) VALUES (?,?)', [userId, carId])
        await conn.execute('UPDATE cars SET amount_of_seats_taken = amount_of_seats_taken + 1 WHERE car_id = ?', [carId])
        return result[0];
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while booking car');
    } finally {
        conn.release();
    }
}

const getCarsByEventId = async (eventId) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.execute('SELECT * FROM cars where event_id = ?', [eventId])
        return result[0];
    } catch (err) {
        console.log('Error', err);
        throw Error('An error occured while getting cars by event');
    } finally {
        conn.release();
    }
}

module.exports = {
    getCarsFromCarRentalService,
    bookCars,
    bookCar,
    getCarsByEventId
}