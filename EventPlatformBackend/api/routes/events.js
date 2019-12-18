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

    const { name, description, date, amountOfPeople, location } = req.body
    if (!name || name === ''
        || !date || date === ''
        || !amountOfPeople || amountOfPeople === ''
        || !location || location === '') {
        const errorMsg = 'A property is missing';
        console.log(errorMsg)
        return res.status(400).json({ error: errorMsg });
    }

    const result = await addEvent(name, description, date, amountOfPeople, location);
    if (result.error) {
        return res.status(500).json({ error: result.error })
    }
    return res.status(201).json({ success: result })
});

module.exports = eventsRouter;