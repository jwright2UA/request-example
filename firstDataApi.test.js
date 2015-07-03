'use strict';

var assert = require('assert');

var FdApi = require('./');

describe('First Data API', function () {
	describe('should instantiate', function () {
		it('using default values if params not present', function () {
			var api = new FdApi();

			assert.equal(api.endpoint, 'test', 'instantiation of default endpoint failed');
			assert.equal(api.timeOut, 10000, 'instantiation of default timeout failed');
		});

		it('using params passed in', function () {
			var testParams = {
				timeOut: 500,
				endpoint: 'keith',
				extraParam: 'just passing it in'
			}
			var api = new FdApi(testParams);

			assert.equal(api.endpoint, 'keith', 'instantiation of endpoint param failed');
			assert.equal(api.timeOut, 500, 'instantiation of timeout param failed');
			assert.equal(api.extraParam, 'just passing it in', 'instantiation of random param failed');
		});
	});

	describe('should be able to hello world', function () {
		var api;
		before(function () {
			api = new FdApi();
		});
		it('using the name keith', function () {
			assert.equal(api.test('keith'), 'hello keith', 'instantiation of test method failed');
		});
	});

	describe('should be able to get profile', function () {
		var api,
			data;

		before(function () {
			api = new FdApi();
		});

		it('from github', function(done){
			var followers;
			api.getProfile('bulkan').then(function(result){
					console.log('inside the then', result.body);
					followers = JSON.stringify(result.body);
					assert.equal(followers.length, 4);
					console.log(followers);
					done();
				})
				.catch(function(err){
					console.log('inside the catch', err);
					done();
				});
		});

		it('promise test passing', function () {
			api.promiseTest(true).then(function(result){
				assert.equal(result, 'it passed');
			})
			.catch(function(err){
				assert.equal(err, 'it failed');
			});
		});
		it('promise test failing', function () {
			api.promiseTest(false).then(function(result){
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
