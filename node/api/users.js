const express = require("express");
const connection = require("../dbconnection");
const mysql = require('mysql');
const path = require('path');
const { request } = require("http");
const { response } = require("express");
const session = require("express-session");

const router = express.Router();

// router.get('/', (req, res)=> {
//     connection.query('select * from user', (error, results, fields) => {
//         if (error) throw error;
//         res.status(200).json(results);
//     });
// });

router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname + '/'));
});

router.post('/auth', (req, res) =>{
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        connection.query(
            'selection * from user where username = ? and password = ?',
            [username, password],
            (error, results, fields) => {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    response.send("Correct");
                    response.redirect('/');
                } else {
                    response.send("Incorrect");
                }
                response.end();
            }
        )
    } else {
        response.send('Please enter username and password');
    }
    response.end();
});

router.get('/home', (req, res) => {
    if (req.session.loggedin) {
        response.send("Wellcome" + req.session.username + '!');
    } else {
        response.send(req.session.username + '?');
    }
    response.end();
});
module.exports = router