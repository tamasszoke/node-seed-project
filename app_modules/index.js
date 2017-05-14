
/*
	Routing of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

module.exports = function (root) {

	var app = root.app,
		io = root.io,
		host = root.host,
		crypto = root.crypto,
		log = root.log,
		smtpTransport = root.smtpTransport,
		db_stat = root.db_stat,
		live = root.live;

	var all_rooms = [],
		current_room;

	/* Routing */

	app.get('/', function(req, res) {

		/* Redirecting if not https (optional) */
		/*if (req.headers.host.match(/^www/) !== null || !req.secure) { res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url); }
		else {*/

			/* IP of client */
			var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
			log('Client IP: ' + ip);

			res.render('index', {page: 'main', host: host, live: live});
		//};
	});

	/*app.get('/SomethingYouNeed', function(req, res) {

		res.render('SomePage', {host: host, live: live});
	});*/

	/* 404 error handling */
	app.use(function(req, res, next) {

		if (req.originalUrl != '/favicon.ico') {

			log('New route:' + req.originalUrl + ': ' + res.statusCode);
			res.render('index', {page: 'error', host: host, live: live});
		};
	});
};