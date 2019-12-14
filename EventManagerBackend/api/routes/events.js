const express = require('express');
const eventsRouter = express.Router();

const { addEvent, removeEvent, updateEvent } = require('../controllers/events.controller');

/* GET events listing. */
eventsRouter.get('/', function (req, res, next) {
    res.json({ events: [{ name: 'Timmy' }] });
});

/* POST events listing. */
eventsRouter.post('/:id', function (req, res, next) {
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