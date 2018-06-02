
'use strict';

process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const config = require('../configuration/config');

describe('#config', () => {

	it('should get bool', () => {
		const result = config.live;
		expect(result).to.satisfy(function(bool) {
			return typeof bool === 'boolean'
		});
	});

	it('should get object', () => {
		const result = config.host;
		expect(result).to.be.an('object');
	});
});