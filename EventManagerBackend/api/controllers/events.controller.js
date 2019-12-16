const eventsDb = require('../../db/eventsDb');

// ADD LOGIC HERE THEN CALL DB,

/**
 * Register user to database
 */
const addEvent = async (name, description, date, amountOfPeople, location) => {
    try {
        return await eventsDb.addEvent(name, description, date, amountOfPeople, location);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
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

/**
 * 
 */
const getEventByName = () => {

}

/**
 * 
 */
const removeEvent = () => {

}

/**
 * 
 */
const updateEvent = () => {

}

module.exports = {
    addEvent,
    removeEvent,
    updateEvent,
    getEventByName,
    getEvents
}