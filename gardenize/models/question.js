var mongoose = require('../lib/mongoose');
	Schema = mongoose.Schema;

var schema = new Schema({
	title: {
		type: String,
	},
	body: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports.Question = mongoose.model('Question', schema);