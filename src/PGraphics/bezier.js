  pg.bezier = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x2,y2,x3,y3,x4,y4);

    if (CAN_FILL) {
      ctx.fill();
    }
    if (CAN_STROKE) {
      ctx.stroke();
    } 
  };