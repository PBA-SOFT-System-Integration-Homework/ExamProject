const express = require('express');
const carsRouter = express.Router();

const { getCars } = require('../controllers/carsAggregator');

/* GET cars by event id */
carsRouter.get('/cars', async function (req, res, next) {
    let { carTypeName, numberOfSeats } = req.query
    if (carTypeName == "null") carTypeName = undefined
    if (numberOfSeats == "null") numberOfSeats = undefined
    const result = await getCars(carTypeName, numberOfSeats);
    if (result.error) return res.status(500).json({ error: result.error });
    return res.status(200).json(result);
});

module.exports = carsRouter;