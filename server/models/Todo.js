const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = Schema({
	text: String
});

module.exports = mongoose.model('Todo', TodoSchema);
