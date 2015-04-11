function setup() {
  size(640, 360);
}

function draw() {
  background(240);
  
  fill(123,237,83);
  stroke(89);
  pushMatrix();
  translate(width * 0.2, height * 0.5);
  rotate(frameCount / 200.0);
  star(0, 0, 5, 70, 3); 
  popMatrix();
  
  pushMatrix();
  translate(width*0.5, height*0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, 100, 40); 
  popMatrix();
  
  pushMatrix();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  star(0, 0, 30, 70, 5); 
  popMatrix();
}

 // Let's mix some processing! :D
void star(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    letsDraw(a, angle, halfAngle, x, y, radius1, radius2);
  }
  endShape(CLOSE);
}

function letsDraw(a, angle, halfAngle, x, y, radius1, radius2) {
  var sx = x + cos(a) * radius2;
  var sy = y + sin(a) * radius2;
  vertex(sx, sy);
  sx = x + cos(a+halfAngle) * radius1;
  sy = y + sin(a+halfAngle) * radius1;
  vertex(sx, sy);
}