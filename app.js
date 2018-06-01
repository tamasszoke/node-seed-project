
/*
	Server of NodeSeedProject
	Copyright (c) 2017 Tamas Szoke.
*/

// configuration, modules
const config = require('./controllers/config');
const express = require('express');
const helmet = require('helmet');
const https = require('https');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const nodemailer_smtp_transport = require('nodemailer-smtp-transport');
const request = require('request');
const path = require('path');
const crypto = require('crypto');
const show = require('eyecatcher');
const passport = require('passport');

// express 4 specific
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// passport specfic
facebookStrategy = require('passport-facebook').Strategy;
twitterStrategy = require('passport-twitter').Strategy;
googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// configure application
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
const smtpTransport = nodemailer.createTransport(nodemailer_smtp_transport({
	service: 'gmail',
	auth: { user: '@gmail.com', pass: '' }
}));

// start server, socket.io
const server = http.createServer(app).listen(config['host'].port, config['host'].ip);
//server = https.createServer(configHost.sslOptions, app).listen(host.sslPort, host.ip);
io = socketio.listen(server);

// connect to database
mongoose.connect(config['host'].mongoUrl);
const db = mongoose.connection;
db.on('error', (error) => { /*show.log('Database connection error!');*/ });
db.once('open', () => { /*show.warn('Database connected!');*/ });

// loading models
const models = config.loadModelsWithModules({
	mongoose: mongoose
});

// loading controllers
const controllers = config.loadControllersWithModules({
	app: app,
	io: io,
	show: show,
	config: config,
	yourModel: models['yourModel']
});

const close = () => {
	server.close();
	//show.log('Server closed!');
};

module.exports = {
	close: close
};

//show.log('Server ready on port ' + config['host'].port + '!');