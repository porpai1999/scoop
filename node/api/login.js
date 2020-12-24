const express = require('express');
const connection = require('../dbconnection');
const router = express.Router();
const mysql = require('mysql');

router.get('/hello', (req, res) => {
    connection.query('select * from user', (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results)
    });
});

router.post('/auth', (req, res) => {
    let data = req.body;

    let sql = 'select * from user where username = ? and password = ?';
    sql = mysql.format(sql, [
        data.username,
        data.password,
    ]);

    if (data.username && data.password) {
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            if (results.length > 0) {
                console.log('Correct!');
                res.status(200).json({
                    masseage : results
                });
            } else {
                console.log('Incorrect!');
                res.status(200).json({
                    masseage : results
                });
            }
        });
    }
});

module.exports = router;