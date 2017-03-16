var express = require('express');
var path = require('path'); 
var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var log = require('./log')(module);
var config = require('./config');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // отдаем стандартную фавиконку, можем здесь же свою задать
app.use(morgan('tiny')); // выводим все запросы со статусами в консоль
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method'));
app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)


var User = require('./bd').UserModel;


router.get('/api', function (req, res) {
    res.send('API is running');
});

router.get('/api/users', function(req, res) {
    return User.find(function (err, articles) {
        if (!err) {
            return res.send(articles);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.post('/api/users', function(req, res) {
	console.log(req.body, req.params);
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    user.save(function (err) {
        if (!err) {
            log.info("user created");
            return res.send({ status: 'OK', user:user });
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});


router.get('/api/users/:id', function(req, res) {
    return User.findById(req.params.id, function (err, user) {
        if(!user) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            return res.send({ status: 'OK', user:user });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.delete('/api/users/:id', function (req, res){
    return User.findById(req.params.id, function (err, user) {
        if(!user) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return user.remove(function (err) {
            if (!err) {
                log.info("user removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

app.use('/', router);

app.listen(config.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});