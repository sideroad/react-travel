/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Less task yield
    less: {
      style: {
        options: { cleancss: true },
        src: 'less/app.less',
        dest: 'dist/bundle.css'
      }
    },

    browserify: {
      dist: {
        files: {
          'dist/bundle.js': ['app/browser.js'],
        }
      }
    },

    copy:  {
      expand: true,
      src: ['images/**/*.*'],
      dest: 'dist/'
    },

    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      browserify: {
        files: ['app/**/*.js', '!app/server.js'],
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      },
      copy: {
        files: ['images/**/*'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['watch']);

};
