'use strict';
var https = require('https');

var _ = require('lodash'),
	Promise = require('bluebird');

function Request(params) {

}

Request.prototype.getProfile = Promise.method(function getProfile(username) {
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

	return new Promise(function (resolve, reject) {

		var request = https.request(options, function(response) {
            var body = '';

            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', function() {
            	var data = { 
						statusCode: response.statusCode,
						body: JSON.parse(body)
					};

				response.statusCode.toString()[0] === '2' ? resolve(data) : reject(data);
            });
		});

		request.on('error', function(e) {
			reject(e);
		});

		request.end();
	});
});

Request.prototype.promiseTest = function promiseTest(pass) {
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

Request.prototype.test = function test(name) {
	return 'hello ' + name;
};

module.exports = Request;
