const jwt = require('express-jwt');
const config = require('../config');
const secret = config.get('secret');
const express = require('express');
const router = express.Router();

router
    .post('/login', require('../lib/loginUser'))
    .post('/register', require('../lib/newUser'))
    .get('/users', require('../lib/searchUsers'))
    .use(jwt({secret : secret}))
    .get('/users/:id', require('../lib/getUser'))
    .delete('/users/:id', require('../lib/deleteUser'))

module.exports = router;