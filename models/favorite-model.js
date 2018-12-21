
// Creating Favorites schema for databae

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
	userID: String,
	coinName: String,
});

const Favorite = mongoose.model('favorite', favoriteSchema);

module.exports = Favorite;