'use strict';

var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var nunjucks    = require('nunjucks');
var router      = express.Router();
var Server      = require('./app/server')
var routeIndex  = require('./app/routes/index');
var routeErrors = require('./app/routes/errors');

router.get('/*', routeIndex.get);
router.post('/*', routeIndex.post);

var app = express();
//app.use(express.static(path.join(__dirname, '../frontend')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(routeErrors.get404);
app.use(routeErrors.get500);

nunjucks.configure(path.join(__dirname, './templates'), {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');
app.locals.devel = app.get('env') === 'development';

var server = new Server(app, {
        "port"   : 3000
    }
);

server.start();
