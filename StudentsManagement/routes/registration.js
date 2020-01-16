const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "guest",
    database: "students_info"
});

let sqlQuery;
let newUsername, password;
// TODO: check if user already exists

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res, next) => {
    newUsername = req.body.username;
    password = bcrypt.hashSync(req.body.password, 10);
    sqlQuery = `INSERT INTO login_info VALUES ("${newUsername}", "${password}")`;
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/login');
    })
});

module.exports = router;