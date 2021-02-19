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
    res.send({'log': 'users.js'})
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
routes.get('/update', (req, res) => {
    res.send({'log' : 'update'})
});

// delete
routes.get('/delete', (req, res) => {
    res.send({'log' : 'delete'})
});

routes.get('/select_some/:email', (req, res) => {
    let sql = "select * from users where email=?"
    connection.query(sql, [req.params.email], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

module.exports = routes;