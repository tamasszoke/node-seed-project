
'use strict';

const expect = require('chai').expect;
const config = require('../controllers/config');

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

	it('should throw TypeError', () => {
		const result = config.loadModelsWithModules();
		expect(result).to.satisfy(function(fn) {
			return typeof fn === 'object'|| fn === false
		});
	});

	it('should throw TypeError', () => {
		const result = config.loadControllersWithModules();
		expect(result).to.satisfy(function(fn) {
			return typeof fn === 'object'|| fn === false
		});
	});
});