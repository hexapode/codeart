pg.updatePixels = function() {
  if (pg.pixels.length) {
    var pxl = ctx.getImageData(0,0,WIDTH, HEIGHT);
    var pxlData = pxl.data;
    for (var i = 0; i < pg.pixels.length; i++) {
      var p = pg.pixels[i];
      pxlData[i * 4] = p.r | 0;
      pxlData[i * 4 + 1] = p.g | 0;
      pxlData[i * 4 + 2] = p.b | 0;
      pxlData[i * 4 + 3] = p.a | 0;
    } 

    pxl.data = pxlData;
    ctx.putImageData(pxl,0, 0);
  }
}