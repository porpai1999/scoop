const express = require('express');
const router = express.Router();
//const connection = require('../dbconnect');
const mysql = require('mysql');

// users.js
router.get('/', (req, res) => {
    res.send({'log' : 'users.js'})
});

// select
router.get('/login', (req, res) => {
    res.send({'log' : 'select'})
});

// insert
router.get('/register', (req, res) => {
    res.send({'log' : 'insert'})
});

// update
router.get('/update', (req, res) => {
    res.send({'log' : 'update'})
});

// delete
router.get('/delete', (req, res) => {
    res.send({'log' : 'delete'})
});

module.exports = router;