const express = require('express');
const authRouter = express.Router();

const { login } = require('../controllers/auth.controller');

/* POST auth listing. */
authRouter.post('/', async function (req, res, next) {
    const { username, password } = req.body;
    const result = await login(username, password);
    if (result.error) return res.status(401).json({ error: result.error });
    return res.status(200).json(result);
});


module.exports = authRouter;