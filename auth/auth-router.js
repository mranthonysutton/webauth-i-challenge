const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.addUser(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({error: 'Unable to create a new user.'});
    });
});

module.exports = router;
