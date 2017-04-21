const jwt = require('express-jwt');
const config = require('../config');
const secret = config.get('secret');
const express = require('express');
const router = express.Router();

router
    .post('/login', require('../lib/loginUser'))
    .post('/register', require('../lib/registerUser'))
    .get('/users', require('../lib/searchUsers'))
    .use(jwt({secret : secret}))
    .get('/users/:id', require('../lib/getUser'))
    .post('/users/:id', require('../lib/updateUser'))
    .delete('/users/:id', require('../lib/deleteUser'))

module.exports = router;