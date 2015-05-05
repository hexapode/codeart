var a = 0;      
var b = 0.;  

function setup() {
  size(640, 360);
  stroke(255);
  frameRate(30);
}

function draw() {
  background(0);
  
  a = a + 1;
  b = b + 0.2; 
  line(a, 0, a, height/2);
  line(b, height/2, b, height);
  
  if(a > width) {
    a = 0;
  }
  if(b > width) {
    b = 0;
  }
}