const User = require('../db').User;
const errors = require('./errors');
const jwt = require('jsonwebtoken');

function deleteUser(req, res, next){
    //registered user can't delete another user
    if (req.user.userid != req.params.id) { return next(new errors.AuthorizationError) }
    return User.findById(req.params.id)
        .then(function (user) {
            if(!user) { return next(new errors.NotFoundError()) }
            return user.destroy()
            .then(function () {
                return res.send({ status: 'OK' });
            })
        })
        .catch(e=>{next(e)});
}
module.exports = deleteUser;