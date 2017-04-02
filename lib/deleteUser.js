const User = require('../bd').UserModel;

function deleteUser(req, res, next){
    return User.findById(req.params.id, function (err, user) {
        if(!user) {
            err = err || new Error();
            err.status = 404;
            return next(err);
        }
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