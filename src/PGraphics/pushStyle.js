
pg.___styleStack = [];

pg.pushStyle = function() {
  pg.___styleStack.push({
    stroke : ctx.strokeStyle,
    fill : ctx.fillStyle,
    lineWidth : ctx.lineWidth,
    lineCap : ctx.lineCap
  })
}

pg.popStyle = function() {
  if (!pg.___styleStack.length) {
    return;
  }

  var style = pg.___styleStack.pop();
  ctx.strokeStyle = style.stroke;
  ctx.fillStyle = style.fill;
  ctx.lineWidth = style.lineWidth;
  ctx.lineCap = style.lineCap;
}