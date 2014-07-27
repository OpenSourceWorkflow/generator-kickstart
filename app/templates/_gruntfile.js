module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      scss: {
        files: 'assets/scss/**/*.scss',
        tasks: ['compass:development']
      },
      js_modules: {
        files: ['assets/js/modules/*.js', 'assets/js/*.js'],
        tasks: ['requirejs:development'],
      },
      js_deferred: {
        files: ['assets/js/modules/deferred/*.js'],
        tasks: ['uglify:deferred'],
      },
      js_external: {
        files: ['assets/js/libs/external/*.js'],
        tasks: ['uglify:external'],
      },
      js_libs: {
        files: ['assets/js/libs/*.js'],
        tasks: ['uglify:external'],
      },
      html: {
        files: ['**/*.html', '!build/**/*.html'],
        tasks: ['replace:development'],
      },
      img_content: {
        files: 'img/**/*.{png,gif,jpg,svg}',
        tasks: ['imagemin:content'],
      },
      img_background: {
        files: 'assets/img/**/*.{png,gif,jpg,svg}',
        tasks: ['imagemin:backgrounds'],
      }
    },

    compass: {
      options: {
        // banner: "/* <%= pkg.author %>, Version: <%= pkg.version %> */",
        // imagesPath: 'assets/img',
        // specify: '*.scss'
        asset_cache_buster: false,
        cssDir: 'build/assets/css',
        httpImagesPath: '/assets/img',
        httpPath: "/build", // . = relative
        imagesDir: 'build/assets/img',
        noLineComments: true,
        sassDir: 'components',
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
      development: {
        options: {
          patterns: [
            {
              match: /{{(.+)}}/g,
              replacement: function (match, placeholder) {
                return grunt.file.read("components/app/" + placeholder + "/" + placeholder + ".html");
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
      development: {
        options: {
          // baseUrl: "modules",
          mainConfigFile: "components/<%= _.slugify(ProjectName) %>.js",
          name: "<%= _.slugify(ProjectName) %>",
          optimize: 'none',
          out: "build/assets/js/<%= _.slugify(ProjectName) %>.js"
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
          <% if (includeModernizr) { %>'build/assets/js/libs/modernizr.js': ['components/bower/modernizr-shim/modernizr.min.js'],<% } %>
          'build/assets/js/libs/require.js': ['components/bower/requirejs/require.js']
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
          cwd: 'components',
          src: ['**/*.{jpg,gif,png,svg}'],
          dest: 'build/assets/img'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('default', ['replace', 'imagemin', 'compass:development', 'requirejs:development', 'uglify']);

};
