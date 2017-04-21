const Sequelize = require('sequelize');
const config = require('./config');
const log = require('./log')(module);
const sequelize = new Sequelize(config.get('mySql:uri'));

var User = sequelize.define('user', {
		email: {
			type: Sequelize.STRING,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true
			}
		},
		password: {
			type: Sequelize.STRING
		},
		firstname: {
			type: Sequelize.STRING
		},
		lastname: {
			type: Sequelize.STRING
		},
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		}
	}, 
		{
			freezeTableName: true // Model tableName will be the same as the model name
		}
);

module.exports.User = User;

User.sync().then(function (table) {
	log.info(`Table ${table} syncronized.`);
});
