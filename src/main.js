/*
  Main
 */

function startCodeArt() {
  var canvasList = document.querySelectorAll('canvas');

  
  for (var i = 0; i < canvasList.length; i++) {
    if (canvasList[i].getAttribute("codeart")) {
      new CodeArt(canvasList[i]);
    }
  }
}

