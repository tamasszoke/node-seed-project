
'use strict'

// modules
const fs = require('fs');
const show = require('eyecatcher');

// change between 'local' and 'live' version
const live = false;

// host configuration
let host = {
	live: {
		ip: null,
		url: 'YourLiveUrl',
		port: process.env.PORT,
		sslPort: 443,
		sslOptions: {
			//key: fs.readFileSync('ssl_certification/YourSSLKey'),
			//cert: fs.readFileSync('ssl_certification/YourSSLCert')
		},
		mongoUrl: '',
		passport: {
			facebook: {
				clientID: '',
				clientSecret: '',
				callbackUrl: 'http://your.url/auth/facebook/callback'
			},
			twitter: {
				consumerKey: '',
				consumerSecret: '',
				callbackUrl: 'http://your.url/auth/twitter/callback'
			},
			google: {
				clientID: '',
				clientSecret: '',
				callbackUrl: 'http://your.url/auth/google/callback'
			}
		}
	},
	local: {
		ip: 'localhost',
		port: 3000,
		sslPort: 3000,
		sslOptions: {
			//key: fs.readFileSync('ssl_certification/dev/YourDevSSLKey'),
			//cert: fs.readFileSync('ssl_certification/dev/YourDevSSLCert')
		},
		mongoUrl: 'mongodb://localhost:27017/test',
		passport: {
			facebook: {
				clientID: '',
				clientSecret: '',
				callbackUrl: 'http://localhost:7777/auth/facebook/callback'
			},
			twitter: {
				consumerKey: '',
				consumerSecret: '',
				callbackUrl: 'http://localhost:7777/auth/twitter/callback'
			},
			google: {
				clientID: '',
				clientSecret: '',
				callbackUrl: 'http://localhost:7777/auth/google/callback'
			}
		}
	}
};

if (live) host = host['live'];
else host = host['local'];

const loadControllersWithModules = (modules) => {

	let controllers = [];

	try {

		fs.readdirSync(__dirname).forEach(function(file) {
			if (file.match(/.+\.js/g) !== null && file != 'config.js') {
			
				const name = file.replace('.js', '');
				controllers[name] = require(__dirname + '/' + name)(modules);
				//show.warn('Controller "' + file + '" loaded');
			};
		});

	} catch(error) {

		return false;
	};

	return controllers;
};

const loadModelsWithModules = (modules) => {

	let models = [];
	
	try {
		
		fs.readdirSync('./models').forEach(function(file) {
			if (file.match(/.+\.js/g) !== null) {
				
				const name = file.replace('.js', '');
				models[name] = require('../models/' + name)(modules);
				//show.warn('Model "' + file + '" loaded');
			};
		});

	} catch(error) {

		return false;
	};

	return models;
};

module.exports = {
	live: live,
	host: host,
	loadModelsWithModules: loadModelsWithModules,
	loadControllersWithModules: loadControllersWithModules
};