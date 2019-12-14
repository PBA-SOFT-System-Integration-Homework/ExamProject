const express = require('express');
const indexRouter = express.Router();

const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const authRouter = require('./routes/auth');

indexRouter.get('/', (req, res, next) => res.json({ hello: "World!" }));

indexRouter.use('/users', usersRouter);
indexRouter.use('/events', eventsRouter);
indexRouter.use('/auth', authRouter);


module.exports = indexRouter;