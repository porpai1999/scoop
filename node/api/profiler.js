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

router.post('/post', (req, res) => {
    let data = req.body;
    let sql = 'insert into post (id_userpost, type, text, image)' +
    'values(?, ?, ?, ?)';

    sql = mysql.format(sql, [
        data.id_userpost,
        data.type,
        data.text,
        data.image,
    ]);

    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.status(200).json({
            masseage : results
        });
    });
});
router.get('/delete_account:id', (req, res) => {
    connection.query('delete from user where id ='+id , (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results)
    });
})
module.exports = router;