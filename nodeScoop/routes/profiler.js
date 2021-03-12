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
routes.get('/posts_profile/:user_id', (req, res) => {
    let id = req.params.user_id;
    let sql = "select * from posts where user_id=?"
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

// show all posts
routes.get('/posts/', (req, res) => {
    // let id = req.query.id;
    let sql = "select * from posts, users where posts.user_id = users.user_id"
    connection.query(sql, [], (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            return res.send(results);
        }
    });
});

// show liked_commented
routes.get('/like_comment/', (req, res) => {
    const comment_id = req.body.post_id;
    let sql = "SELECT COUNT(user_id) FROM liked_comment where comment_id = ?";
    sql = mysql.format(sql, [
        comment_id
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

// show liked post
routes.get('/like_post/', (req, res) => {
    const post_id = req.body.post_id;
    let sql = "SELECT COUNT(user_id) FROM liked_post where post_id = ?";
    sql = mysql.format(sql, [
        post_id
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