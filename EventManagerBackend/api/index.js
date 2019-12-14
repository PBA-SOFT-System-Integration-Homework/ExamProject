const express = require('express');
const app = express();

const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const authRouter = require('./routes/auth');

app.get('/', (req, res, next) => res.json({ hello: "World!" }));

app.use('users', usersRouter);
app.use('events', eventsRouter);
app.use('auth', authRouter);


module.exports = app;