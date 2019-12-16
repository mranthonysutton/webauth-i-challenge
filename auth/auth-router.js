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

router.post('/login', (req, res) => {
  let {username, password} = req.body;
  console.log(req.body);

  Users.findUserBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json(user);
      } else {
        res.status(401).json({message: 'Invalid credentials were provided.'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: 'Unable to find the user by the username provided.',
      });
    });
});

module.exports = router;
