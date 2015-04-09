// This is a prototype like language
// to use on arty project.
// Unlike prototype however this is
// untyped. You just have to wrote
// some instruction inside a canvas :)
  
// we set size of experience
size(640, 300);

// we set a background color
background(243);

// we do no want stroke
noStroke();

// as in processing JS draw define 
// a loop
function draw() {
  // we draw a lot of rectangle
  for (i = 0; i <= 32; ++i) {
    for (j = 0; j < 15; ++j) {
    // set Fill color
    fill(((i * 5 + j * 15 + frameCount) % 255));
    rect(i * 20 + 2, j * 20 + 2,15,15); 
   }
 }
}