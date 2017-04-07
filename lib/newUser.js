const User = require('../bd').UserModel;
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.get('secret');

function newUser(req, res, next) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    user.save(function (err) {
        if (!err) {
        	const data = {
        	  userId: user._id
        	};
            return res.send({ status: 'OK', token : jwt.sign(data, secret) });
        } else {
        	next(err);
        }
    });
}
module.exports = newUser;