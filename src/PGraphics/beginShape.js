pg.beginShape = function(MODE) {
  SHAPE_VERTEX_COUNT = 0;
  SHAPE_MODE = MODE;
  CURRENT_SHAPE = [];
  ctx.beginPath();
};