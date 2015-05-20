var fs = require('fs');


var allDocs = [];

var docsList = fs.readdirSync('./doc-src');

function parseDocs() {
  for (var i = 0; i < docsList.length; ++i) {
    var doc = require('./doc-src/' + docsList[i]);
    allDocs.push(doc);
  }
}

function generateSimpleDocs() {
  for (var i = 0; i < allDocs.length; ++i) {
    var doc = allDocs[i];
    console.log(doc);
    console.log(doc.name);

    var markdown = getDocFromTemplate('simpleFnDoc', doc);

    fs.writeFileSync('./doc/' + doc.name + '.md', markdown);
  }
}

function getDocFromTemplate(templateName, params) {
  var tplContent = fs.readFileSync('./doc-tpl/' + templateName + '.tpl').toString();

  for (var key in params) {
    var rg = new RegExp('<' + key + '>','g');
    tplContent = tplContent.replace(rg, params[key]);
  }

  return tplContent;
}

parseDocs();
// generate all do pages
generateSimpleDocs();