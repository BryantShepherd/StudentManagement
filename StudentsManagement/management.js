const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const connection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "guest",
    database: "students_info"
});

router.get('/', (req, res, next) => {
    // TODO: show all students
    res.end();
});

router.get('/:id', (req, res, next) => {
    // TODO: show student with the given id
    res.end();
});

router.post('/', (req, res, next) => {
    // TODO: create new student / update student
    res.end();
});

// TODO: delete student