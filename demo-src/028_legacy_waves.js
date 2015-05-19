/**
  FROM http://www.openprocessing.org/sketch/101445 by Kostas Sfikas
  !!! TAGGED AS LEGACY
*/

//waves addition
//four equal waves exist, one on each corner of the screen.
 
int w = 400;
int h = 400;
/*
// float[][] blocks = new float[w][h];
*/
var blocks = [];
for (var i = 0; i < w; ++i) {
  blocks[i] = [];
  for (var j = 0; j < h; ++j) {
    blocks[i][j] = 0;
  }
}
/*
color c;
*/
var c;
float time = 0;
 
void setup() {
  size(400,400,P2D);
  frameRate(30);
}
 
void draw() {
  time+=0.01;
  loadPixels();
  drawMap();
  for(int i = 0; i < w; i++) {     //columns
    for(int j = 0; j < h; j++) {   //rows
      c = color(blocks[i][j]);     //pass point value to color value
      int x = i + (j * h);         //convert from 2D array to 1D array
      pixels[x] = c;
    }
  }
  updatePixels();
}
 
void drawMap(){
  for(int i=0;w > i;i++){
    for(int j=0;h > j;j++){
      float sc = 11+4*sin(time);           //scale of frequency
      float a = sin(dist(0,0,i,j)/sc);     //wave 1
      float b = sin(dist(0,h,i,j)/sc);     //wave 2
      float c = sin(dist(w,h,i,j)/sc);     //wave 3
      float d = sin(dist(w,0,i,j)/sc);     //wave 4
      float sum = a*b*c*d;                 //multiply all waves
      blocks[i][j] = 127.5 + 127.5 * sum;  //value from 0 to 255
    }
  }
}
