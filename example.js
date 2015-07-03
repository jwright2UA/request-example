var https = require('https');
var Promise = require('bluebird');

var PromiseRequest = Promise.method(function(options) {
    return new Promise(function(resolve, reject) { 
        var request = https.request(options, function(response) {
            // Bundle the result
            var result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'body': '',
                'trailers': response.trailers,
            };

            // Build the body
            response.on('data', function(chunk) {
                result.body += chunk;
            });

            // Resolve the promise
            resolve(result);
        });

        // Handle errors
        request.on('error', function(error) {
            console.log('Problem with request:', error.message);
            reject(error);
        });

        // Must always call .end() even if there is no data being written to the request body
        request.end();
    });
});

var myRequest = PromiseRequest({
    method: 'GET',
    host: 'api.github.com',
    port: 443,
    path: '/users/bulkan/followers',
    //host: 'www.nodejs.org',
    //port: 80,
    //path: '/'
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'jwright2UA'
      }
}).then(function(value) {
    console.log('value:', value);
});