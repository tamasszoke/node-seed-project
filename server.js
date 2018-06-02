
/*
	Server of NodeSeedProject
	Copyright (c) 2017 Tamas Szoke.
*/

// configuration, modules
const config = require('./configuration/config');
const express = require('express');
const helmet = require('helmet');
const https = require('https');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const nodemailerSmtpTransport = require('nodemailer-smtp-transport');
const request = require('request');
const path = require('path');
const crypto = require('crypto');
const passport = require('passport');
const fs = require('fs');
const winston = require('winston');

// express 4 specific
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// passport specfic
facebookStrategy = require('passport-facebook').Strategy;
twitterStrategy = require('passport-twitter').Strategy;
googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// server configuration
app.use(helmet());
app.use(express["static"]('./static'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
	secret: crypto.randomBytes(48).toString('hex'),
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// reusable transport method
const smtpTransport = nodemailer.createTransport(nodemailerSmtpTransport({
	service: 'gmail',
	auth: { user: '@gmail.com', pass: '' }
}));

// logging
show = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' })
	]
});

if (process.env.NODE_ENV !== 'test') {

	show.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
};

// start server, database, socket.io
const listen = () => {

	server = http.createServer(app).listen(config['host'].port, config['host'].ip);
	//server = https.createServer(configHost.sslOptions, app).listen(host.sslPort, host.ip);
	io = socketio.listen(server);

	// connect to database
	mongoose.connect(config['host'].mongoUrl);
	const db = mongoose.connection;
	db.on('error', (error) => { show.info('Database connection error!'); });
	db.once('open', () => { show.info('Database connected!'); });
	
	// load models
	const models = loadModels({
		mongoose
	});

	// load controllers
	const controllers = loadControllers({
		config,
		app,
		io,
		show,
		models
	});

	show.info('Server ready on port ' + config['host'].port + '!');
};

const loadModels = (modules) => {

	let models = [];
	
	fs.readdirSync('./models').forEach(function(file) {
		if (file.match(/.+\.js/g) !== null) {
			
			const name = file.replace('.js', '');
			models[name] = require('./models/' + name)(modules);
			show.info('Model "' + file + '" loaded');
		};
	});

	return models;
};

const loadControllers = (modules) => {

	let controllers = [];

	fs.readdirSync('./controllers').forEach(function(file) {
		if (file.match(/.+\.js/g) !== null && file != 'config.js') {
		
			const name = file.replace('.js', '');
			controllers[name] = require('./controllers/' + name)(modules);
			show.info('Controller "' + file + '" loaded');
		};
	});

	return controllers;
};

// close server, database
const close = () => {

	server.close();
	mongoose.disconnect();
};

listen();

// for testing
module.exports = {
	listen,
	close
};