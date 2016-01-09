'use strict';

var http = require('http');

var Server = function(app, conf) {
	this.app = app;
	this.conf = conf;

	this.server = http.createServer(this.app);
	this._bind();
};

Server.prototype = {
	start : function() {
		this.server.listen(this.conf.port);
	},

	_bind : function() {
		this.server.on('listening', this._onListening.bind(this));
		this.server.on('error', this._onError.bind(this));
	},

	_onListening : function() {
		console.log('Server listening on ' + this.conf.port + '.');
	},

	_onError : function(error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		switch (error.code) {
			case 'EACCESS':
				console.error('Port ' + this.conf.port + ' requires elevated privileges.');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error('Port ' + this.conf.port + ' is already in use.');
				process.exit(1);
				break;
			default:
				throw error;
		}
	}
};

module.exports = Server;
