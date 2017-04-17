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

const hskey = fs.readFileSync('m-key.pem');
const hscert = fs.readFileSync('m-cert.pem')

const options = {
    key: hskey,
    cert: hscert
};
const app = express();

//const router = express.Router();
const log = require('./log')(module);
const config = require('./config');

const User = require('./bd').UserModel;

app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // отдаем стандартную фавиконку, можем здесь же свою задать
app.use(morgan('tiny')); // выводим все запросы со статусами в консоль
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method'));
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

//routing
app.use('/api', require('./routes/user'));

//error handling
app.use(function(err, req, res, next) {
//  if (err.name === 'UnauthorizedError') {err.status = 401}

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
        res.send({ error: 'Server error' });
    }
    log.error('Internal error(%d): %s',res.statusCode, err.message);
});


//http.createServer(app).listen(80);
//https.createServer(options, app).listen(config.get('port'));

app.listen = (...args) => {
  var server = https.createServer(options, app).listen(args[0]);
  return server.listen.apply(server, args);
};

app.listen(config.get('port'), (...args) => {
     console.log('Express server listening on port ' + config.get('port'));
 });
module.exports = app;