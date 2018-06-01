
'use strict'

//module.exports = (root) => {

	//const app = root.app;
	//const config = root.config;
	//const io = root.io;

let server;

const listen = (app, config, socketio, show) => {

	const http = require('http');
	const mongoose = require('mongoose');
	let io;

	server = http.createServer(app).listen(config['host'].port, config['host'].ip);
	//server = https.createServer(configHost.sslOptions, app).listen(host.sslPort, host.ip);
	io = socketio.listen(server);
	//show.log('Server ready on port ' + config['host'].port + '!');

	// connect to database
	mongoose.connect(config['host'].mongoUrl);
	const db = mongoose.connection;
	db.on('error', (error) => { /*show.log('Database connection error!');*/ });
	db.once('open', () => { /*show.warn('Database connected!');*/ });
};

const close = (server, show) => {
	server.close();
	//show.log('Server closed!');
};

module.exports = {
	listen: listen,
	close: close
};