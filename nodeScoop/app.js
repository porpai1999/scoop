const {Router} = require('express');
const express = require('express');
const app = express();
const bodyPaser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.use(bodyPaser.json());

module.exports = app;
