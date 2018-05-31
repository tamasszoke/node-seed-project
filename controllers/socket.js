
/*
	Socket.IO connections of Node Seed Project
	Copyright (c) 2017 Tamas Szoke. All Rights Reserved.
*/

module.exports = (root) => {

	const app = root.app;
	const io = root.io;
	const show = root.show;
	const config = root.config;

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

/* Socket.io cheatsheet

	Send to current request socket client:
	socket.emit('message', 'this is a test');

	Send to all clients, include sender:
	io.sockets.emit('message', 'this is a test');

	Send to all clients except sender:
	socket.broadcast.emit('message', 'this is a test');

	Send to all clients in 'game' room(channel) except sender:
	socket.broadcast.to('game').emit('message', 'this is a test');

	Send to all clients in 'game' room(channel), include sender:
	io.sockets.in('game').emit('message', 'this is a test');

	Send to individual socketid:
	io.sockets.socket(socketid).emit('message', 'this is a test');
*/