 

  pg.rect = function(x,y,w,h) {
    if (pg.__CURRENT_RECTMODE == enums.CORNER) {
      if (CAN_STROKE) {
        ctx.strokeRect(x,y,w,h);
      }
      if (CAN_FILL) {
        ctx.fillRect(x,y,w,h);
      }
    }
    else if (pg.__CURRENT_RECTMODE == enums.CORNERS) {
      if (CAN_STROKE) {
        ctx.strokeRect(x, y, w-x, h-y);
      }
      if (CAN_FILL) {
        ctx.fillRect(x, y, w - x, h - y);
      }
    } 
    else if (pg.__CURRENT_RECTMODE == enums.CENTER) {
      if (CAN_STROKE) {
        ctx.strokeRect(x - w / 2, y - h / 2, w , h);
      }
      if (CAN_FILL) {
        ctx.fillRect(x - w / 2, y - h / 2, w , h);
      }
    } 
    else if (pg.__CURRENT_RECTMODE == enums.RADIUS) {
      if (CAN_STROKE) {
        ctx.strokeRect(x - w , y - h,w * 2 , h * 2);
      }
      if (CAN_FILL) {
        ctx.fillRect(x - w , y - h,w * 2 , h * 2);
      }
    } 
  };