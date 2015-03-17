pg.line = function(x,y,x2,y2) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x2, y2);
  if (CAN_STROKE) {
    ctx.stroke();
  }
  if (CAN_FILL) {
    ctx.fill();
  }
};