var distances;
var maxDistance;
var spacer;

function setup() {
  size(640, 360);
  maxDistance = dist(width/2, height/2, width, height);
  distances = [];
  for (var y = 0; y < height; y++) {
    distances[y] = [];
    for (var x = 0; x < width; x++) {
      var distance = dist(width/2, height/2, x, y);
      distances[y][x] = distance/maxDistance * 255;
    }
  }
  spacer = 10;
  noLoop();  // Run once and stop
}

function draw() {
  background(0);
  // This embedded loop skips over values in the arrays based on
  // the spacer variable, so there are more values in the array
  // than are drawn here. Change the value of the spacer variable
  // to change the density of the points
  for (var y = 0; y < height; y += spacer) {
    for (var x = 0; x < width; x += spacer) {
      stroke(distances[y][x]);
      point(x + spacer/2, y + spacer/2);
    }
  }
}