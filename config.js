const nconf = require('nconf');

const fileObj = (process.env.NODE_ENV === 'test') 
	? { file: './config-test.json' } 
	: { file: './config.json' }; 
nconf.argv()
    .env()
    .file(fileObj);

module.exports = nconf;