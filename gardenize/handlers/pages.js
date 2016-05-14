var async = require('async');
var userHandler = require('./user');
var Question = require('../models/question').Question;
var Answer = require('../models/answer').Answer;

var webIndexPage = function(req, res, next) {
	res.redirect(301, '/questions')
};

var webQuestionsPage = function(req, res, next) {
	userHandler.auth(req, res, next, function(user) {
		Question.find({}).sort({created: 'desc'}).exec(function(err, questions) {
			questionsLength = questions.length;

			//for old questions without views and answers
			for (var i = 0; i < questionsLength; i++) {
				if (!questions[i].views) {
					questions[i].views = 0;
				}

				if (!questions[i].answers) {
					questions[i].answers = 0;
				}
			}

			res.render('partials/questions.jade', {initial : false, user: user, questions: questions});
		});
	});
};

var webRegistrationPage = function(req, res, next) {
	userHandler.auth(req, res, next, function(user) {
		res.render('partials/registration.jade', {initial : false, user: user});
	});
};

var webLoginPage = function(req, res, next) {
	res.render('partials/login.jade', {initial : false});
};

var webAskPage = function(req, res, next) {
	userHandler.auth(req, res, next, function(user) {
		res.render('partials/ask.jade', {initial : false, user: user});
	}, function() {
		res.redirect('/login');
	});
};

var webQuestionPage = function(req, res, next) {
	var questionId = req.params.id;

	userHandler.auth(req, res, next, function(user) {

		async.parallel([ function(callback) {
			Question.findOneAndUpdate({_id: questionId}, { $inc: { views: 1 } }, function(err, question) {
				if (err) {
					return next(err);
				}

				//for old questions without views and answers
				if (!question.views) {
					question.views = 0;
				}

				//for old questions without views and answers
				if (!question.answers) {
					question.answers = 0;
				}

				callback(null, question);
			});
	    }, function(callback) {
			Answer.find({questionId: questionId}, function(err, answers) {
				if (err) {
					return next(err);
				}

				callback(null, answers);
			});
	    } ], function done(err, results) {
			var question = results[0];
			var answers = results[1];
			res.render('partials/question.jade', {initial : false, user: user, question: question, answers: answers});
	    });

	});
};

var webAnswerredPage = function(req, res, next) {
	var userName = req.params.userName;

	userHandler.auth(req, res, next, function(user) {
		Question.find({userName: userName, answers: { $ne: 0 } }).sort({created: 'desc'}).exec(function(err, questions) {
			questionsLength = questions.length;

			//for old questions without views and answers
			for (var i = 0; i < questionsLength; i++) {
				if (!questions[i].views) {
					questions[i].views = 0;
				}

				if (!questions[i].answers) {
					questions[i].answers = 0;
				}
			}

			res.render('partials/questions.jade', {initial : false, user: user, questions: questions});
		});
	});
}

var webUnanswerredPage = function(req, res, next) {
	var userName = req.params.userName;

	userHandler.auth(req, res, next, function(user) {
		Question.find({userName: userName, answers: 0}).sort({created: 'desc'}).exec(function(err, questions) {
			questionsLength = questions.length;

			//for old questions without views and answers
			for (var i = 0; i < questionsLength; i++) {
				if (!questions[i].views) {
					questions[i].views = 0;
				}

				if (!questions[i].answers) {
					questions[i].answers = 0;
				}
			}

			res.render('partials/questions.jade', {initial : false, user: user, questions: questions});
		});
	});
}

module.exports.webIndexPage = webIndexPage;
module.exports.webQuestionsPage = webQuestionsPage;
module.exports.webQuestionPage = webQuestionPage;
module.exports.webRegistrationPage = webRegistrationPage;
module.exports.webLoginPage = webLoginPage;
module.exports.webAskPage = webAskPage;
module.exports.webUnanswerredPage = webUnanswerredPage;
module.exports.webAnswerredPage = webAnswerredPage;
