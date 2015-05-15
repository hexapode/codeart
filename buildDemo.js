var fs = require('fs');


var DEMO_FILES = fs.readdirSync('./demo-src');
var header = fs.readFileSync('./demo/demo_header.html');
var footer = fs.readFileSync('./demo/demo_footer.html');

var output = header;

/**
* generate the master demo AND the sub demo.
*/
for (var i = 0; i < DEMO_FILES.length; ++i) {
   if (DEMO_FILES[i][0] !== '.') {
    var templateDemo = fs.readFileSync('./demo/demo_canvas.html');
    var code = fs.readFileSync('./demo-src/' + DEMO_FILES[i]);
    templateDemo = templateDemo.toString().replace('<% code %>', code);
    templateDemo = templateDemo.toString().replace('<% code %>', code);
    templateDemo = templateDemo.toString().replace('<% title %>', DEMO_FILES[i].replace('.js', ''));
    output += templateDemo;
    fs.writeFileSync('./build/demo-' + DEMO_FILES[i].replace('.js', '') + '.html', header + templateDemo + footer);
  }
}

output += footer

fs.writeFileSync('./build/demo.html', output);