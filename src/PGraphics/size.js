/**
  Define size of canvas

  size(width, height)
  size(FULL_SCREEN)
*/

pg.size = function (w, h) {

  if (arguments.length === 1 && arguments[0] == enums.FULL_SCREEN) {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
  }

  canvas.width = w;
  canvas.height = h;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  WIDTH = w;
  HEIGHT = h;

  // set default colors
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
};