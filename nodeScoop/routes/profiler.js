const express = require("express");
const routes = express.Router();
const connection = require("../dbconnection");
const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { verifyToken } = require('../middleware/middle.js');

// profiler.js
routes.get('/', (req, res) => {
    res.send({'api': 'profiler'})
});

// show user profile
routes.get('/profile/:user_id', (req, res) => {
    let id = req.params.user_id;
    let sql = "select * from users where user_id=?"
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

// show post in profile
routes.get('/posts_profile/:user_id', (req, res) => {
    let id = req.params.user_id;
    let sql = `
    SELECT post.*, COUNT(liked_post.user_id) as liked
    from (select p1.post_id, i1.image as user_image, i2.image as post_image, u1.user_id, u1.first_name, u1.last_name, p1.datetime, p1.text
    from users u1 LEFT JOIN photos i1 on u1.photo_id = i1.photo_id,
    posts p1 LEFT JOIN photos i2 on p1.post_id = i2.post_id
    where p1.user_id = u1.user_id and u1.user_id = ?) post LEFT JOIN liked_post
    ON liked_post.post_id = post.post_id
    GROUP BY 1
    ORDER by post.datetime DESC
    `
    connection.query(sql, [id], (error, results, fields) => {
        if (error) {
            throw error;
        }
        return res.send(results);
    });
});

// show all posts signed in
routes.get('/home_posts/', (req, res) => {
    // let id = req.query.id;
    let sql = `
    SELECT post.*, COUNT(liked_post.user_id) as liked
    from (select p1.post_id, i1.image as user_image, i2.image as post_image, u1.user_id, u1.first_name, u1.last_name, p1.datetime, p1.text
    from users u1 LEFT JOIN photos i1 on u1.photo_id = i1.photo_id,
    posts p1 LEFT JOIN photos i2 on p1.post_id = i2.post_id
    where p1.user_id = u1.user_id) post LEFT JOIN liked_post
    ON liked_post.post_id = post.post_id
    GROUP BY 1
    ORDER by post.datetime DESC
    `
    connection.query(sql, [], (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            return res.send(results);
        }
    });
});

// show all posts
routes.get('/home_posts/', (req, res) => {
    // let id = req.query.id;
    let sql = "select * from posts, users where posts.user_id = users.user_id ORDER by datetime DESC"
    connection.query(sql, [], (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            return res.send(results);
        }
    });
});

// show liked_commented
routes.get('/like_comment/', (req, res) => {
    const comment_id = req.body.post_id;
    let sql = "SELECT COUNT(user_id) FROM liked_comment where comment_id = ?";
    sql = mysql.format(sql, [
        comment_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.json({
                results: results
            });
        }
    });
});

// show count_commented
routes.get('/count_commented/:post_id', (req, res) => {
    const post_id = req.params.post_id;
    let sql = "SELECT COUNT(comment_id) FROM comments where post_id = ?";
    sql = mysql.format(sql, [
        post_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.send(results);
        }
    });
});

// show liked post
routes.get('/like_post/', (req, res) => {
    const post_id = req.body.post_id;
    let sql = "SELECT COUNT(user_id) FROM liked_post where post_id = ?";
    sql = mysql.format(sql, [
        post_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.json({
                results: results
            });
        }
    });
});

// show user_liked_post
routes.get('/user_liked_post/', (req, res) => {
    let sql = "SELECT post_id, user_id ,COUNT(user_id) as liked FROM liked_post GROUP BY post_id";
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            res.send(results)
        }
    });
});

// show user_followed
routes.post('/user_followed/:user_id', (req, res) => {
    const userID_1 = req.body.my_id;
    const userID_2 = req.params.user_id;
    let sql = "SELECT 1 as followed from follows where userID_1 = ? and userID_2 = ?";
    connection.query(sql, [ userID_1, userID_2 ], (error, results, fields) => {
        if (error) throw error;
        else {
            res.send(results)
        }
    });
});

// SELECT post_id, user_id ,COUNT(user_id) as liked FROM liked_post GROUP BY post_id

// show following c
routes.get('/show_following_c/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    let sql = "SELECT COUNT(userID_1) as following FROM follows where userID_2 = ?";
    sql = mysql.format(sql, [
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            return res.send({results});
        }
    });
});

// show followers c
routes.get('/show_followers_c/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    let sql = "SELECT COUNT(userID_2) as followers FROM follows where userID_1 = ?";
    sql = mysql.format(sql, [
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            return res.send({results});
        }
    });
});

// show following
routes.get('/show_followers/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    let sql = `
    SELECT myfollower.*, COUNT(follows.userID_1) as follower, COUNT(follows.userID_2) as following
    from (SELECT userID_1, users.user_id, first_name, last_name, photos.image
    FROM follows,
    users LEFT JOIN photos on photos.photo_id = users.photo_id
    where userID_1 = users.user_id and userID_2 = ?) myfollower left join follows on follows.userID_1 = myfollower.userID_1
    GROUP by 1
    `;
    sql = mysql.format(sql, [
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            return res.send(results);
        }
    });
});

// show followers
routes.get('/show_following/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    let sql = `SELECT myfollower.*, COUNT(follows.userID_1) as follower, COUNT(follows.userID_2) as following
    from (SELECT userID_2, users.user_id, first_name, last_name, photos.image
    FROM follows,
    users LEFT JOIN photos on photos.photo_id = users.photo_id
    where userID_1 = ? and userID_2 = users.user_id) myfollower left join follows on follows.userID_1 = myfollower.userID_2
    GROUP by 1`;
    sql = mysql.format(sql, [
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            return res.send(results);
        }
    });
});

routes.get('/get_user_image/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    let sql = "SELECT users.user_id, users.photo_id, image FROM users LEFT JOIN photos on users.photo_id = photos.photo_id WHERE users.user_id = ?";
    sql = mysql.format(sql, [
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            return res.send(results);
        }
    });
});
 
routes.get('/show_user_image/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    let sql = "SELECT image FROM photos WHERE user_id = ?";
    sql = mysql.format(sql, [
        user_id
    ]);
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        else {
            return res.send(results);
        }
    });
});

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