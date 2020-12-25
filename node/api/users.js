const express = require('express');
const connection = require('../dbconnection');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res) => {
    connection.query('select * from user', (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results)
        // req.send("hello");
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
        if (results.affectedRows > 0) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    });
});

router.get("/delete_account:uid", (req, res) => {
    let uid = req.params.uid;
    let sql = 'delete from user where user_id = ?';
    sqq = mysql.format(sql, [uid]);
    console.log('Delete')
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            res.status(200).json({
                message : 'Deleted'
            });
        } else {
            res.status(400).json({
                message : 'Delete failed'
            });
        }
    });
});

router.delete("/delete_account/:uid", (req, res) => {
    let uid = req.params.uid;
    let sql = 'delete from user where user_id = ?';
    sql = mysql.format(sql, [uid]);
    console.log('Delete')
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            res.status(200).json({
                message : 'Deleted'
            });
        } else {
            res.status(400).json({
                message : 'Delete failed'
            });
        }
    });
});

router.put("/update_account/:uid", (req, res) => {
    let uid = req.params.uid;
    let data = req.body;
    let sql = 'update user set firstname=?, lastname=?, address=?, phone_number=?, image=? where user_id =?';
    sql = mysql.format(sql, [data.firstname, data.lastname, data.address, data.phone_number, data.image, uid]);
    console.log('Update')
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            res.status(200).json({
                message : 'Updated'
            });
        } else {
            res.status(400).json({
                message : 'Update failed'
            });
        }
    });
});

module.exports = router;