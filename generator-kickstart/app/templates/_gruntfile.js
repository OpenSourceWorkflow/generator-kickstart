module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    timestamp: '<%= grunt.template.today("yyyymmddHHMM") %>',

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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compass']);

};