const router = require('express').Router();
const Users = require('./users-model.js');

router.post('/', (req, res) => {
  Users.getUsers()
    .then(response => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({error: 'Unable to retrieve a list of users.'});
    });
});
