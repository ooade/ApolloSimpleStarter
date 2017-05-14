const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = Schema({
	todo: String
});

module.exports = mongoose.model('Todo', TodoSchema);
