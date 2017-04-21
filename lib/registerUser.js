const User = require('../db').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const secret = config.get('secret');
const errors = require('./errors');
const serialize = require('./serialize');
const validatePassword = require('./validatePassword');

function newUser(req, res, next) {
    if ( !req.body.password || !validatePassword(req.body.password) ) { 
        return next(new errors.ValidationError());
    }
    bcrypt.hash(req.body.password, null, null, function(err, hash){
        if (err) return next(err);
        const user = {
            email: req.body.email || '',
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };
        User.create(user)
        .then(function (usr) {
                    if (usr) {
                        return res.send({ status: 'OK', token : jwt.sign(serialize(usr), secret) });
                    } else {
                        next(new errors.AuthorizationError());
                    }
                })
        .catch(e=>{
            next(e);
        })

    })
}
module.exports = newUser;