
/* From components/scripts.ejs */
if (live) {

	var main_url = 'wss://live.url:' + host.port; // change this
	
} else {

	var main_url = 'http://' + host.ip + ':' + host.port;
	console.log('Development mode!');
};

var socket = io.connect(main_url);