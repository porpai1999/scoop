const express = require('express');
const router = express.Router();
const connection = require('../dbconnection');
const mysql = require('mysql');

router.get('/', (req, res) => {
    res.send("Welcome to Scoop");
});

module.exports = router;