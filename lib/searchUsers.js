const User = require('../bd').UserModel;

function searchUsers(req, res, next) {
    return User.find(function (err, articles) {
        if (!err) {
            return res.send(articles);
        } else {
            return next(err); 
        }
    });
}
module.exports = searchUsers;
