const express = require('express');
const mysql = require('mysql');
const sqlConnect = require('./sqlConnect');
const router = express.Router();
const randomstring = require('randomstring');

const connection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "guest",
    database: "students_info"
});

let sqlQuery;

function errorHandler(error) {
    console.error(error);
}
router.get('/', async (req, res, next) => {
    let students;
    if (req.query.id) students = await sqlConnect.Students.query().where('id', req.query.id).catch(errorHandler);
    else students = await sqlConnect.Students.query().catch(errorHandler);
    res.render('home', {students: students});
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.get('/update/:id', async (req, res) => {
    let students = await sqlConnect.Students.query().where('id', req.params.id).catch(errorHandler);
    res.render('update', {students : students})
});

router.get('/delete/:id', async (req, res) => {
    await sqlConnect.Students.query().delete().where('id', req.params.id);
    res.redirect('/students');
});

router.post('/', async (req, res) => {
    // TODO: check for null values
    await sqlConnect.Students.query().insert({
        id: randomstring.generate({
            length: 6,
            charset: 'numeric'
        }),
        name: req.body.name,
        birth: req.body.birth,
        email: req.body.email,
        major: req.body.major,
        gpa: req.body.gpa
    }).catch(errorHandler);
    res.redirect('/students');
});

router.post('/update', async (req, res) => {
    await sqlConnect.Students.query().update({
        name: req.body.name,
        birth: req.body.birth,
        email: req.body.email,
        major: req.body.major,
        gpa: req.body.gpa
    }).where('id', req.body.id)
        .catch(errorHandler);
    res.redirect('/students');
});

// TODO: delete student

module.exports = router;