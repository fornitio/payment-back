const User = require('../bd').UserModel;
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.get('secret');
console.log('secret lu: ',secret);

function loginUser(req, res, next) {
        return User.findOne({email: req.body.email}, function (err, user) {
            if(!user) {
                err = err || new Error();
                err.status = 404;
                return next(err);
            }
            if(user.password !== req.body.password) {
                err = err || new Error();
                err.status = 403;
                return next(err);
            }
            if (!err) {
                const data = {
                    userId: user._id
                };
                return res.send({token : jwt.sign(data, secret) });
            } else {
                return next(err);
            }
        });
    }
module.exports = loginUser;