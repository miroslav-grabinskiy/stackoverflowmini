var pagesHandler = require('../handlers/pages');

var pagesRoutes = function(app) {

	app.get('/', function(req, res, next) {
		pagesHandler.webIndexPage(req, res, next);
	});

	app.get('/questions', function(req, res, next) {
		pagesHandler.webQuestionsPage(req, res, next);
	});

	app.get('/registration', function(req, res, next) {
		pagesHandler.webRegistrationPage(req, res, next);
	});

	app.get('/login', function(req, res, next) {
		pagesHandler.webLoginPage(req, res, next);
	});

	app.get('/ask', function(req, res, next) {
		pagesHandler.webAskPage(req, res, next);
	});

	app.get('/question/:id', function(req, res, next) {
		pagesHandler.webQuestionPage(req, res, next);
	});

};

module.exports = pagesRoutes;