const User = require('../db').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const errors = require('./errors');
const secret = config.get('secret');
const serialize = require('./serialize');

function loginUser(req, res, next) {
        return User.findOne({where : {email : req.body.email}})
        .then(function (user) {
                    if(!user) { return next(new errors.NotFoundError()); }
                    bcrypt.compare(req.body.password, user.password, function(err, equal){
                        if (err) { return next(err); }
                        if (!equal) { return next(new errors.AuthorizationError()); }
                        return res.send({ status: 'OK', token : jwt.sign(serialize(user), secret)});
                    })            
                })
        .error(e=>{ next(e); });
    }
module.exports = loginUser;