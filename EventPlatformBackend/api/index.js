const express = require('express');
const indexRouter = express.Router();

const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const authRouter = require('./routes/auth');
const carsRouter = require('./routes/cars');
const monitoringRouter = require('./routes/monitoring');

indexRouter.get('/', (req, res, next) => res.json({
    links: [
        {
            "rel": "self",
            "method": "GET",
            "href": "/"
        },
        {
            "rel": "login",
            "method": "POST",
            "href": "/auth"
        },
        {
            "rel": "cars",
            "method": "GET",
            "href": "/cars/events/:eventId"
        },
        {
            "rel": "create",
            "method": "POST",
            "href": "/cars"
        },
        {
            "rel": "create",
            "method": "POST",
            "href": "/cars"
        },
        {
            "rel": "create",
            "method": "POST",
            "href": "/events"
        },
        {
            "rel": "get",
            "method": "GET",
            "href": "/events"
        },
        {
            "rel": "create",
            "method": "POST",
            "href": "/users"
        },

    ]
}));

indexRouter.use('/auth', authRouter);
indexRouter.use('/cars', carsRouter);
indexRouter.use('/events', eventsRouter);
indexRouter.use('/users', usersRouter);
indexRouter.use('/monitoring', monitoringRouter);


module.exports = indexRouter;