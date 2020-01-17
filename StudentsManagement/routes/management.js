const express = require('express');
const mysql = require('mysql');
const TABLE = "students_info";
const router = express.Router();
const randomstring = require('randomstring');

const connection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "guest",
    database: "students_info"
});

let sqlQuery;

router.get('/', (req, res, next) => {
    // TODO: show all students
    sqlQuery = "SELECT * FROM students";
    if (req.query.id) sqlQuery += ` WHERE id = ${req.query.id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.render('home', {students : result})
    });
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.get('/update/:id', (req, res) => {
    sqlQuery = "SELECT * FROM students";
    sqlQuery += ` WHERE id = ${req.params.id}`;
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        // TODO: handle error if no result (even though if the id doesn't exist, we wouldn't be able to find anyone)
        res.render('update', {students : result})
    });
});

router.get('/delete/:id', (req, res) => {
    sqlQuery = `DELETE FROM students WHERE id="${req.params.id}"`;
    connection.query(sqlQuery, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
        res.redirect('/');
    })
});

let id, name, birth, email, major, gpa;
router.post('/', (req, res, next) => {
    // TODO: check for null values
    id = randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
    name = req.body.name;
    birth = req.body.birth;
    email = req.body.email;
    major = req.body.major;
    gpa = req.body.gpa;
    sqlQuery = `INSERT INTO students VALUES ("${id}", "${name}", "${birth}", "${email}", "${major}", ${gpa})`;
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log("Insert Success");
        res.redirect('/students');
    });
});

router.post('/update', (req, res) => {
    console.log("Putting");
    sqlQuery = `UPDATE students set name="${req.body.name}", birth="${req.body.birth}", email="${req.body.email}", major="${req.body.major}", gpa=${req.body.gpa} WHERE id="${req.body.id}"`;
    connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

// TODO: delete student

module.exports = router;