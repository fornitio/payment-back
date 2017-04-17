const User = require('../bd').UserModel;
const errors = require('./errors');
const jwt = require('jsonwebtoken');

function deleteUser(req, res, next){
    return User.findById(req.params.id, function (err, user) {
        if(!user) { return next(new errors.NotFoundError()) }
        return user.remove(function (err) {
            if (!err) {
                return res.send({ status: 'OK' });
            } else {
                return next(err)
            }
        });
    });
}
module.exports = deleteUser;