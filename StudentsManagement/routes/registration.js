const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlConnect = require('./sqlConnect');

let newUsername, password;
// TODO: check if user already exists

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    newUsername = req.body.username;
    password = bcrypt.hashSync(req.body.password, 10);
    try {
        await sqlConnect.LoginInfo.query().insert({
            username: newUsername,
            password: password
        });
    } catch (error) {
        console.error(error);
    }
    res.redirect('/login');
});

module.exports = router;