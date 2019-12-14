const express = require('express');
const usersRouter = express.Router();

const {addUser, removeUser, updateUser} = require('../controllers/users.controller');

/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
  res.json({ users: [{ name: 'Timmy' }] });
});

/* POST users listing. */
usersRouter.post('/:id', function (req, res, next) {
  res.json({ users: [{ name: 'Timmy' }] });
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