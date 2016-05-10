var questionHandler = require('../handlers/question');

var questionRoutes = function(app) {

	app.post('/ask', function(req, res, next) {
		questionHandler.ask(req, res, next);
	});

	app.post('/answer/:id', function(req, res, next) {
		questionHandler.answer(req, res, next);
	})

};

module.exports =  questionRoutes;