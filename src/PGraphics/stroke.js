pg.stroke = function(r) {
  CAN_STROKE = true;
  r = r | 0;
  
  var g = r;
  var b = r;
  var a = 1.0;

  if (r > 255) {
    b = r & 0x0000ff;
    g = r & 0x00ff00;
    r = r & 0xff0000;
  }

  if (arguments.length == 2) {
    a = 1/ 255 * arguments[1];
  }
  if (arguments.length == 3) {
    g = arguments[1] | 0;
    b = arguments[2] | 0;
  }
  if (arguments.length == 4) {
    g = arguments[1] | 0;
    b = arguments[2] | 0;
    a = 1 / 255 * arguments[3];
  }
  var color = 'rgba(' + r +',' + g + ',' + b + ', ' + a + ')';

  ctx.strokeStyle = color;

};