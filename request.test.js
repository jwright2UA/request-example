'use strict';

var assert = require('assert');

var Request = require('./request');

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

		it('from github', function(done){
			r.getProfile('bulkan').then(function(followers){
					assert.equal(followers.length, 30);
					done();
				})
				.catch(function(err){
					console.log('inside the catch', err);
					done();
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
