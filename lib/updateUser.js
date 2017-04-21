const User = require('../db').User;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const secret = config.get('secret');
const errors = require('./errors');
const serialize = require('./serialize');
const validatePassword = require('./validatePassword');

function updateUser(req, res, next){
    //registered user can't update another user
    if (req.user.userid != req.params.id) { return next(new errors.AuthorizationError) }
    if ( req.body.password && !validatePassword(req.body.password) ) { 
        return next(new errors.ValidationError());
    }
    if ( req.body.password && validatePassword(req.body.password) ) { 
        req.body.password = bcrypt.hashSync(req.body.password);
    }
    return User.findById(req.params.id)
        .then(function (user) {
            if(!user) { return next(new errors.NotFoundError()) }
            const serializedForUpdate = {
                email: req.body.email || user.email,
                password: req.body.password || user.password,
                firstname: req.body.firstname || user.firstname,
                lastname: req.body.lastname || user.lastname
            };
            user = Object.assign(user, serializedForUpdate);
            return user.save()
            .then(function (usr) {
                if (usr) {
                    return res.send({ status: 'OK', token : jwt.sign(serialize(usr), secret) });
                } else {
                    next(new errors.AuthorizationError());
                }
            })
        })
        .catch(e=>{next(e)});
}
module.exports = updateUser;