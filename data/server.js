const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-routes');
const knex = require('./db-config');

const server = express();

const sessionConfig = {
  name: 'knex-session-config',
  secret: 'secret_validation_token',

  store: new KnexSessionStore({
    knex,
    createtable: true,
    tablename: 'sessions',
    sidfieldname: 'sid',
    clearInterval: 1000 * 60 * 10,
  }),

  cookie: {
    maxAge: 100 * 60 * 10,
    secure: false,
    httpOnly: true,
    saveUninitialized: true,
    resave: false,
  },
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.use('/', (req, res) => {
  res.send({message: 'Users API is running...'});
});

module.exports = server;
