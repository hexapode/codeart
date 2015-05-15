/**
 * Concoct!
 */

function PGraphics(canvas) {
  var ctx = canvas.getContext('2d');

  var CAN_FILL = true;
  var CAN_STROKE = true;

  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;
  
  var SHAPE_MODE = 0;
  var SHAPE_VERTEX_COUNT = 0;
  var CURRENT_SHAPE = [];

  var pg = {};


  // set default colors
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
