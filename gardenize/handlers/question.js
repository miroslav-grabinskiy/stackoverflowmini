var userHandler = require('./user');
var Question = require('../models/question').Question;
var Answer = require('../models/answer').Answer;

var ask = function(req, res, next) {
	userHandler.auth(req, res, next, function(user) {
		var title = req.body.title;
		var body = req.body.body;
		var userName = user;

		var question = new Question({
			title: title,
			body: body,
			userName: userName
		});

		question.save(function(err, question, affected) {
			if (err) {
				return next(err);
			}

			res.redirect('/questions');
		});
	});
};

var answer = function(req, res, next) {
	userHandler.auth(req, res, next, function(user) {
		var questionId = req.params.id;
		var body = req.body.body;
		var userName = user;

		var answer = new Answer({
			questionId: questionId,
			body: body,
			userName: userName
		});

		answer.save(function(err, answer, affected) {
			if (err) {
				return next(err);
			}

			res.redirect('/question/' + questionId);
		});
	});
};

module.exports.ask = ask;
module.exports.answer = answer;