const User = require('../bd').UserModel;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const errors = require('./errors');
const secret = config.get('secret');
const serialize = require('./serialize');

function loginUser(req, res, next) {
        return User.findOne({email: req.body.email}, function (err, user) {
            if(!user) { return next(new errors.NotFoundError()); }
            if (err) { return next(err); }
            bcrypt.compare(req.body.password, user.password, function(err, equal){
                if (err) { return next(err); }
                if (!equal) { return next(new errors.AuthorizationError()); }
                return res.send({ status: 'OK', token : jwt.sign(serialize(user), secret), exp: 1 });
            })            
        });
    }
module.exports = loginUser;