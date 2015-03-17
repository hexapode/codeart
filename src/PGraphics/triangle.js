pg.triangle = function (x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x3,y3);
  ctx.lineTo(x1,y1);
  if (CAN_STROKE) {
    ctx.stroke();
  }
  if (CAN_FILL) {
    ctx.fill();
  }
};