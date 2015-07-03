'use strict';
var FdApi = require('./');

var api = new FdApi();

api.getProfile('bulkan')
	.then(function(result){
		console.log('inside the then', result.body);
	})
	.catch(function(err){
		console.log('inside the catch', err);
	});

