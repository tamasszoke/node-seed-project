
socket.on('connect', (message) => {
	
	console.log('Socket connection live!');
});

socket.on('disconnect', () => {

	console.log('Socket disconnected!');
});

socket.on('message', (message) => {

	console.log('Socket message:', message);
});