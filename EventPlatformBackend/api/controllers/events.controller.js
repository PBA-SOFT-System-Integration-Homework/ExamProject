const eventsDb = require('../../db/eventsDb');
const { getCars, bookCars } = require('../controllers/cars.controller');

// ADD LOGIC HERE THEN CALL DB,

/**
 * Add event to database and get cars for it
 * 
 * @param {string} name 
 * @param {string} description 
 * @param {string} date 
 * @param {number} amountOfPeople 
 * @param {string} location 
 */
const addEvent = async (name, description, date, amountOfPeople, location, carType, numberOfSeats) => {
    let result;
    try {
        result = await eventsDb.addEvent(name, description, date, amountOfPeople, location);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }

    // Get cars for event to book
    const cars = await getCars(amountOfPeople, carType, numberOfSeats);
    if (cars.error) return { error: cars.error }

    // Book available cars
    const eventId = result.insertId
    const resp = await bookCars(cars, eventId)
    if (resp.error) return { error: resp.error }

    return { success: resp, generatedEventId: eventId };
}

/**
 * 
 */
const getEvents = async () => {
    try {
        return await eventsDb.getEvents();
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

module.exports = {
    addEvent,
    getEvents
}