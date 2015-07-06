'use strict';

var assert = require('assert');

var sinon = require('sinon'),
	sinonBluebird = require('sinon-bluebird'),
	Promise = require('bluebird');

var Request = require('./request'),
	mocks = require('./mocks');


describe('HTTPS requests from node', function () {

	describe('should be able to get profile', function () {
		var r,
			data;

		before(function () {
			r = new Request();
		});

		afterEach(function(){
			r.getProfile.restore();
		});

		it('from github', function(){
			sinon.stub(r, 'getProfile').resolves(mocks.goodResponse);
			return Promise.resolve(r.getProfile('bulkan'))
				.then(function(response){
					assert.equal(response.body.length, 3);
				})
				.catch(function(err){
					assert.equal(200, err.statusCode, 'request failed');
				});
		});

		it('from github and return an error for a profile not found', function(){
			sinon.stub(r, 'getProfile').resolves(mocks.notFoundResponse);
			return Promise.resolve(r.getProfile('bulkan'))
				.then()
				.catch(function(err){
					assert.equal(404, err.statusCode, 'request should have been 404');
				});
		});

	});
});
