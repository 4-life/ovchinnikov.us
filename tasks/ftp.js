'use strict';
  
module.exports = function(grunt) {

  grunt.registerMultiTask('ftp', 'Sending ftp file.', function() {
	
	var JSFtp = require("jsftp");
	var chalk = require('chalk');
	var path = require('path');
	var done = this.async();
	var self = this;
	
    var options = self.options({
		
    });
      
	if(options.file && options.file!=''){	
		var file_options = JSON.parse(fs.readFileSync('./'+options.file, 'utf8'));
		for (var property in file_options){
			options[property] = file_options[property];
		}
	}
	
	var Ftp = new JSFtp({
		host: options.host,
		port: options.port, 
		user: options.user, 
		pass: options.pass
	});	
	
    // Listen event to decide when can stop the task 
    grunt.event.on('finish', function(eventType) {
        done();
    });
	
	var build_file  = 'app.zip',
		script_file = 'index.php',
		build_src   = path.resolve('./_build/', build_file),
		script_src  = path.resolve('./server/', script_file);
	
	Ftp.put(build_src, options.path + build_file, function(hadError) {
		if (!hadError){
			grunt.log.writeln(chalk.bgGreen(build_file+" file transferred successfully!"));
			grunt.log.writeln(chalk.bgMagenta("sending server script..."));
			sendServerScript();
			return false;
		}else{
			grunt.log.writeln(chalk.red(hadError));
			return false;				
		}
	});
	
	function sendServerScript(){
		Ftp.put(script_src, '/ovchinnikov.us/_build/' + script_file, function(hadError) {
			if (!hadError){
				grunt.log.writeln(chalk.bgGreen("server script transferred successfully!"));
				grunt.event.emit('finish');
			}else{
				grunt.log.writeln(chalk.red(hadError));
				return false;				
			}
		});	
	}
	
	
 });
};
