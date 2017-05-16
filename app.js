
/*
	Server of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

// Variables for modules
var app, express, http, io, server, ws, mongojs, nodemailer, fs, path, host, config, passport, request,
	crypto, facebookStrategy, twitterStrategy, googleStrategy, globalSocket, cookieParser, bodyParser,
	session, async, options, modules = [];

// Variables for database
var db, collection;

// Variables for communication
var globalSocket, cookieParser, bodyParser, session;

// Load configuration
modules['config'] = require('./controllers/config');

// Live or local, configurations
var live = modules['config']['live'],
	hostConfig = modules['config']['host'],
	passportConfig = modules['config']['api_keys'],
	mongoConfig = modules['config']['mongodb'];

express = require('express');
https = require('https');
http = require('http');

app = express(); // Start Express
ws = require('socket.io'); // Communication between the client and server
mongojs = require('mongojs'); // Database connection
nodemailer = require('nodemailer'); // Email messaging
nodemailer_smtp_transport = require('nodemailer-smtp-transport');
request = require('request'); // Ajax calls
fs = require('fs'); // Loading modules (js files)
crypto = require('crypto'); // Generating link
async = require('async');

// Express 4 specific things
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
session = require('express-session');

// Passport
passport = require('passport');
facebookStrategy = require('passport-facebook').Strategy;
twitterStrategy = require('passport-twitter').Strategy;
googleStrategy = require('passport-google-oauth').OAuth2Strategy;

if (live) {

	// SSL live (optional)
	/*options = {
		key: fs.readFileSync(modules['config']['ssl']['liveSsl'].key),
		cert: fs.readFileSync(modules['config']['ssl']['liveSsl'].cert)
	};*/

	// Live
	host = {
		ip: hostConfig['live']['ip'],
		port: hostConfig['live']['port'],
		portSSL: hostConfig['live']['portSSL']
	};

	// Connecting to database (try out mongolab.com)
	db = mongojs(mongoConfig['liveUrl']);
	// Select collection from database
	collection = db.collection('any');

} else {

	// SSL local (optional)
	/*options = {
		key: fs.readFileSync(modules['config']['ssl']['localSsl'].key),
		cert: fs.readFileSync(modules['config']['ssl']['localSsl'].cert)
	};*/

	// Local
	host = {
		ip: hostConfig['local']['ip'],
		port: hostConfig['local']['port'],
		portSSL: hostConfig['local']['portSSL']
	}

	// Connecting to database (try out mongolab.com)
	db = mongojs(mongoConfig['localUrl']);
	// Select collection from database
	collection = db.collection('any');
};

// Reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport(nodemailer_smtp_transport({
    service: 'gmail',
    auth: {
        user: '@gmail.com', // Gmail to send emails from
        pass: ''
    }
}));

// Configure application
app.use(express["static"]('./static'));
app.set('view engine', 'ejs'); // Using EJS as view engine
//app.set('views', '.static/view'); // Change default view directory (optional)
app.use(cookieParser()); // Read cookies (need for auth)
app.use(bodyParser.json()); // For JSON requests
//app.use(bodyParser.urlencoded({extended: true})); // optional, see: http://stackoverflow.com/q/39870867/1371995
app.use(session({ // Session
    secret: crypto.randomBytes(48).toString('hex'),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); // Passport for Facebook, Twitter, Google login
app.use(passport.session());

// Start server
if (live) http.createServer(app).listen(host.port); // change this
//server = https.createServer(options, app).listen(host.portSSL, host.ip);
server = http.createServer(app).listen(host.port, host.ip);

// Start socket.io
io = ws.listen(server);

// Some info
log('Server started...');

// Loading controllers
fs.readdirSync(__dirname + '/controllers/').forEach(function(file) {

	if (file.match(/.+\.js/g) !== null) {
		
		var name = file.replace('.js', '');

		if (name != 'config') {

			modules[name] = require('./controllers/' + name)({
				app: app,
				host: host,
				io: io,
				live: live,
				log: log,
				//request: request,
				//mongojs: mongojs,
				//collection: collection,
				//smtpTransport: smtpTransport,
				//async: async,
				//fs: fs,
				//path: path,
				//crypto: crypto,
				//passport: passport,
				//facebookStrategy: facebookStrategy,
				//twitterStrategy: twitterStrategy,
				//googleStrategy: googleStrategy,
				//passportConfig: passportConfig
			});
		};

		log('Controller "' + file + '" loaded');
	};
});

log('Server ready on port ' + host.port + '!');

// Custom logging
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
