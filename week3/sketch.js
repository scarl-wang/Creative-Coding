// variable declaration:
// let is a keyword that allows you to declare a variable
let circleSize = 125; // variable to store circle size

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // a grayscale color is denoted as a number 0-255
  // an rgb color is denoted as 3 numbers
  // background(127,0,200);

  // we can use the name of a color like 'black' or 'blue'
  // background('aqua');

  // we can also format rgb colors as strings;
  // background('rgb(0,0,0)');

  background("rgba(245, 255, 167, 1)");

  fill("rgba(255, 161, 161, 1)");
  stroke("rgba(255, 90, 90, 1)");

  strokeWeight(5);
  //noStroke(); // gets rid of the stroke completely
  //noFill(); // gets rid of the fill completely

  circle(200, 200, 180);

  // setting a new fill for my rectangle
  stroke("rgba(0, 128, 255, 1)");
  fill("rgba(0, 183, 255, 1)");

  // x coord of top left, y coord of top left, width, height
  rect(100, 180, 100, 15);

  // ellipse takes 4 parameters:
  // x coord of center, y coord of center, width & height
  ellipse(270, 190, 10, 20);

  // line: connects two coords: x1,y1,x2,y2
  line(260, 230, 280, 230);

  // to draw complex polygons
  // create a beginShape(); and an endShape()
  // place vertex(x,y) in between

  beginShape();
  vertex(100, 200);
  vertex(200, 200);
  vertex(200, 250);
  endShape(CLOSE); // CLOSE parameter closes the polygon

  // circle responsive to canvas size
  noStroke();
  fill("rgba(0, 204, 255, 0.57)");
  circle(width / 2, height * 0.75, width / 3);

  // arcs are like ellipses except they have 2 extra parameters
  // START and END, which are provided in RADIAN formats
  arc(width / 2, height * 0.75, 100, 100, 0, PI / 3);

  fill("rgba(255, 89, 0, 0.42)");
  // ellipse that follows the mouse position
  ellipse(mouseX, mouseY, 50 + mouseY / 4, 50 + mouseX / 4);
}
