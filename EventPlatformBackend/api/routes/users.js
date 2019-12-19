const express = require('express');
const usersRouter = express.Router();

const { addUser } = require('../controllers/users.controller');

/* POST users listing. */
usersRouter.post('/', async function (req, res, next) {
  if (req.body.newUser) {
    const { username, password } = req.body.newUser
    const result = await addUser(username, password);
    if (result.error) {
      return res.status(500).json({ error: result.error })
    }
    // return newly created user
    return res.status(201).json(result);

  } else {
    return res.status(400).json({ error: 'Missing user data' });
  }
});

module.exports = usersRouter;