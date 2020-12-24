const {Router} = require('express');
const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const usersController = require('./api/users');
const login = require('./api/login');

app.use(bodyPaser.json());
app.use('/users', usersController);
app.use('/login', login);



module.exports = app;
