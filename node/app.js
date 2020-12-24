const {Router} = require('express');
const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const usersController = require('./api/users');
// const connection = require('./dbconnection');

app.use(bodyPaser.json());
app.use('/', usersController);
app.use('/users', usersController);

module.exports = app;
