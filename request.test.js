'use strict';

var assert = require('assert');

var Promise = require('bluebird');

var Request = require('./request'),
	mocks = require('./mocks');


describe('HTTPS requests from node', function () {

	describe('should be able to hello world', function () {
		var r;
		before(function () {
			r = new Request();
		});
		it('using the name keith', function () {
			assert.equal(r.test('keith'), 'hello keith', 'instantiation of test method failed');
		});
	});

	describe('should be able to get profile', function () {
		var r,
			data;

		before(function () {
			r = new Request();
		});

		it('from github', function(){
			return Promise.resolve(r.getProfile('bulkan'))
				.then(function(response){
					assert.equal(response.body.length, 30);
				});
		});

		it('from github and return an error for a profile not found', function(){
			return Promise.resolve(r.getProfile('bulkan3w342423'))
				.catch(function(err){
					assert.equal('404', err.statusCode, 'returns correct status code on error');
				});
		});

		it('and test a promise passing', function () {
			r.promiseTest(true).then(function(result){
				assert.equal(result, 'it passed');
			})
			.catch(function(err){
				assert.equal(err, 'it failed');
			});
		});
		it('and test a promise failing', function () {
			r.promiseTest(false).then(function(result){
				assert.equal(result, 'it passed');
			})
			.catch(function(err){
				assert.equal(err, 'it failed');
			});
		});
	});
});




// describe('User Profile', function(){
//   before(function(done){
//     sinon
//       .stub(request, 'get')
//       .yields(null, null, JSON.stringify({login: "bulkan"}));
//     done();
//   });

//   after(function(done){
//     request.get.restore();
//     done();
//   });

//   it('can get user profile', function(done){
//     getProfile('bulkan', function(err, result){
//       if(err) return done(err);
//       request.get.called.should.be.equal(true);
//       result.should.not.be.empty;
//       done();
//     });
//   });
// });
