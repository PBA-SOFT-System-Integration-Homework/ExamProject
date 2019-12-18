const express = require('express');
const carsRouter = express.Router();

const { getCarsFromMom } = require('../controllers/carsAggregator');

/* GET cars by event id */
carsRouter.get('/', async function (req, res, next) {
    const result = await getCarsFromMom();
    if (result.error) return res.status(500).json({ error: result.error });
    return res.status(200).json(result);
});

module.exports = carsRouter;