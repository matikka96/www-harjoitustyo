const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Setting up expressjs
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect to mongodb with mongoose
const mongoose = require('mongoose');
mongoose.connect(keys.mongodb.uri, () => {
	console.log('Connected to DB via mongoose');
});

// Initialize passport and cookies
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Renders main html file of the app
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');	// Todo app
});

// Redirection to main or login pages
app.get('/login', (req, res) => {
	if (req.user) {
		// If signed in
		res.sendFile(__dirname + '/index.html');
	} else {
		// If not signed in
		res.sendFile(__dirname + '/login.html');
	}

});

// Listening PORT 3000
app.listen(3000, () => {
	console.log('listening on 3000')
});