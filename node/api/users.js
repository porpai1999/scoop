const express = require('express');
const connection = require('../dbconnection');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res) => {
    connection.query('select * from user', (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results)
    });
});

router.post('/insert', (req, res) => {
    let data = req.body;
    let sql = 'insert into user (username, password, firstname, lastname, address, phone_number, image)' +
    'values(?, ?, ?, ?, ?, ?, ?)';

    sql = mysql.format(sql, [
        data.username,
        data.password,
        data.firstname,
        data.lastname,
        data.address,
        data.phone_number,
        data.image
    ]);

    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.status(200).json({
            masseage : results
        });
    });
});

module.exports = router;