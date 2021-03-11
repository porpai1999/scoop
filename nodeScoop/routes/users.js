const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");
const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { verifyToken, upload } = require('../middleware/middle.js');

// users.js
routes.get('/', (req, res) => {
    res.send({'api': 'users'})
});

// accepted follow
routes.post('/follow', (req, res) => {
    const userID_1 = req.body.userID_1;
    const userID_2 = req.body.userID_2;
    let sql = "insert into posts (userID_1, userID_2) valuse (?, ?)";
    sql = mysql.format(sql, [
        userID_1,
        userID_2
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.json({
                results: results
            });
        }
    });
});

// post text
routes.post('/post/:user_id', (req, res) => {
    const text = req.body.text;
    const user_id = req.params.user_id;
    let sql = "insert into posts (text, user_id) values (?, ?);";
    sql = mysql.format(sql, [
        text,
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.json({
                status: true,
                user_id: results.insertId
            });
        }
    });
});

routes.post('/comment/:user_id', (req, res) => {
    const text = req.body.text;
    const user_id = req.params.user_id;
    const post_id = req.body.post_id;
    let sql = "insert into comments (post_id, text, user_id) values (?, ?, ?);";
    sql = mysql.format(sql, [
        post_id,
        text,
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.json({
                status: true,
                user_id: results.insertId
            });
        }
    });
});

// insert_photos in post
routes.post('/insert_photos', (req, res) => {
    const { user_id, post_id, caption, image, datetime } = req.body;
    let sql = "insert into photos (user_id, post_id, image) values (?, ?, ?)";
    sql = mysql.format(sql, [
        user_id, post_id, image
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.json({
                status: true,
                user_id: results.insertId
            });
        }
    });
});

// upload image
routes.post('/upload_image', async (req, res) => {
    await upload(req, res, (err) => {
        if(err) {
            res.json({
                status: false,
                message: err
            });
        } else {
            if(req.file == undefined) {
                res.json({
                    status: false,
                    message: "Errror: No file Selected"
                });
            } else {
                res.json({
                    status: true,
                    message: "File Selected",
                    path: 'localhost/images/'+req.file.filename
                });
            }
        }
    });
});

// update profile_photo
routes.put('/profile_photo/:user_id', (req, res) => {
    const photo_id = req.body.photo_id;
    const user_id = req.params.user_id;
    let sql = "UPDATE users SET photo_id=? WHERE user_id=?";
    sql = mysql.format(sql, [
        photo_id,
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({
                status: false,
                message: err
            });
        } else {
            if (results.affectedRows > 0) {
                return res.status(200).json({ status: true, results: results });
            } else {
                return res.status(501).json({ status: false, results: results });
            }
        }
    });
});

// update
routes.put('/update/:user_id', (req, res) => {
    //res.send({'log' : 'update'});
    const { first_name, last_name } = req.body;
    const user_id = req.params.user_id;
    let sql = "UPDATE users SET first_name=?, last_name=? WHERE user_id=?";
    sql = mysql.format(sql, [
        first_name,
        last_name,
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.json({
                status: false,
                message: err
            });
        } else {
            if (results.affectedRows > 0) {
                return res.status(200).json({ status: true, results: results });
            } else {
                return res.status(501).json({ status: false, results: results });
            }
        }
    });
});

// update
routes.put('/update/:user_id', (req, res) => {
    //res.send({'log' : 'update'});
    let user = req.params.user_id
    const { first_name, last_name,email } = req.body;
    let sql = "UPDATE users SET first_name=?, last_name=?,email=? WHERE user_id=?";
    connection.query(sql,[first_name,last_name,email,user], (error, results, fields) => {
        if (error) {
            res.json({
                status: false,
                message: err
            });
        } else {
            if (results.affectedRows > 0) {
                return res.status(200).json({ status: true, results: results });
            } else {
                return res.status(501).json({ status: false, results: results });
            }
        }
        
    });
});

// delete
routes.get('/delete', (req, res) => {
    res.send({'log' : 'delete'})
});

/*
verifyToken
jwt.verify(req.token, config.JWT_SECRET, (error) => {
    if (error) { res.sendStatus(403); }
    else {
    }
});
*/
routes.get('/select_some/:user_id', (req, res) => {
    let sql = "select * from users where user_id=?"
    connection.query(sql, [req.params.user_id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

routes.get('/select_some', (req, res) => {
    let sql = "select * from users"
    connection.query(sql, (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

module.exports = routes;