const express = require('express');
const server = express();
const authRouter = require('../auth/auth-router');

server.use(express.json());

server.use('/api', authRouter);

server.use('/', (req, res) => {
  res.send({message: 'Users API is running...'});
});

module.exports = server;
