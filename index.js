var express = require('express');
var path = require('path'); 
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app = express();
//var router = express.Router();
var log = require('./log')(module);
var config = require('./config');

var User = require('./bd').UserModel;

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


app.listen(config.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});
module.exports = app;