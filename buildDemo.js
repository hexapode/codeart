var fs = require('fs');


var DEMO_FILES = fs.readdirSync('./demo-src');
var output = fs.readFileSync('./demo/demo_header.html');



for (var i = 0; i < DEMO_FILES.length; ++i) {
   if (DEMO_FILES[i][0] !== '.') {
    var templateDemo = fs.readFileSync('./demo/demo_canvas.html');
    var code = fs.readFileSync('./demo-src/' + DEMO_FILES[i]);
    templateDemo = templateDemo.toString().replace('<% code %>', code);
    templateDemo = templateDemo.toString().replace('<% code %>', code);
    templateDemo = templateDemo.toString().replace('<% title %>', DEMO_FILES[i].replace('.js', ''));
    output += templateDemo;
  }
}

output += fs.readFileSync('./demo/demo_footer.html');

fs.writeFileSync('./build/demo.html', output);