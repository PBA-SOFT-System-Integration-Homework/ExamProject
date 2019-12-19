const express = require('express');
const carsRouter = express.Router();

const { getCars, bookCars } = require('../controllers/cars.controller');

/* GET cars by event id */
carsRouter.get('/cars', async function (req, res, next) {
    let { carTypeName, numberOfSeats } = req.query
    if (carTypeName == "null") carTypeName = undefined
    if (numberOfSeats == "null") numberOfSeats = undefined
    const result = await getCars(carTypeName, numberOfSeats);
    if (result.error) return res.status(500).json({ error: result.error });
    return res.status(200).json(result);
});

carsRouter.post('/cars', async (req, res, next) => {
    console.log(req.body)
    // return error if no cars provided
    if (!req.body.cars || req.body.cars.length === 0) return res.status(400).json({ error: 'No cars provided' })
    const { cars } = req.body;
    try {
        await bookCars(cars);
        return res.status(201).json({cars: cars});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
})

module.exports = carsRouter;