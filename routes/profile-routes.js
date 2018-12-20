const router = require('express').Router();
const User = require('../models/user-model');
const Favorite = require('../models/favorite-model');


const authCheck = (req, res, next) => {
	if (!req.user) {
		// res.redirect('/login')
		res.send('login')
	} else {
		next();
	}
};

router.get('/', authCheck, (req, res) => {
	res.send('User is: '+req.user);
});

router.post('/favorite', authCheck, (req, res) => {
	let coin = req.body.coinName;
	console.log('/favorite: '+coin);

	Favorite.findOne({userID : req.user.id, coinName : coin}).then((currentFavorite) => {
		console.log(currentFavorite);
		if (currentFavorite) {
			console.log('FAVORITE ALREADY EXISTS: \n' + currentFavorite);
			res.send('exists');
		} else {
			new Favorite({
				userID: req.user.id,
				coinName: req.body.coinName
			}).save().then((newFavorite) => {
				console.log('New favorite: '+newFavorite);
			});
			res.send('ok');
		}
	});
});

router.get('/load', authCheck, (req, res) => {
	Favorite.find({userID : req.user.id}).then((searchResult) => {
		res.send(searchResult);
	})
})

router.post('/delete', authCheck, (req, res) => {
	Favorite.deleteOne({
		userID : req.user.id,
		coinName : req.body.coinName
	}).then((result) => {
		res.send(result);
	})
})

module.exports = router;