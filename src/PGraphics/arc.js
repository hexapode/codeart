pg.arc = function(x,y,w,h,start,stop) {

  ctx.beginPath();
  if (Math.abs(start - stop) != Math.PI * 2) {
    ctx.moveTo(x,y);
    ctx.ellipse(x,y,w/2,h/2, 0, start, stop);
    ctx.lineTo(x,y);
  } else {
    ctx.ellipse(x,y,w/2,h/2, 0, start, stop);
  }
  if (CAN_STROKE) {
    ctx.stroke();
  }
  if (CAN_FILL) {
    ctx.fill();
  }
};


