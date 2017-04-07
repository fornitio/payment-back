const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('./config');
const log = require('./log')(module);

mongoose.Promise = global.Promise;

mongoose.connect(config.get('mongoose:uri'));
const db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB! ", config.get('mongoose:uri'));
});

const Schema = mongoose.Schema;

const {UserSchema} = require('./Schemas/User');
console.log(UserSchema);
const User = new Schema(UserSchema);

// validation
User.path('firstname').validate(function (v) {
    return v.length > 1 && v.length < 70;
});

User.plugin(uniqueValidator);

const UserModel = mongoose.model('User', User);

module.exports.UserModel = UserModel;