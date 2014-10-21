module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
        spawn: false
      },

      // Styling
      scss: {
        files: 'components/**/*.scss',
        tasks: ['imagemin', 'sync', 'compass:development', <% if (includeModernizr) { %>'modernizr',<% } %> 'csslint']
      },

      // Scripting
      js: {
        files: ['components/*.js', 'components/app/**/*.js', '!components/app/_deferred/**/*.js'],
        tasks: ['requirejs:development', <% if (includeModernizr) { %>'modernizr',<% } %> 'jshint'],
      },
      js_deferred: {
        files: ['components/app/_deferred/**/*.js'],
        tasks: ['uglify:deferred', <% if (includeModernizr) { %>'modernizr',<% } %> 'jshint'],
      },
      js_bower: {
        files: ['components/libs/**/*.js'],
        tasks: ['uglify:external', 'requirejs:development'],
      },

      // HTML
      html: {
        files: ['*.html', 'components/app/**/*.html' , '!components/libs/**/*.html', '!build/**/*.html'],
        tasks: ['replace', 'accessibility'],
      },

      // Images
      img_content: {
        files: 'img/**/*.{png,gif,jpg,svg}',
        tasks: ['imagemin:content'],
      },
      img_background: {
        files: 'components/**/*.{png,gif,jpg,svg}',
        tasks: ['clean:css', 'imagemin:backgrounds' , 'compass:development', 'clean:development', 'csslint'],
      }
    },

    compass: {
      options: {
        asset_cache_buster: false,
        cssDir: 'build/assets/css',
        httpImagesPath: '/assets/img',
        imagesDir: 'build/assets/img',
        noLineComments: true,
        require: 'sass-css-importer',
        sassDir: 'components',
        sourcemap: true
      },
      development: {
        options: {
          environment: 'development'
        }
      },
      production: {
        options: {
          httpPath: "/", // . = relative
          environment: 'production'
        }
      }
    },

    replace: {
      modules: {
        options: {
          patterns: [
            {
              match: /{app:{(.+)}}/g,
              replacement: function (match, placeholder) {
                return grunt.file.read('components/app/' + placeholder + '/' + placeholder + '.html');
              }
            },
            {
              match: /{deferred:{(.+)}}/g,
              replacement: function (match, placeholder) {
                return grunt.file.read('components/app/_deferred/' + placeholder + '/' + placeholder + '.html');
              }
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['*.html'],
            dest: 'build/'
          }
        ]
      }
    },

    requirejs: {
      options: {
        mainConfigFile: "components/<%= _.slugify(ProjectName) %>.js",
        name: "<%= _.slugify(ProjectName) %>",
        out: "build/assets/js/<%= _.slugify(ProjectName) %>.js",
        useStrict: true
      },
      development: {
        options: {
          generateSourceMaps: true,
          optimize: 'none'
        }
      },
      production: {
        options: {
          generateSourceMaps: false,
          optimize: 'uglify'
        }
      }
    },

    uglify: {
      deferred: {
        options: {
          beautify: true
        },
        files: [{
            expand: true,
            flatten: true,
            cwd: 'components/app/_deferred',
            src: ['**/*.js'],
            dest: 'build/assets/js/deferred'
        }]
      },
      external: {
        options: {
          beautify: true
        },
        files: {
          <% if (includeModernizr) { %>'build/assets/js/libs/modernizr.js': ['components/libs/modernizr-shim/modernizr.min.js'],<% } %>
          'build/assets/js/libs/require.js': ['components/libs/requirejs/require.js']
        }
      }
    },

    imagemin: {
      content: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'build/img'
        }]
      },
      backgrounds: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'components/app',
          src: ['**/*.{jpg,gif,png,svg}'],
          dest: 'build/assets/img'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['components/app/**/*.js']
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc',
        import: false
      },
      lax: {
        src: ['build/assets/css/**/*.css']
      }
    },

    accessibility: {
      options : {
        accessibilityLevel: 'WCAG2<%= WCAG2 %>',
        outputFormat: 'txt',
        domElement: true
      },
      development : {
        files: [{
          expand  : true,
          cwd     : 'build/',
          src     : ['*.html'],
          dest    : 'build/WCAG2-reports/',
          ext     : '-report.txt'
        }]
      }
    },

    clean: {
      development: {
        src: ["build/assets/img/**/*.svg"]
      },
      css: {
        src: ["build/assets/css/**/*.css"]
      }
    },

    qunit: {
      all: ['qunit/qunit-test-suite.html']
    },

    sync: {
      webfonts: {
        files: [{
          flatten: true,
          expand: true,
          cwd: 'components/app',
          src: ['**/font/*.{ttf,eot,woff,svg}'],
          dest: 'build/assets/font'
        }],
        verbose: true
      }
    }<% if (includeModernizr) { %>,

    modernizr: {
      dist: {
        "devFile" : "components/libs/modernizr-shim/modernizr.min.js",
        "outputFile" : "build/assets/js/libs/modernizr.js",
        "extra" : {
          "shiv" : true,
          "printshiv" : true,
          "load" : false,
          "mq" : false,
          "cssclasses" : true
        },
        "files" : {
          "src": ['components/app/**/*.js', 'build/**/*.css']
        }
      }
    }<% } %>

  });

  grunt.loadNpmTasks('grunt-accessibility');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  <% if (includeModernizr) { %>grunt.loadNpmTasks("grunt-modernizr");<% } %>
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask('default', ['replace', 'imagemin', 'sync',  'compass:development', 'requirejs:development', 'uglify', 'clean:development', <% if (includeModernizr) { %>'modernizr',<% } %> 'csslint', 'jshint', 'accessibility']);

};
