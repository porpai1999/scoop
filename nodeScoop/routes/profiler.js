const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");

// profiler.js
routes.get('/', (req, res) => {
    res.send({'log': 'profiler.js'})
});

// show user profile
routes.get('/profile/', (req, res) => {
    let id = req.query.id;
    let sql = "select * from users where user_id=?"
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

// show post in profile
routes.get('/posts_profile/', (req, res) => {
    let id = req.query.id;
    let sql = "select * from post where user_id=?"
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