
pg.ellipse = function(x,y,w,h) {
  if (pg.__CURRENT_ELLIPSEMODE == enums.CORNER) {
    ctx.beginPath();
    ctx.ellipse(x,y,w/2,h/2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
  else if (pg.__CURRENT_ELLIPSEMODE == enums.RADIUS) {
    ctx.beginPath();
    ctx.ellipse(x - w,y - h, w * 2, h * 2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
  else if (pg.__CURRENT_ELLIPSEMODE == enums.CENTER) {
    ctx.beginPath();
    ctx.ellipse(x - w / 2,y - h / 2, w, h, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
  else if (pg.__CURRENT_ELLIPSEMODE == enums.CORNERS) {
    ctx.beginPath();
    ctx.ellipse(x, y, w - x, h - y, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
};