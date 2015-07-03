'use strict';
var https = require('https');

var _ = require('lodash'),
	Promise = require('bluebird');

function FirstDataApi(params) {
	// FDMS timeout - number of seconds before requests fail to the third party giftcard service
	// FDMS endpoints (staging and production)
	// FDMS merchant ID
	// FDMS merchant key ID
	// FDMS SiteManager merchant ID
	
	_.assign(this, _.assign({
			timeOut: 10000,
			endpoint: 'test'
		}, params)
	);

}

FirstDataApi.prototype.getProfile = function getProfile(username) {
	console.log('inside getProfile');

	var options = {
		hostname: 'api.github.com',
		port: 443,
		path: '/users/' + username + '/followers',
		method: 'GET',
		headers: {
			'Accept': 'application/vnd.github.v3+json',
			'User-Agent': 'jwright2UA'
		}
	};

	var PromiseRequest = Promise.method(function(options) {
		return new Promise(function (resolve, reject) {
			console.log('inside promise');
			
			var request = https.request(options, function(response) {
				var result = '';

				response.on('data', function (chunk) {
					result += chunk;
				});

				resolve(result);
			});

			request.on('error', function(e) {
				console.log('problem with request: ' + e.message);
				reject(e);
			});

			request.end();
		});
	});

	var myRequest = PromiseRequest(options).then(function(value){

	});


};

FirstDataApi.prototype.promiseTest = function promiseTest(pass) {
	return new Promise(function (resolve, reject) {
		if(pass == true){
			resolve('it passed');
		}
		else
		{
			reject('it failed');
		}
	});
};

FirstDataApi.prototype.test = function test(name) {
	return 'hello ' + name;
};

module.exports = FirstDataApi;
