/**
 * Grunt!
 */
var fs = require('fs');
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');

  var PG_FILES = fs.readdirSync('./src/PGraphics');

  var FILES = ['./src/pgraphics_head.js'];
  for (var i = 0; i < PG_FILES.length; ++i) {
    FILES.push('./src/PGraphics/' + PG_FILES[i])
  }
  FILES.push('./src/pgraphics_footer.js');

  var COMMONS_FILES = fs.readdirSync('./src/commons');
  for (var i = 0; i < COMMONS_FILES.length; ++i) {
    FILES.push('./src/commons/' + COMMONS_FILES[i])
  }

  FILES.push('./src/pcompiler.js');
  FILES.push('./src/core.js');
  FILES.push('./src/main.js');

  console.log(FILES);

  grunt.initConfig({
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: FILES,
        dest: 'build/codeart.js',
      }
    },
  });

  grunt.registerTask('default', ['concat']);
}