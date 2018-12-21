
// On this file configure:
// * Google API
// * MongoDB
// * Cookiekey for session
// * CryptoCompare API

module.exports = {
	// Create your own Google API keys on Google Developer Console
	google: {
		clientID: '217255728933-6k34lfc946nf45u46ii0e6j5rm6cuq46.apps.googleusercontent.com',
		clientSecret: 'J9zxo5SE4wMKxS8ilglyBodv'
	},
	// Link to database. Create own on mlab.com
	mongodb: {
		uri: 'mongodb://main:vilikissa123@ds131711.mlab.com:31711/crypto'
	},
	// Key for encrypting cookies (any string will do)
	session: {
		cookieKey: 'mazaboyissoawesomeyeag'
	},
	// API key for CryptoCompare. Create own on their website.
	cryptocompare: {
		api_key: '1ce5d6f4c61dbded3d6a38dce91ebf37df91fe448fd7cd97755cdf33f5791ed1'
	}
};