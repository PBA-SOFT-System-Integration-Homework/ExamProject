const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const carsRouter = require('./api/routes/cars');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())
app.disable('x-powered-by');

app.get('/', (req, res, next) => res.json({ hello: "developers!" }));

app.use('/api/v1/', carsRouter);

module.exports = app;