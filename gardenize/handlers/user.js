var User = require('../models/user').User;

var registration = function(req, res, next) {
	var userName = req.body.userName;
	var password = req.body.password;

	User.findOne({userName: userName}, function(err, user) {
		if (err) {
			return next(err);
		}

		if (user) {
			res.status(400).send('already exists');
		}

			console.log(4);
		var user = new User({
			userName: userName,
			password: password,
		});
		
		user.save(function(err, user, affected) {
			if (err) {
				return next(err);
			}
			
			console.log(user.userName);
			req.session.user = user.userName;
			res.redirect('/questions');
		});
	});
};

var login = function(req, res, next) {
	var userName = req.body.userName;
	var password = req.body.password;
	User.autorization(userName, password, function(err, user) {
		if (err) {
			res.status(err.statusCode).send(err.error)
		} else {
			req.session.user = user.userName;
			res.redirect('/questions/');
		}
	});
};

var logout = function(req, res, next) {
    if ('user' in req.session) {
    	req.session.destroy();
    }

    res.redirect('/questions');
};

var auth = function(req, res, next, callback, callback2) {
    if ('user' in req.session) {
		User.findOne({userName: req.session.user}, function(err, user) {
			if (err) {
				return next(err);
			}
			
			if (user) {
				req.session.user = user.userName;
				callback(user.userName);
			} else {
				
				if (callback2) {
					callback2();
				} else {
					callback(null);
				}
			}
		});

	} else {
		if (callback2) {
			callback2();
		} else {
			callback(null);
		}
	}
};

module.exports.registration = registration;
module.exports.login = login;
module.exports.logout = logout;
module.exports.auth = auth;