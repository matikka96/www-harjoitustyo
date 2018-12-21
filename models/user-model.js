
// Creating User schema for databae

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	googleId: String,
	tasks: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;