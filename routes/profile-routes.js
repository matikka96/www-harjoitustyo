const router = require('express').Router();
const User = require('../models/user-model');
const Favorite = require('../models/favorite-model');
const keys = require('../config/keys');

// Importing Axios
const axios = require('axios');

"use strict";

// Helper function for verifying if user is logged in
const authCheck = (req, res, next) => {
	var user = req.user;
	if (!user) {
		console.log("User not logged in");
		res.send('login');
	} else {
		next();
	}
};

// Responds with the userID
router.get('/', authCheck, (req, res) => {
	console.log(req.user);
	res.send(req.user);
});

// Responds with the list of coind from CryptoCompare
router.get('/loadCoins', (req, res) => {
	let url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key={"+keys.cryptocompare.api_key+"}";
	axios.get(url).then((response) => {
		res.send(response.data);
	}).catch((error) => {
		console.log(error);
		res.send(error);
	});
});

// Adding coin to favorite
router.post('/addFavorite', authCheck, (req, res) => {
	let coin = req.body.coinName;
	Favorite.findOne({userID : req.user.id, coinName : coin}).then((currentFavorite) => {
		if (currentFavorite) {
			console.log('FAVORITE ALREADY EXISTS');
			res.send('exists');
		} else {
			new Favorite({
				userID: req.user.id,
				coinName: req.body.coinName
			}).save().then((newFavorite) => {
				console.log('New favorite: '+newFavorite.coinName);
			});
			res.send('ok');
		}
	});
});

// Loading users favorite coins
router.get('/loadFavorite', authCheck, (req, res) => {
	Favorite.find({userID : req.user.id}).then((searchResult) => {
		res.send(searchResult);
	})
})

// Delete coin from favorites
router.post('/deleteFavorite', authCheck, (req, res) => {
	Favorite.deleteOne({
		userID : req.user.id,
		coinName : req.body.coinName
	}).then((result) => {
		res.send(result);
	})
})

module.exports = router;