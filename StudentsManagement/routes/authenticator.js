const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const router = express.Router();
const TABLE = "login_info";
const connection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "guest",
    database: "students_info"
});

let username, password;

// TODO: add login/home page
router.post('/', (req, res, next) => {
    username = req.body.username;
    password = req.body.password;
    let sqlSearchQuery = `SELECT * FROM ${TABLE} WHERE username = "${username}"`;

    connection.query(sqlSearchQuery, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.render('login');
        } else {
            if (bcrypt.compareSync(password, result[0].password)) {
                res.redirect('/')
            }
            else res.redirect('login');
        }
    });
});

module.exports = router;