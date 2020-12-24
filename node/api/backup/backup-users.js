const express = require("express");
const connection = require("../dbconnection");
const mysql = require('mysql');
const path = require('path');
const { request } = require("http");
const { response } = require("express");
const session = require("express-session");
const { error } = require("protractor");

const router = express.Router();

// router.get('/', (req, res)=> {
//     connection.query('select * from user', (error, results, fields) => {
//         if (error) throw error;
//         res.status(200).json(results);
//     });
// });

router.post('/', (req, res)=> {
    let data = req.body;
    let sql = 'select * from user where username = ? and password = ?';
    // res.send(data);
    sql = mysql.format(
        sql,
        [data.username, data.password],
    )
    
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send(res.json(results.length));
        // res.status(200).json(results.length);
        // res.end();
        // res.status(200).json({
        //     masseage : 'Insert success'
        // });
    });
    // if (data.username && data.password) {
    //     // res.send("Correct");   
    //     connection.query(sql, (error, results, fields) => {
    //         res.status(200).json(results);
    //     });
    // } else {
    //     res.send('Please enter username and password');
    // }
    // res.end();
});

// router.post('/', (req, res)=> {
//     let username = req.body.username;
//     let password = req.body.pasword;

//     if (username && password) {
//         connection.query(
//             'selection * from user where username = ? and password = ?',
//             [username, password],
//             (error, results, fields) => {
//                 if (results.length > 0) {
//                     req.session.loggedin = true;
//                     req.session.username = username;
//                     res.send("Correct");
//                 } else {
//                     res.send("Incorrect");
//                 }
//                 res.end();
//             }
//         )
//     } else {
//         res.send('Please enter username and password');
//     }
//     res.end();
// });


// router.post('/', (req, res)=> {
//     let data = req.body;
//     let sql = 'insert into users (username, name, surname)' +
//     'values(?, ?, ?)';
//     sql = mysql.format(sql, [
//         data.username,
//         data.name,
//         data.surname
//     ]);
//     connection.query(sql,  (error, results, fields) => {
//         if (error) throw error;
//         if (results.affectedRows == 1) {
//             res.status(200).json({
//                 masseage : 'Insert success'
//             });
//         }else {
//             res.status(400).json({
//                 masseage : 'Insert failed'
//             });
//         }
//     });
// });

// router.get('/', (req, res)=> {
//     res.sendFile(path.join(__dirname + '/'));
// });

// router.post('/auth', (req, res) =>{
//     var username = req.body.username;
//     var password = req.body.password;

//     if (username && password) {
//         connection.query(
//             'selection * from user where username = ? and password = ?',
//             [username, password],
//             (error, results, fields) => {
//                 if (results.length > 0) {
//                     req.session.loggedin = true;
//                     req.session.username = username;
//                     response.send("Correct");
//                     response.redirect('/');
//                 } else {
//                     response.send("Incorrect");
//                 }
//                 response.end();
//             }
//         )
//     } else {
//         response.send('Please enter username and password');
//     }
//     response.end();
// });

// router.get('/home', (req, res) => {
//     if (req.session.loggedin) {
//         response.send("Wellcome" + req.session.username + '!');
//     } else {
//         response.send(req.session.username + '?');
//     }
//     response.end();
// });
module.exports = router