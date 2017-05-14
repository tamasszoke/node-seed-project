
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
		host = root.host,
		io = root.io,
		live = root.live,
		log = root.log;

	/* Socket connection */

	io.on('connection', function(socket) {
	
		log('Socket.IO client connected!');

		socket.on('SomethingYouNeed', function(message) {

			/* Write incoming message to console */
			log(message);
		});

		socket.on('disconnect', function() {

			log('Socket.IO client disconnected!');
		});
	});
};
