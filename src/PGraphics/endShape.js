
pg.endShape = function(shouldClose) {
  if (CURRENT_SHAPE.length == 0) {
    return;
  }
  
  // standart rendering mode LINES 2
  if (!SHAPE_MODE || SHAPE_MODE === 2) {
    
    ctx.moveTo(CURRENT_SHAPE[0][0], CURRENT_SHAPE[0][1]);
    for (var i = 1; i < CURRENT_SHAPE.length; ++i) {
      ctx.lineTo(CURRENT_SHAPE[i][0], CURRENT_SHAPE[i][1]);
    }
    if (shouldClose) {
      ctx.lineTo(CURRENT_SHAPE[0][0], CURRENT_SHAPE[0][1]);
    }

   
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }

  // POINTS : 1
  if (SHAPE_MODE === 1) {
    
    for (var i = 1; i < CURRENT_SHAPE.length; ++i) {
      pg.point(CURRENT_SHAPE[0][0], CURRENT_SHAPE[0][1]);
    }
  
  }

  // TRIANGLES       : '3'
  //TRIANGLE_FAN    : '4'
  
  // TRIANGLE_STRIP  : '5'
  if (SHAPE_MODE === 5) {
    for (var i = 0; i + 2 < CURRENT_SHAPE.length; i++) {
      ctx.moveTo(CURRENT_SHAPE[i][0], CURRENT_SHAPE[i][1]);
      ctx.lineTo(CURRENT_SHAPE[i + 1][0], CURRENT_SHAPE[i + 1][1]);
      ctx.lineTo(CURRENT_SHAPE[i + 2][0], CURRENT_SHAPE[i + 2][1]);
      ctx.lineTo(CURRENT_SHAPE[i][0], CURRENT_SHAPE[i][1]);
    }
    if (CAN_FILL) {
      ctx.fill();
    }
    if (CAN_STROKE) {
      ctx.stroke();
    }

  }
};