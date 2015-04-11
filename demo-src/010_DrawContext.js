var stamp;
function setup() {
  size(640, 360);
  stamp = createGraphics(400, 200);
}

function draw() {
  fill(0, 12);
  rect(0, 0, width, height);
  fill(255);
  noStroke();
  ellipse(mouseX, mouseY, 60, 60);
  
  stamp.beginDraw();
  stamp.background(51);
  stamp.noFill();
  stamp.stroke(255);
  stamp.ellipse(mouseX-120, mouseY-60, 60, 60);
  stamp.endDraw();
  
  // Draw the offscreen buffer to the screen with image() 
  image(stamp, 120, 60);
}