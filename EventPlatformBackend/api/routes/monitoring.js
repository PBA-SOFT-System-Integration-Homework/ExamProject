const express = require('express');
const monitoringRouter = express.Router();

const { getRegister } = require('../controllers/monitoring.controller');

/* POST monitoring listing. */
monitoringRouter.get('/metrics', async function (req, res, next) {
    const register = getRegister();
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});

module.exports = monitoringRouter;