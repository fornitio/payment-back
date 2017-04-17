const User = require('../bd').UserModel;
const errors = require('./errors');
const serialize = require('./serialize');

function getUser(req, res, next) {
        return User.findById(req.params.id, function (err, user) {
            if(!user) { return next(new errors.NotFoundError()) }
            if (err) { return next(err); }
            return res.send({ status: 'OK', user: serialize(user)});
        });
    }
module.exports = getUser;