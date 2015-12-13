'use strict';

module.exports = function(grunt) {  

  grunt.registerMultiTask('deploy', function() {
    var async = require('async');
    var done = this.async();
	var http = require('http');

	var options = this.options({
		
    });
   
	function sendFiles(callback) {
		var server = {
			host: options.host || 'localhost',
			//port: options.port || '8080',
			path: options.path || ''
		};
		http.request(server).on('response', function(response) {
			var data = '';
			response.on("data", function (chunk) {
				data += chunk;
			});
			response.on('end', function () {
				callback(data);
			});
		}).end();
	}

	sendFiles( function (srv) {
		console.log(srv);
		done();
	});
	
  });
};
