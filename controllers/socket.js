
'use strict'

module.exports = (root) => {

	const config = root.config;
	const app = root.app;
	const io = root.io;
	const show = root.show;
	const models = root.models;

	// socket connection
	io.on('connection', (socket) => {
	
		show.info('Socket.IO client connected!');

		socket.on('SomethingYouNeed', (message) => {

			show.info(message);
		});

		socket.on('disconnect', () => {

			show.info('Socket.IO client disconnected!');
		});
	});
};

/**
	// Socket.IO Cheatsheet

	// Add socket to room
	socket.join('some room');

	// Remove socket from room
	socket.leave('some room');

	// Send to current client
	socket.emit('message', 'this is a test');

	// Send to all clients include sender
	io.sockets.emit('message', 'this is a test');

	// Send to all clients except sender
	socket.broadcast.emit('message', 'this is a test');

	// Send to all clients in 'game' room(channel) except sender
	socket.broadcast.to('game').emit('message', 'this is a test');

	// Send to all clients in 'game' room(channel) include sender
	io.sockets.in('game').emit('message', 'this is a test');

	// Send to individual socket id
	io.sockets.socket(socketId).emit('message', 'this is a test');
*/