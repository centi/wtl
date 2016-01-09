'use strict';

var path = require('path');
var url = require('url');
var detectLang = require('lang-detector');

module.exports = {
	get : function(req, res, next) {
		res.send('Use POST.');
	},

	post : function(req, res, next) {
		var result = {
			result : {
				detected : detectLang(req.body.code, {statistics:true})
			}
		};

		res.set('Content-Type', 'application/json');
		res.send(JSON.stringify(result));
	}
};
