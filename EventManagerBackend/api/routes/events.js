const express = require('express');
const eventsRouter = express.Router();

const { addEvent, removeEvent, updateEvent, getEventByName, getEvents } = require('../controllers/events.controller');

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
eventsRouter.post('/', function (req, res, next) {
    const { name, description, date, amountOfPeople, location } = req.body
    const result = await addEvent(name, description, date, amountOfPeople, location);
    if (result.error) {
      return res.status(500).json({ error: result.error })
    }
    return res.status(200).json(result);
    res.json({ events: [{ name: 'Timmy' }] });
});

// /* PUT events listing. */
// eventsRouter.put('/:id', function (req, res, next) {
//     res.json({ events: [{ name: 'Timmy' }] });
// });

/* DELETE events listing. */
eventsRouter.delete('/:id', function (req, res, next) {
    res.json({ events: [{ name: 'Timmy' }] });
});

module.exports = eventsRouter;