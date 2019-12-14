const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const indexRouter = require('./api/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.disable('x-powered-by');

// const secret = process.env.NODE_ENV === 'prod' ? 'test' : process.env.JWT_SECRET;
// const jwtMW = expressJwt({
//     secret: secret,
// }).unless({path:['/api/v1/', '/api/v1/users', '/api/v1/auth']});
// app.use('/api/v1/', jwtMW, indexRouter);

app.use('/api/v1/', indexRouter);


// // Error handling for auth
// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
//         res.status(401).send(err);
//     }
//     else {
//         next(err);
//     }
// });

module.exports = app;