const express = require('express');
const sqlConnect = require('./sqlConnect');
const router = express.Router();
const randomstring = require('randomstring');

function errorHandler(error) {
    console.error(error);
}

let students;
router.get('/', async (req, res, next) => {
    let studentPromise = sqlConnect.Students.query();

    if (req.query.id) studentPromise = studentPromise
        .where('id', req.query.id)
        .orWhere('name', req.query.id);
    if (req.query.orderby) studentPromise = studentPromise.orderBy(req.query.orderby);

    students = await studentPromise.catch(errorHandler);
    await res.json(students);
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    await sqlConnect.Students.query().update({
        name: req.body.name,
        birth: req.body.birth,
        email: req.body.email,
        major: req.body.major,
        gpa: req.body.gpa
    }).where('id', req.params.id)
        .catch(errorHandler);
    res.redirect('/students');
});

router.delete('/:id', async (req, res) => {
    await sqlConnect.Students.query().delete().where('id', req.params.id);
    res.redirect('/students');
});

module.exports = router;