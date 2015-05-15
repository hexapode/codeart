
size(640, 360);
background(200);

ellipse(0, 50, 33, 33);  // Left circle

pushStyle();  // Start a new style
strokeWeight(10);
fill(204, 153, 0);
ellipse(50, 50, 33, 33);  // Middle circle
popStyle();  // Restore original style

ellipse(100, 50, 33, 33);  // Right circle



ellipse(0, 150, 33, 33);  // Left circle

pushStyle();  // Start a new style
strokeWeight(10);
fill(204, 253, 0);
ellipse(33, 150, 33, 33);  // Left-middle circle

pushStyle();  // Start another new style
stroke(0, 202, 153);
ellipse(66, 150, 33, 33);  // Right-middle circle
popStyle();  // Restore previous style

popStyle();  // Restore original style

ellipse(100, 150, 33, 33);  // Right circle