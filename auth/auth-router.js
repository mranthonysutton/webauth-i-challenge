const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../users/users-model');

function validateUserCredentials(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({error: 'No information was passed into the body.'});
  } else {
    if (!req.body.username) {
      res.status(400).json({error: 'Please provide a username.'});
    } else if (!req.body.password) {
      res.status(400).json({error: 'Please provide a password.'});
    } else {
      next();
    }
  }
}

function userAlreadyExists(req, res, next) {
  let username = req.body.username;

  Users.findUserBy({username})
    .then(response => {
      if (response) {
        res.status(400).json({error: 'That username already exists.'});
      } else {
        next();
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({error: 'Unable to find the user with the username provided.'});
    });
}

router.post(
  '/register',
  [userAlreadyExists, validateUserCredentials],
  (req, res) => {
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
  },
);

router.post('/login', validateUserCredentials, (req, res) => {
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
