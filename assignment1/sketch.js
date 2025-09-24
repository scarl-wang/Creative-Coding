//making a variable for base size
//so i can adjust the scale easily
let baseSize = 10;

//making a color palette with variables representing each color
let color1 = "rgb(255, 255, 128)"; //yellow (lightest)
let color2 = "rgba(255, 173, 80, 1)"; //orange
let color3 = "rgb(255, 85, 128)"; //pink
let color4 = "rgba(132, 0, 40, 1)"; //deep red
let color5 = "rgba(2, 0, 144, 0.4)"; //this one has transparency

function setup() {
  //creating a canvas
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // set background to a light grey
  background("rgba(227, 227, 227, 1)");

  // create shorthand for canvas width & height
  // this has to be after canvas is created
  let w = width;
  let h = height;

  // draw the large circle on the top left
  fill("rgba(255, 255, 128, .5)"); //custon rgba for transparency
  noStroke();
  circle(w * 0.3, h * 0.2, baseSize * 27);
  // solid color in the middle
  fill(color4);
  stroke(color2);
  strokeWeight(10);
  circle(w * 0.3, h * 0.2, baseSize * 18);

  // draw the smaller circle next to it
  fill(color5);
  stroke(color2);
  strokeWeight(5);
  circle(w * 0.55, h * 0.3, baseSize * 5);

  // draw the half circle top right
  strokeWeight(1);
  stroke("black");
  fill(color1);
  arc(w * 0.78, h * 0.2, baseSize * 9, baseSize * 9, PI, 0);

  // draw the rectangle under the circle (top right)
  // making a polygon so i can line it up with the arc
  fill(color4);
  beginShape();
  // top left vertex
  vertex(w * 0.65, h * 0.2);
  // top right vertex that touches the right edge of the arc
  vertex(w * 0.78 + (baseSize * 9) / 2, h * 0.2);
  vertex(w * 0.78 + (baseSize * 9) / 2, h * 0.2 + baseSize * 0.8);
  vertex(w * 0.65, h * 0.2 + baseSize * 0.8);
  endShape(CLOSE);

  // draw square at the top of the triangle
  noStroke();
  fill(color1);
  beginShape();
  vertex(w * 0.79, h * 0.28); //top left
  vertex(w * 0.86, h * 0.28); //top right
  vertex(w * 0.86, h * 0.33); //bottom right
  vertex(w * 0.79, h * 0.33); //bottom left: the vertex that joins the triangle
  endShape(CLOSE);

  // draw the large triangle in the middle
  noStroke();
  fill(color3);
  beginShape();
  vertex(w * 0.79, h * 0.33); //starting with the vertex that joins the rectangle
  vertex(w * 0.2, h * 0.9); //bottom left
  vertex(w * 0.53, h * 0.94); //bottom right
  endShape(CLOSE);

  // vertical line (top right)
  stroke("black");
  noFill();
  rect(w * 0.91, h * 0.1, baseSize * 0.4, baseSize * 13.5);

  // horizontal line (top right)
  // black stroke, transparent fill
  fill(color5);
  rect(w * 0.77, h * 0.24, baseSize * 9, baseSize * 0.3);

  // horizontal line 2 (on top of triangle)
  // no stroke, orange
  noStroke();
  fill(color2);
  rect(w * 0.68, h * 0.39, baseSize * 10.5, baseSize * 0.3);

  // vertical line (bottom right)
  stroke("black");
  fill(color4);
  rect(w * 0.9, h * 0.6, baseSize * 0.8, baseSize * 20);

  // horizontal line 3 (bottom right)
  fill("rgba(255, 173, 80, .7)"); //custom color here for transparency
  rect(w * 0.73, h * 0.67, baseSize * 11.7, baseSize * 0.8);

  // horizontal line 4 (bottom right)
  fill(color1);
  stroke("black");
  rect(w * 0.79, h * 0.71, baseSize * 8, baseSize / 5);

  // tiny dot (bottom right)
  fill(color3);
  strokeWeight(2);
  stroke(color2);
  circle(w * 0.87, h * 0.82, baseSize * 1.2);

  // curved arcs, top to bottom
  noFill();
  stroke("black");
  strokeWeight(1);
  // making them graduating smaller and flatter
  arc(w * 0.92, h * 0.417, w * 0.23, h * 0.13, PI, PI * 1.6);
  arc(w * 0.926, h * 0.418, w * 0.23, h * 0.118, PI, PI * 1.58);
  arc(w * 0.933, h * 0.419, w * 0.23, h * 0.105, PI, PI * 1.56);
  arc(w * 0.94, h * 0.42, w * 0.225, h * 0.094, PI, PI * 1.51);

  // straight line (on top of triangle)
  stroke("black");
  strokeWeight(4);
  line(w * 0.57, h * 0.38, w * 0.93, h * 0.46);

  // crown-shaped polygon (on top of triangle)
  stroke("black");
  strokeWeight(1);
  fill(color5);
  beginShape();
  vertex(w * 0.55, h * 0.405); //top left vertex
  vertex(w * 0.88, h * 0.51); //top right vertex
  vertex(w * 0.75, h * 0.6); //right peak
  vertex(w * 0.77, h * 0.5); //right dip
  vertex(w * 0.59, h * 0.62); //middle peak
  vertex(w * 0.62, h * 0.48); //left dip
  vertex(w * 0.5, h * 0.55); //left peak
  endShape(CLOSE);

  // make half-moon on the bottom left
  // using quadratic vertex
  stroke("black");
  strokeWeight(1);
  fill(color4);
  beginShape();
  //starting vertex
  vertex(w * 0.23, h * 0.4);
  //adding the curves
  quadraticVertex(w * 0.05, h * 0.7, w * 0.53, h * 0.8);
  quadraticVertex(w * 0.18, h * 0.7, w * 0.23, h * 0.4); //last coordinates are the same as the first
  endShape();

  // drawing the black 'c' shape
  fill(color5);
  stroke("black");
  strokeWeight(1);
  // using a polygon
  beginShape();
  vertex(w * 0.4, h * 0.6); //top left
  vertex(w * 0.52, h * 0.65); //top right 1
  vertex(w * 0.506, h * 0.664); //top right 2
  vertex(w * 0.41, h * 0.625); //middle top
  vertex(w * 0.39, h * 0.645); //middle bottom
  vertex(w * 0.485, h * 0.684); //bottom right 1
  vertex(w * 0.47, h * 0.7); //bottom right 2
  vertex(w * 0.345, h * 0.65); //bottom left
  endShape(CLOSE);

  // black rectangle next to black 'c' shape
  fill("rgba(0, 0, 0, 1)");
  stroke("black");
  strokeWeight(1);
  beginShape(); //drawing a polygon so the vertices line up
  vertex(w * 0.4, h * 0.6); //top right = top left
  vertex(w * 0.385, h * 0.595); //top left
  vertex(w * 0.33, h * 0.644); //bottom left
  vertex(w * 0.345, h * 0.65); //bottom right = bottom left
  endShape(CLOSE);

  // drawing the horn shapes on the right
  // using quadratic vertex
  stroke("black");
  strokeWeight(1);
  fill(color5);
  //shape 1
  beginShape();
  //arc 1
  vertex(w * 0.575, h * 0.67);
  quadraticVertex(w * 0.68, h * 0.67, w * 0.7, h * 0.62);
  //arc 2
  vertex(w * 0.7, h * 0.62); //this is the tip of the horn
  quadraticVertex(w * 0.69, h * 0.69, w * 0.57, h * 0.69);
  endShape();

  //horn shape 2
  beginShape();
  //arc 1
  vertex(w * 0.56, h * 0.72);
  quadraticVertex(w * 0.66, h * 0.72, w * 0.69, h * 0.68);
  //arc 2
  vertex(w * 0.69, h * 0.68); //this is the tip of the horn
  quadraticVertex(w * 0.67, h * 0.75, w * 0.55, h * 0.75);
  endShape();

  // bottom line
  strokeWeight(7);
  line(w * 0.1, h * 0.89, w * 0.66, h * 0.95);
}
