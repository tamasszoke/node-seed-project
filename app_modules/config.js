
/*
	Configuration of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

/* Change between 'local' and 'live' version */
var live = false;

/* SSL */
var ssl = {
	liveSsl: {
		key: 'ssl_certification/YourSSLKey',
		cert: 'ssl_certification/YourSSLCert'
	},
	localSsl: {
		key: 'ssl_certification/dev/YourDevSSLKey',
		cert: 'ssl_certification/dev/YourDevSSLCert'
	}
};

/* MongoDB */
var mongodb = {
	liveUrl: '',
	localUrl: ''
};

/* Facebook, Twitter, Google API keys for Passport */
var apiKeys = {
	facebook: {
		clientID: '',
		clientSecret: '',
		callbackUrl: 'http://your.url/auth/facebook/callback',
		localCallbackUrl: 'http://localhost:7777/auth/facebook/callback'
	},
	twitter: {
		consumerKey: '',
		consumerSecret: '',
		callbackUrl: 'http://your.url/auth/twitter/callback',
		localCallbackUrl: 'http://localhost:7777/auth/twitter/callback'
	},
	google: {
		clientID: '',
		clientSecret: '',
		callbackUrl: 'http://your.url/auth/google/callback',
		localCallbackUrl: 'http://localhost:7777/auth/google/callback'
	}
}

module.exports = {ssl: ssl, apiKeys: apiKeys, mongodb: mongodb};