var config = require('../config');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('../lib/mongoose');

var includeRoutes = [];
includeRoutes.push( require('./user') );
includeRoutes.push( require('./question') );
includeRoutes.push( require('./pages') );

var routes = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	var MongoStore = require('connect-mongo')(session);
	app.use(session({
		secret: config.get('session:secret'),
		key: config.get('session:key'),
		cookie: config.get('session:cookie'),
		store: new MongoStore({mongooseConnection: mongoose.connection}),
	    resave: true,
	    saveUninitialized: true
	}));

	includeRoutesLength = includeRoutes.length;
	for (var i = 0; i < includeRoutesLength; i++) {
		includeRoutes[i](app);
	}

	app.use(function(err, req, res, next) {
		var result = {
			success: null,
		};
		
		if (Array.isArray(err)) {
			var status = err[0];
			result.error = err[1];
			result = JSON.stringify(result);
			res.status(err[0]).send(result);
		} else {
			// console.log(app.get('env'));
			//result.error = 'Internal Server Error';
			result = err;
			result = JSON.stringify(result);
			res.status(500).send(result);
		}
	});
};

module.exports = routes;