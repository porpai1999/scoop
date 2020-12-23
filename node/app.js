const mysql = require('mysql');
const express = require('express');
const sesssion = require('express-session');
const bodyPaser = require('body-parser');
const usersController = require('./api/users');
const app = express();

app.use(bodyPaser.json());
app.use('/', usersController);
app.use('/users', usersController);

module.exports = app;
