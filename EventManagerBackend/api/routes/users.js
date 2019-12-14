const express = require('express');
const usersRouter = express.Router();

const { addUser, removeUser, updateUser } = require('../controllers/users.controller');

/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
  res.json({ users: [{ name: 'Timmy' }] });
});

/* POST users listing. */
usersRouter.post('/', async function (req, res, next) {
  if (req.body.newUser) {
    const { username, password } = req.body.newUser
    const result = await addUser(username, password);
    if (result.error) {
      return res.json({ error: result.error })
    }
    return res.json({ success: 'User added succesfully' });
  } else {
    return res.json({ error: 'No user data provided' });
  }
});

/* PUT users listing. */
usersRouter.put('/:id', function (req, res, next) {
  res.json({ users: [{ name: 'Timmy' }] });
});

/* DELETE users listing. */
usersRouter.delete('/:id', function (req, res, next) {
  res.json({ users: [{ name: 'Timmy' }] });
});

module.exports = usersRouter;