module.exports = function(grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Skeleton Theme v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' */\n\n',

    distPath: "dist",

    clean: {
      dist: ['<%= distPath %>']
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [
          'bower_components/bootstrap/dist/js/bootstrap.js'
        ],
        dest: '<%= distPath %>/assets/js/main.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      dist: {
        src: [
          '<%= concat.dist.dest %>'
        ],
        dest: '<%= distPath %>/assets/js/main.min.js'
      }
    },

    less: {
      dist: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '<%= distPath %>/assets/css/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= distPath %>/assets/css/style.css': 'less/style.less'
        }
      },
      min: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          '<%= distPath %>/assets/css/style.min.css': '<%= distPath %>/assets/css/style.css'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        flatten: true,
        src: [
          "fonts/*",
          "bower_components/bootstrap/dist/fonts/*"
        ],
        dest: '<%= distPath %>/assets/fonts/'
      },
      img: {
        expand: true,
        src: ["img/*"],
        dest: '<%= distPath %>/assets/'
      },
      vendor_js: {
        expand: true,
        flatten: true,
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/html5shiv/dist/html5shiv.js',
          'bower_components/respond/dest/respond.min.js',
        ],
        dest: '<%= distPath %>/assets/js/'
      }
    },

    htmlbuild: {
      dist: {
        src: 'src/*.html',
        dest: '<%= distPath %>/',
        options: {
          beautify: true,
          relative: true,
          sections: {
            layout: {
                header: 'src/layout/header.html',
                footer: 'src/layout/footer.html'
            },
            partial: {
              partial: 'src/partials/partial.html'
            }
          }
        }
      }
    },

    watch: {
      options: { livereload: true },
      less: {
        files: 'less/*.less',
        tasks: ['less']
      },
      html: {
        files: 'src/**/*.html',
        tasks: ['html']
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 4000,
          base: 'dist',
          hostname: '*',
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // JS distribution task.
  grunt.registerTask('js', ['concat', 'uglify', 'copy:vendor_js']);

  // CSS distribution task.
  grunt.registerTask('css', ['less']);

  // Fonts distribution task.
  grunt.registerTask('fonts', ['copy:fonts']);

  // Image distribution task.
  grunt.registerTask('img', ['copy:img']);

  // Html distribution task.
  grunt.registerTask('html', ['htmlbuild:dist']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'css', 'fonts', 'js', 'img', 'html']);

  grunt.registerTask('default', ['connect', 'watch']);
};
