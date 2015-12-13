'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
	deploy: {	
      default_options: {
        options: {	  
			host : "ovchinnikov.us",
			path : '/_build/'
        }
	  }
    },
    compress : {
        main : {
            options : {
                archive : "_build/app.zip"
            },
            files : [
                { expand: true, src : "**/*", cwd : "_dev/" }
            ]
        }
    },
    ftp: {
      default_options: {
        options: {
		    file : ".ftp.json"
        },
      },
    },
  });


  grunt.loadTasks('tasks');
    
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  grunt.registerTask('default', ['compress', 'ftp', 'deploy']);
  
};