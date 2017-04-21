const User = require('../db').User;
const serialize = require('./serialize');
const errors = require('./errors');

function searchUsers(req, res, next) {
    return User.findAll()
	    .then(function (users) {
	            if (users&&users.length) {
	                return res.send({status: "OK", users: users.map(el=>serialize(el))});
	            } else {
	                return next(new errors.NotFoundError());
	            }
	        })
	    .catch(e=>{next(e)});
}
module.exports = searchUsers;
