'use strict';

var express     = require('express');
var path        = require('path');
var logger      = require('morgan');
var detectLang  = require('lang-detector');
var router      = express.Router();
var Server      = require('./server')

var app = express();
app.use(logger('dev'));

// collect raw body data
app.use(function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
});

// routes
router.get('/*', function(req, res, next) {
    res.send('Use POST.');
});
router.post('/*', function(req, res, next) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        result : {
            detected : detectLang(req.rawBody || '', {statistics:true})
        }
    }));
});
app.use('/', router);
app.use(function(req, res, next) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        error  : '404 Not Found'
    }));
});
app.use(function(err, req, res, next) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        error  : err.status || 500 + ' ' + err.message
    }));
});

// server
var server = new Server(app, {
        "port"   : 3000
    }
);
server.start();
