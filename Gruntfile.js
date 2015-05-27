/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

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

    nodemon: {
      args: ['--exec', 'babel-node', '--stage', '0'],
      script: 'app/server.js',
      watch: 'app'
    },

    browserify: {
      dist: {
        files: {
          'dist/bundle.js': ['app/browser.js'],
        }
      }
    },

    copy:  {
      main: {
        expand: true,
        src: ['images/*'],
        dest: 'dist/',
        filter: 'isFile'
      }
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
      },
    },

    concurrent: {
      dev: {
        tasks: ['browserify', 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['concurrent']);

};
