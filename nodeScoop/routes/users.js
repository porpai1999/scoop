const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");
const mysql = require('mysql');
const phppass = require("node-php-password");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single("file");

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}

// users.js
routes.get('/', (req, res) => {
    res.send({'api': 'users'})
});

// post text
routes.post('/post', (req, res) => {
    res.send("Post");
});

// add photos in post
routes.post('/add_photo', (req, res) => {
    res.send("add_photo_in_post");
});

// upload image
routes.post('/upload_image', async (req, res) => {
    await upload(req, res, (err) => {
        console.log(req);
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
                    message: "File Uploaded",
                    file: req.file.filename
                });
            }
        }
    });
});

// update
routes.put('/update', (req, res) => {
    //res.send({'log' : 'update'});
    const { first_name, last_name, user_id } = req.body;
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

// delete
routes.get('/delete', (req, res) => {
    res.send({'log' : 'delete'})
});

routes.get('/select_some/:user_id', (req, res) => {
    let sql = "select * from users where user_id=?"
    connection.query(sql, [req.params.user_id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

module.exports = routes;