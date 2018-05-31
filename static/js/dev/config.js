
// variables from components/scripts.ejs

let socketUrl;

if (live) {

	socketUrl = 'wss://' + host.url + ':' + host.port;
	
} else {

	socketUrl = 'http://' + host.ip + ':' + host.port;
	console.log('Local mode!');
};

const socket = io.connect(socketUrl);