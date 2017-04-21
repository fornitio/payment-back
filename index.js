const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path'); 
const cors = require('cors'); 
const favicon = require('serve-favicon');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const fs = require('fs');

//keys for https
const hskey = fs.readFileSync('m-key.pem');
const hscert = fs.readFileSync('m-cert.pem')
const options = {
    key: hskey,
    cert: hscert
};

const app = express();

//logs & config
const log = require('./log')(module);
const config = require('./config');

//middleware
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 
app.use(morgan('tiny')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method'));
app.use(express.static(path.join(__dirname, "public"))); 

//routing
app.use('/api', require('./routes/user'));

//error handling
app.use(function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.statusCode = 400;
        res.send({ error: 'Validation error' });
    } else if (err.status === 403) {
        res.statusCode = 403;
        res.send({ error: 'Authorization error' });
    } else if (err.status === 404) {
        res.statusCode = 404;
        res.send({ error: 'Not found' });
    } else {
        res.statusCode = 500;
        res.send({ error: 'Server error', message: err.message });
    }
    log.error('Internal error(%d): %s',res.statusCode, err.message);
});

//createServer options contains https keys
app.listen = (...args) => {
    var server = https.createServer(options, app).listen(args[0]);
    return server.listen.apply(server, args);
};

app.listen(config.get('port'), (...args) => {
    console.log('Express server listening on port ' + config.get('port'));
});

module.exports = app;