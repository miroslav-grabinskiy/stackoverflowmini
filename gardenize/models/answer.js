var mongoose = require('../lib/mongoose');
	Schema = mongoose.Schema;

var schema = new Schema({
	questionId: {
		type: Schema.Types.ObjectId,
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

module.exports.Answer = mongoose.model('Answer', schema);