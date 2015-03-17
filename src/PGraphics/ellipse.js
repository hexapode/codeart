  pg.ellipse = function(x,y,w,h) {

    ctx.beginPath();
    ctx.ellipse(x,y,w/2,h/2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };