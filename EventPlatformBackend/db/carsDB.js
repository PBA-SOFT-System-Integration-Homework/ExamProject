const connection = require('./DBConnector')
const pool = connection.getPool();
const fetch = require('node-fetch')


const getCarsFromMiniproject = async () => {
    let cars = await fetch('http://'+process.env.MOM_SERVICE_URL+"/car").then(res => {
        return res.json();
    });
    return cars;
}

const bookCars = async (cars, eventId) => {
    const conn = await pool.getConnection();
    try {
        for (let idx in cars) {
            const { make, year, number_of_seats, car_type_name } = cars[idx]
            // console.log([make, year, number_of_seats, 0, car_type_name, eventId])
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
    getCarsFromMiniproject,
    bookCars,
    bookCar,
    getCarsByEventId
}