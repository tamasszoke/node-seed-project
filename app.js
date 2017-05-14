
/*
	Server of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

/* Variables for modules */
var app, express, http, io, server, ws, mongojs, nodemailer, fs, path, host, config, passport, request,
	crypto, facebookStrategy, twitterStrategy, googleStrategy, globalSocket, cookieParser, bodyParser,
	session, async, options, modules = [];

/* Variables for database */
var db, collection;

/* Variables for communication */
var globalSocket, cookieParser, bodyParser, session;

express = require('express');
https = require('https');
http = require('http');

app = express(); /* Start express */
ws = require('socket.io'); /* Communication between the client and server */
mongojs = require('mongojs'); /* Database connection */
nodemailer = require('nodemailer'); /* Email messaging */
nodemailer_smtp_transport = require('nodemailer-smtp-transport');
request = require('request'); /* Ajax calls */
fs = require('fs'); /* Loading js files */
crypto = require('crypto'); /* Generating link */
async = require('async');

/* Express 4 */
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
session = require('express-session');

/* Passport */
passport = require('passport');
facebookStrategy = require('passport-facebook').Strategy;
twitterStrategy = require('passport-twitter').Strategy;
googleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* Configuration */
modules['config'] = require('./app_modules/config');

var live = modules['config']['live'];

if (live) {

	config = modules['config']['api_keys'];

	/* SSL live (optional) */
	/*options = {
		key: fs.readFileSync(modules['config']['ssl']['liveSsl'].key),
		cert: fs.readFileSync(modules['config']['ssl']['liveSsl'].cert)
	};*/

	/* Live */
	host = { ip: null, port: 80, port_ssl: 443 };

	/* Connecting to database (mongolab.com) */
	db = mongojs(modules['config']['mongodb']['liveUrl']);
	collection = db.collection('any');

} else {

	config = modules['config']['apiKeys'];

	/* SSL local (optional) */
	/*options = {
		key: fs.readFileSync(modules['config']['ssl']['localSsl'].key),
		cert: fs.readFileSync(modules['config']['ssl']['localSsl'].cert)
	};*/

	/* Local */
	host = { ip: 'localhost', port: 7777, port_ssl: 7777 };

	/* Connecting to database (mongolab.com) */
	db = mongojs(modules['config']['mongodb']['localUrl']);
	collection = db.collection('any');
};

/* Reusable transport method (opens pool of SMTP connections) */
var smtpTransport = nodemailer.createTransport(nodemailer_smtp_transport({
    service: 'gmail',
    auth: {
        user: '@gmail.com', // Gmail to send emails from
        pass: ''
    }
}));

/* Configure application */
app.use(express["static"]('./static'));
app.set('view engine', 'ejs'); /* Using EJS as view engine */
//app.set('views', '.static/view'); /* Change default view directory (optional) */
app.use(cookieParser()); /* Read cookies (need for auth) */
app.use(bodyParser()); /* Ajax at index page */
app.use(session({ secret: 'TellMeYourSecret' }));
app.use(passport.initialize());
app.use(passport.session());

/* Start server */
if (live) http.createServer(app).listen(host.port); // change this
//server = https.createServer(options, app).listen(host.port_ssl, host.ip);
server = http.createServer(app).listen(host.port, host.ip);

/* Start socket.io */
io = ws.listen(server);

/* Some info */
log('Server started...');

/* Loading custom modules */
fs.readdirSync(__dirname + '/app_modules/').forEach(function(file) {

	if (file.match(/.+\.js/g) !== null) {
		
		var name = file.replace('.js', '');

		if (name != 'config') {

			modules[name] = require('./app_modules/' + name)({
				app: app,
				host: host,
				config: config,
				io: io,
				request: request,
				mongojs: mongojs,
				collection: collection,
				smtpTransport: smtpTransport,
				fs: fs,
				path: path,
				async: async,
				crypto: crypto,
				live: live,
				log: log,
				//passport: passport,
				//facebookStrategy: facebookStrategy,
				//twitterStrategy: twitterStrategy,
				//googleStrategy: googleStrategy
			});
		};

		log('Module "' + file + '" loaded');
	};
});

log('Server ready on port ' + host.port + '!');

/* Custom logging */
function log(msg) {

	var d = new Date();

	var minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
		hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
		ampm = d.getHours() >= 12 ? 'pm' : 'am';

	var time = hours + ':' + minutes + ' ' + ampm;

	var trace = new Error().stack,
		line = trace.split('at')[2].split(' ');
	
	if (line[2]) line = line[2].match(/\(([^)]+)\)/)[1].toString();
	else line = line[1].replace(/\s/g,'').toString();

	line = line.replace(/^.*[\\\/]/, '');

	console.log('\033[34m', time, '\033[0m:\033[33m', msg, '\033[0m   =>   \033[35m', line, '\033[0m');
};
