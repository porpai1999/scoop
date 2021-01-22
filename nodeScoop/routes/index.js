const express = require('express');
const routes = express.Router();
const connection = require('../dbconnection');
const mysql = require('mysql');
const path = require('path');

routes.get('/', (req, res) => {
    //console.log(path.join(__dirname, '..\\'));
    console.log("Welcome to Scoop");
    res.sendFile(path.join(__dirname, '..\\index.html'));
    res.render('index');
});

module.exports = routes;