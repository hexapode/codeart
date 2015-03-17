/**
 * Concoct!
 */

function PGraphics(canvas) {
  var ctx = canvas.getContext('2d');
  // set default colors
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000';
  var CAN_FILL = true;
  var CAN_STROKE = true;

  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;
  
  var SHAPE_MODE = 0;
  var SHAPE_VERTEX_COUNT = 0;
  var CURRENT_SHAPE = [];

  var pg = {};
