const express = require('express');
const carsRouter = express.Router();

const { getCarsById } = require('../controllers/cars.controller');

/* GET cars by event id */
carsRouter.get('/:eventId', async function (req, res, next) {
    const eventId = req.params.eventId
    const result = await getCarsById(eventId);
    if (result.error) return res.status(500).json({ error: result.error });
    return res.status(200).json(result);
});

module.exports = carsRouter;