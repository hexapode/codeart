/**
  load pixels
*/

pg.loadPixels = function() {
 // pg.pixels = 

 var pxl = ctx.getImageData(0,0,WIDTH, HEIGHT);
 var pxlData = pxl.data;

 for (var i = 0; i < pxlData.length; i += 4) {
    pg.pixels[i / 4] = {
      r : pxlData[i],
      g : pxlData[i + 1],
      b : pxlData[i + 2],
      a : pxlData[i + 4]
    };
 } 

};