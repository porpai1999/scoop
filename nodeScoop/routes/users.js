const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");
const mysql = require('mysql');
const phppass = require("node-php-password");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const config = require('../config/config');

const checkAuth = require('../middleware/secure.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
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

const JWT_SECRET = 'sdjhgkjaidfokawlkrjpjoeknug;kcpvk2#@#k(kv47541';

function verifyJWT(token, JWT_SECRET) {
    try {
        const JWT_verify = jwt.verify(token, JWT_SECRET);
        JWT_verify.status = true;
        return JWT_verify;
    } catch (error) {
        return { status: false, message: error};
    }
}

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
    
});

// login
routes.post('/login', (req, res, next) => {
    const  { email, password: plainTextPassword } = req.body;
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: false, error: 'Invalid password'});
    }
    if (!email || typeof email !== 'string') {
        return res.json({ status: false, error: 'Invalid email'});
    } else {
         connection.query( mysql.format("select user_id, password from users where email=?", [email]), (error, results, fields) => {
            if (error) { return res.json({ status: false, error: 'Error404'}); }
            if (results.length > 0) {

                if (phppass.verify(plainTextPassword, results[0].password)) {
                    const token = jwt.sign(
                        {
                            id: results[0].user_id,
                            email: email
                        },
                        config.JWT_SECRET
                    );
                    // return res.send(token);
                    return res.json({ status: true, email: email, user_id: results[0].user_id , token: token});
                } else {
                    return res.json({ status: false, error: 'Invalid Password'});
                }
            } else {
                return res.json({ status: false, error: 'Invalid email'});
            }
        });
    }
});

// register
routes.post('/register', async (req, res) => {
    const { email, password: plainTextPassword, first_name, last_name, date_of_birth, gender, photo_id} = req.body;
    const password = await phppass.hash(plainTextPassword);
    if (!email || typeof email !== 'string') {
        return res.json({ status: false, error: 'Invalid email'});
    }
    
    if (!first_name || typeof first_name !== 'string') {
        return res.json({ status: false, error: 'Invalid first_name'});
    }

    if (!last_name || typeof last_name !== 'string') {
        return res.json({ status: false, error: 'Invalid last_name'});
    }

    if (!date_of_birth || typeof date_of_birth !== 'string') {
        return res.json({ status: false, error: 'Invalid date_of_birth'});
    }

    if (!gender || typeof gender !== 'string') {
        return res.json({ status: false, error: 'Invalid gender'});
    }

    let sql = 'insert into users (photo_id, email, password, first_name, last_name, date_of_birth, gender)' +
    'values(?, ?, ?, ?, ?, ?, ?)';

    sql = mysql.format(sql, [
        photo_id,
        email,
        password,
        first_name,
        last_name,
        date_of_birth,
        gender
    ]);

    connection.query(sql, (error, results, fields) => {
        if (error) {
            if (error.sqlMessage) {
                return res.status(500).json({ status: false, message: error.sqlMessage, duplicate_email: true });
            } else {
                return res.status(404).json({ status: false, message: "error"});
            }
            
        }
        if (results.affectedRows > 0) {
            return res.status(200).json({ status: true });
        } else {
            return res.status(501).json({ status: false });
        }
    });
    
});

// upload image
routes.post('/upload_image', async (req, res) => {
    await upload(req, res, (err) => {
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

routes.get('/select_some', (req, res) => {
    
    let sql = "select * from users where user_id=6 "
    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.log("error");
            throw error;
        }
        else {
            while(row = results.forEach(element => {
                return res.send(results);
            })){}
        }
    });
});

routes.get("/token", (req, res) => {
    const payload = {
      name: "Jimmy",
      scopes: "customer:read"
    };
  
    const token = jwt.sign(payload, config.JWT_SECRET);
    res.send(token);
  });
  
routes.get("/customer", checkAuth("customer:read"), (req, res) => {
res.send("You are in Profile Page!!");
});

module.exports = routes;