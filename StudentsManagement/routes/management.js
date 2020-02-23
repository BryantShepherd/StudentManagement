const express = require('express');
const sqlConnect = require('./sqlConnect');
const router = express.Router();
const randomstring = require('randomstring');

function errorHandler(error) {
    console.error(error);
}

let students;
router.get('/get', async (req, res, next) => {
    let studentPromise = sqlConnect.Students.query();

    if (req.query.id) studentPromise = studentPromise
        .where('id', req.query.id)
        .orWhere('name', req.query.id);
    if (req.query.orderby) studentPromise = studentPromise.orderBy(req.query.orderby);
    if (req.query.page && req.query.pagesize) studentPromise = studentPromise.page(req.query.page - 1, req.query.pagesize);

    students = await studentPromise.catch(errorHandler);
    if (req.query.pagesize) students.numberOfPages = Math.ceil(students.total / req.query.pagesize);
    await res.json(students);
});

router.post('/add', async (req, res) => {
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
    res.end('Student added.');
});

router.put('/update/:id', async (req, res) => {
    await sqlConnect.Students.query().update({
        name: req.body.name,
        birth: req.body.birth,
        email: req.body.email,
        major: req.body.major,
        gpa: req.body.gpa
    }).where('id', req.params.id)
        .catch(errorHandler);
    res.end('Student Updated.');
});

router.delete('/delete/:id', async (req, res) => {
    await sqlConnect.Students.query().deleteById(req.params.id);
    res.end('Student Deleted');
});

module.exports = router;