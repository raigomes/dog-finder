module.exports = function(grunt) {

    grunt.initConfig({
      less: {
        default: {
            options: {
                paths: ['src/styles/src'],
                plugins: [
                    new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                ]
            },
            files: {
                'src/styles/main.css': 'src/styles/main.less'
            }
        }
      },
      cssmin: {
        target: {
            files: [{
                expand: true,
                cwd: 'src/styles',
                src: ['*.css', '!*.min.css'],
                dest: 'src/styles',
                ext: '.min.css'
            }]
        }
      },
      uglify: {
        default: {
            files: {
                'src/scripts/main.min.js': 'src/scripts/main.js'
            }
        }
      },
      watch: {
        defaultStyles: {
            files: ['src/styles/**/*.less'],
            tasks: ['less', 'cssmin'],
            options: {
                nospawn: true
            }
        }
      },
      'gh-pages': {
        options: {
          base: 'dist'
        },
        src: ['src/**']
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['less', 'cssmin', 'watch']);
    grunt.registerTask('build', ['less', 'cssmin', 'uglify', 'gh-pages']);
  
  };