const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { verifyToken } = require('../middleware/middle.js');

// profiler.js
routes.get('/', (req, res) => {
    res.send({'api': 'profiler'})
});

// show user profile
routes.get('/profile/:user_id', (req, res) => {
    let id = req.params.user_id;
    let sql = "select * from users where user_id=?"
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

// show post in profile
routes.get('/posts_profile/:userid', (req, res) => {
    let id = req.params.user_id;
    let sql = "select * from posts where user_id=?"
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

// show posts
routes.get('/posts/', (req, res) => {
    let id = req.query.id;
    let sql = "select * from post"
    connection.query(sql, [], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

module.exports = routes;


/*
// user_profile
routes.post('/profiler', (req, res) => {
    // res.send("Profiler");
    const { user_id, email, token} = req.body;
    let is_verify = false;
    let verifyJWT_result = verifyJWT(token, JWT_SECRET);
    is_verify = verifyJWT_result.status;

    if (!user_id || typeof user_id !== "number") {
        console.log(is_verify);
        return res.json({ status: false, error: 'Session lossed!'});
    }
    if (!email || typeof email !== 'string') {
        return res.json({ status: false, error: 'Session lossed!'});
    }

    if (is_verify) {
        connection.query( mysql.format("select * from users where user_id=? and email=?", [user_id, email]), (error, results, fields) => {
            if (error) throw error;
            if(results.length > 0) {
                return res.json(results[0]);
            } else {
                return res.json({ status: false, error: 'Session lossed!'});
            }
        });
    } else {
        return res.json({ status: false, verify: is_verify});
    }
    
});*/