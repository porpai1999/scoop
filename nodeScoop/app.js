const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', '.');
app.use(express.static('.'));

const cors = require('cors');
app.use(cors());

app.use(bodyPaser.json());

app.get('/', (req, res) => {
    res.send({message: "Welcome to Scoop" });
});

app.use('/index', require('./routes/index.js'));
app.use('/verify', require('./routes/secure.js'));
app.use('/users', require('./routes/users'));

module.exports = app;
