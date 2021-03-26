const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const cors = require('cors');
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Credentials', true); 
//     if (req.method === 'OPTIONS') {
//         res.send(200);
//     } else {
//         next();
//     }
// });

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', '.');

app.use(express.static('.'));
app.use(bodyPaser.json());

app.get('/', (req, res) => {
    res.send({message: "Welcome to Scoop" });
});

app.use('/index', require('./routes/index'));
app.use('/verify', require('./routes/secure'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/profiler', require('./routes/profiler'));


module.exports = app;
