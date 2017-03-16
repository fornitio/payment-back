var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var config      = require('./config');
var log = require('./log')(module);

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

var {UserSchema} = require('./Schemas/User');
console.log(UserSchema);
var User = new Schema(UserSchema);

// validation
User.path('firstname').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

User.plugin(uniqueValidator);

var UserModel = mongoose.model('User', User);

module.exports.UserModel = UserModel;