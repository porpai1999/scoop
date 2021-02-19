const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
var passwordHash = require('password-hash');

const { checkAuth } = require('../middleware/middle.js');
// const checkAuth = require('../middleware/middle.js');

routes.get('/', (req, res) => {
    res.send({'log': 'auth.js'})
    
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
                if (passwordHash.verify(plainTextPassword, results[0].password)) {
                    const token = jwt.sign(
                        {
                            id: results[0].user_id,
                            email: email
                        },
                        config.JWT_SECRET
                    );
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
routes.post('/register', (req, res) => {
    const { email, password: plainTextPassword, first_name, last_name, date_of_birth, gender, photo_id} = req.body;
    const password = passwordHash.generate(plainTextPassword);
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

routes.get("/token", (req, res) => {
    const payload = {
      name: "Jimmy",
      scopes: "customer:read"
    };
  
    const token = jwt.sign(payload, config.JWT_SECRET);
    res.send(token);
  });
  
// routes.get("/customer", checkAuth("customer:read"), (req, res) => {
// res.send("You are in Profile Page!!");
// });

module.exports = routes;

/*
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
    
});*/