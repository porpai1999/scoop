const {Router} = require('express');
const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const usersController = require('./api/users');
const login = require('./api/login');
const profiler = require('./api/profiler');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send({'test' : 'this text was sent from the server'})
});

app.use(bodyPaser.json());
app.use('/users', usersController);
app.use('/login', login);
app.use('/profiler', profiler);



module.exports = app;
