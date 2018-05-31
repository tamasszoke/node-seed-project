
/*
	Routing of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

module.exports = (root) => {

	const app = root.app;
	const io = root.io;
	const show = root.show;
	const config = root.config;

	// routing
	app.get('/', (req, res) => {

		// redirecting if not https (optional)
		//if (req.headers.host.match(/^www/) !== null || !req.secure) return res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);

		res.render('index', {page: 'main', host: config['host'], live: config['live']});
	});

	// error handling, 404
	app.use((req, res, next) => {

		if (req.originalUrl != '/favicon.ico') {

			res.render('index', {page: 'error', host: config['host'], live: config['live']});
		};
	});
};