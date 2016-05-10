var crypto = require('crypto');
var async = require('async');

var mongoose = require('../lib/mongoose');
	Schema = mongoose.Schema;
	
var schema = new Schema({
	userName: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

schema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
	.set(function (password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {return this._plainPassword; });

schema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.autorization = function(userName, password, callback) {
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({userName: userName.toString()}, callback);
        },
        function(user, callback) {
            if (user) {
                if( user.checkPassword(password.toString()) ) {
                    callback(null, user);
                } else {
                    var error = {
                        statusCode: 403,
                        error: 'bad password'
                    };
                    callback(error, user);
                }

            } else {
                var error = {
                    statusCode: 403,
                    error: 'user not found'
                };
                callback(error, user);
            }
        }
    ], callback);
};

module.exports.User = mongoose.model('User', schema);