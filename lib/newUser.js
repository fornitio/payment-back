const User = require('../bd').UserModel;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const secret = config.get('secret');
const errors = require('./errors');
const serialize = require('./serialize');

function newUser(req, res, next) {
    if (!req.body.password) return next(new errors.ValidationError());
    bcrypt.hash(req.body.password, null, null, function(err, hash){
        if (err) return next(err);
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        user.save(function (err) {
            if (!err) {
                return res.send({ status: 'OK', token : jwt.sign(serialize(user), secret) });
            } else {
                next(err);
            }
        });

    })
}
module.exports = newUser;