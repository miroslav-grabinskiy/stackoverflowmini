var userHandler = require('../handlers/user');

var userRoutes = function(app) {

	app.post('/registration', function(req, res, next) {
		userHandler.registration(req, res, next);
	});

	app.post('/login', function(req, res, next) {
		userHandler.login(req, res, next);
	});

	app.post('/logout', function(req, res, next) {
		userHandler.logout(req, res, next);
	});

};

module.exports =  userRoutes;