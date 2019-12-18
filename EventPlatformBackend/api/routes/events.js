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

/* GET event by id. */
eventsRouter.get('/:id', function (req, res, next) {
    res.json({ events: [{ name: 'Timmy' }] });
});


/* POST event. */
eventsRouter.post('/', async function (req, res, next) {
    const { name, description, date, amountOfPeople, location } = req.body
    const result = await addEvent(name, description, date, amountOfPeople, location);
    if (result.error) {
      return res.status(500).json({ error: result.error })
    }

    // Booking cars for event
    const cars = await getCars(amountOfPeople);
    if (cars.error) {
        return res.status(500).json({ error: cars.error })
    } else {
        const eventId = result.insertId
        const resp = await bookCars(cars, eventId)
        if (resp.error) {
            return res.status(500).json({ error: resp.error })
        } else {
            return res.status(201).json({ succes: resp })
        }
    }
});

// /* PUT events listing. */
// eventsRouter.put('/:id', function (req, res, next) {
//     res.json({ events: [{ name: 'Timmy' }] });
// });

// /* DELETE events listing. */
// eventsRouter.delete('/:id', function (req, res, next) {
//     res.json({ events: [{ name: 'Timmy' }] });
// });

module.exports = eventsRouter;