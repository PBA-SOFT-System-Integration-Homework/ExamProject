const express = require('express');
const eventsRouter = express.Router();

const { addEvent, removeEvent, updateEvent, getEventByName, getEvents } = require('../controllers/events.controller');
const { getCars, bookCars } = require('../controllers/cars.controller');

/* GET events listing. */
eventsRouter.get('/', async function (req, res, next) {
    const result = await getEvents();
    if (result.error) {
        return res.status(500).json({ error: result.error })
    }
    return res.status(200).json(result);
});

/* POST event. */
eventsRouter.post('/', async function (req, res, next) {
    let { name, description, date, amountOfPeople, location, carType, numberOfSeats } = req.body
    if (!name || name === ''
        || !date || date === ''
        || !amountOfPeople || amountOfPeople === ''
        || !location || location === '') {
        const errorMsg = 'A property is missing';
        console.log(errorMsg)
        return res.status(400).json({ error: errorMsg });
    }

    if (!carType || carType == '') carType = 'null'
    if (!numberOfSeats || numberOfSeats == '') numberOfSeats = 'null'

    const result = await addEvent(name, description, date, amountOfPeople, location, carType, numberOfSeats);
    if (result.error) {
        return res.status(500).json({ error: result.error })
    }
    return res.status(201).json({ success: result, generatedEventId: result.generatedEventId })
});

module.exports = eventsRouter;