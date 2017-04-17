const User = require('../bd').UserModel;
const serialize = require('./serialize');

function searchUsers(req, res, next) {
    return User.find(function (err, articles) {
        if (!err) {
            return res.send({status: "OK", users: articles.map(el=>serialize(el))});
        } else {
            return next(err); 
        }
    });
}
module.exports = searchUsers;
