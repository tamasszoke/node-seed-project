
socket.on('connect', function(message) {
	
	console.log('Socket connection live!');
});

socket.on('disconnect', function() {

	console.log('Socket disconnected!');
});

socket.on('message', function(message) {

	console.log('Socket message:', message);
});