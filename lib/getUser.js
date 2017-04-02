const User = require('../bd').UserModel;

function getUser(req, res, next) {
        console.log('user req', req.user);
        return User.findById(req.params.id, function (err, user) {
            if(!user) {
                err = err || new Error();
                err.status = 404;
                return next(err);
            }
            if (!err) {
                return res.send({ status: 'OK', user:user });
            } else {
                return next(err);
            }
        });
    }
module.exports = getUser;