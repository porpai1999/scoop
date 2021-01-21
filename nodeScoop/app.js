const {Router} = require('express');
const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const multer = require('multer');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', '.');
app.use(express.static('.'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyPaser.json());

app.get('/', (req, res) => {
    res.send({'test' : 'this text was sent from the server'})
});

app.use('/', require('./routes/index.js'));
app.use('/verify', require('./routes/secure.js'));
app.use('/users', require('./routes/users.js'));

module.exports = app;
