module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['assets/**/*.scss'],
        tasks: ['compass']
      },
    },

    copy: {
      libs: {
        files: [
          {src: ['components/jquery/jquery.min.js'], dest: 'assets/js/jquery.js'},
          {src: ['components/modernizr/modernizr.js'], dest: 'assets/js/modernizr.js'}
        ]
      },<% if (accordion) { %>
      snippets: {
        files: [
          {src: ['components/accordion/mf_accordion.js'], dest: 'accordion.js'}
        ]
      }<% } %>
    },

    clean: {
      install: {
        src: ["components"]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass']);
  grunt.registerTask('install', ['copy']);

};