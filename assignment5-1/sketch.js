// For this assignment, I want to play with the Moire effect,
// using simple graphics and movements to create very dynamic optical illusions

// Sketch 1: two overlapping radial circles

let scarl1noisePosition = 0;
let scarl1speed = 0.01;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  // create two diff noise values
  let noiseVal1 = noise(scarl1noisePosition);
  let noiseVal2 = noise(scarl1noisePosition + 100);

  // using noise to create a smooth transitioning blue background
  let colorVal = map(noiseVal1, 0, 1, 190, 240);
  background(colorVal, 100, 100);

  // increment noise offset for smooth animation
  scarl1noisePosition += scarl1speed;

  // ---- drawing the circles ----

  // creating a smooth rotation for the circles
  let rotation = (millis() / 100000) * 360;

  // using noise() to create a subtle movement along the x axis
  // using two different noise positions so the movements aren't synced
  let movement1 = map(noiseVal1, 0, 1, -20, 20);
  let movement2 = map(noiseVal2, 0, 1, -20, 20);

  // draw the left circle
  drawCircle(170 + movement1, 200, 260, rotation);

  // draw the right circle
  drawCircle(230 + movement2, 200, 260, -rotation);
}

// since the circles are identical, I created a function to draw them
function drawCircle(x, y, r, rotation) {
  push();
  translate(x, y);

  for (let i = 0; i < 360; i += 2) {
    push();
    // rotate the circle smoothly
    rotate(i + rotation);
    noStroke();
    fill(0, 0, 0);
    triangle(0, 0, -2, -r, 2, -r);
    pop();
  }
  pop();
}
