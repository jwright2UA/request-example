'use strict';
var RequestExample = require('./request');

var r = new RequestExample();

r.getProfile('bulkan')
	.then(function(result){
		console.log('inside the then', result);
	})
	.catch(function(err){
		console.log('inside the catch', err);
	});

