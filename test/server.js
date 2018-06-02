
'use strict';

process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const http = require('http');
const assert = require('assert');
const server = require('../server');

describe('#server', () => {

	it('should return 200', (done) => {
		http.get('http://localhost:3000', function (res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});

	after(() => {
		server.close();
	});
});