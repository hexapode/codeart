  pg.createGraphics = function(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    //document.body.appendChild(canvas);
    var pg = PGraphics(canvas);
    return pg;
  };