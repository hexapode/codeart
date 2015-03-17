

 pg.background = function (r) {

    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1];
      b = arguments[2];
    }
 
    var c = ctx.fillStyle;
    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    ctx.fillStyle = c;
  };