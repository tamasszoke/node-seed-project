
'use strict';

const expect = require('chai').expect;
const http = require('http');
const assert = require('assert');
const app = require('../app');

describe('#app', () => {

	/*before(() => {
		app.listen;
	});*/

	it('should return 200', (done) => {
		http.get('http://localhost:3000', function (res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});

	after(() => {
		app.close();
	});
});