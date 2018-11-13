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
      copy: {
        main: {
            files: [
                {expand: true, cwd: 'src', src: ['images/**'], dest: 'dist', filter: 'isFile'},
                {expand: true, cwd: 'src', src: ['json/**'], dest: 'dist', filter: 'isFile'},
                {expand: true, cwd: 'src', src: ['scripts/**'], dest: 'dist', filter: 'isFile'},
                {expand: true, cwd: 'src', src: ['index.html'], dest: 'dist', filter: 'isFile'}
            ]
        }
      },
      cssmin: {
        target: {
            files: [{
                expand: true,
                cwd: 'src/styles',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/styles',
                ext: '.min.css'
            }]
        }
      },
      uglify: {
        default: {
            files: {
                'dist/scripts/main.min.js': ['src/scripts/main.js']
            }
        }
      },
      watch: {
        defaultStyles: {
            files: ['src/styles/**/*.less', 'src/scripts/*.js'],
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
        src: ['**']
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['less', 'cssmin', 'watch']);
    grunt.registerTask('build', ['less', 'copy', 'cssmin', 'gh-pages']);
  
  };