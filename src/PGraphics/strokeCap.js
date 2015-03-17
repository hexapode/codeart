/*
  SQUARE          : '9',
  ROUND           : '10',
  PROJECT         : '11',
*/

pg.strokeCap = function(type) {

  if (type === 9) {
   ctx.lineCap = 'round';   
  }
  if (type === 10) {
   ctx.lineCap = 'butt';   
  }
  if (type === 11) {
   ctx.lineCap = 'square';   
  }
};