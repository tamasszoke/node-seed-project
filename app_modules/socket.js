
/*
	Socket.IO connections of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

/* Socket.io cheatsheet

	// Send to current request socket client
	socket.emit('message', 'this is a test');

	// Send to all clients, include sender
	io.sockets.emit('message', 'this is a test');

	// Send to all clients except sender
	socket.broadcast.emit('message', 'this is a test');

	// Send to all clients in 'game' room(channel) except sender
	socket.broadcast.to('game').emit('message', 'this is a test');

	// Send to all clients in 'game' room(channel), include sender
	io.sockets.in('game').emit('message', 'this is a test');

	// Send to individual socketid
	io.sockets.socket(socketid).emit('message', 'this is a test');
*/

module.exports = function (root) {

	var app = root.app,
		io = root.io,
		host = root.host,
		crypto = root.crypto,
		log = root.log,
		user = root.user,
		smtpTransport = root.smtpTransport;

	/* Socket connection */

	io.on('connection', function(socket) {
	
		log('Socket connected!');

		socket.on('SomethingYouNeed', function(message) {

			/* Write incoming message to console */
			log(message);
		});

		socket.on('SomethingOther', function(message) {

			var type = message.type || '';

			if (type == 'YouCanSpecifyTypes') {} else {};
		});

		socket.on('disconnect', function() {

			log('Socket disconnected!');
		});
	});

	/* Functions */

	function SomeFunction(param_1, param_2) {

	};
};
