const express = require('express');
const server = express();
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-routes');

server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api', authRouter);

server.use('/', (req, res) => {
  res.send({message: 'Users API is running...'});
});

module.exports = server;
