const express = require('express');
const authRouter = express.Router();

const { login } = require('../controllers/auth.controller');

/* POST auth listing. */
authRouter.post('/', function (req, res, next) {
    console.log('hello')
    return login(req.body.username, req.body.password);
    // res.json({ auth: [{ name: 'Timmy' }] });
});


module.exports = authRouter;