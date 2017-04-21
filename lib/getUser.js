const User = require('../db').User;
const errors = require('./errors');
const serialize = require('./serialize');

function getUser(req, res, next) {
	//registered user can't update another user
	if (req.user.userid != req.params.id) { return next(new errors.AuthorizationError) }
    return User.findById(req.params.id)
    .then(function (user) {
        if(!user) { return next(new errors.NotFoundError()) }
        return res.send({ status: 'OK', user: serialize(user)});
    })
    .catch(e=>{ next(e) })
}
module.exports = getUser;