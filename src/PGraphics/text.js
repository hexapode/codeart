


pg.text = function(text, x, y) {
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; ++i) {
    if (CAN_STROKE) {
      ctx.strokeText(lines[i],x,y + i * 20);
    }
    if (CAN_FILL) {
      ctx.fillText(lines[i],x,y + i * 20);
    }
  }
}