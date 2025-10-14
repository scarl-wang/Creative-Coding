/*
To do
1. use the second() function for the rotation of the ferris wheel 
    - done with millis()
2. find a way to mark a full rotation? like making one of the carriages different
    - done with flickering lights
3. make the stars refresh every hour instead of minute
    - need help
4. find a better/simpler way to customize the nightsky, perhaps also giving it a smoother gradient/transition
    - done
*/

let angle = 0; // setting this up for the rotation speed of theanimation
let flicker; // setting this up for ferris wheel flicker
let stars = []; // creating an array to keep track of the stars
let groundHeight = []; // creating an array to keep trak of the ground

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // using degrees so it's easier to calculate
  colorMode(HSL); // using HSL so it's easier to adjust the hue

  // creating 60 possible starts that reveal themselves over an hour
  for (let i = 0; i < 60; i++) {
    stars[i] = new Star();
  }

  // creating a textured ground by randomizing the height
  // using an array to prevent it from resetting every frame
  fill("rgba(0, 0, 0, 1)");
  for (i = 0; i < width; i++) {
    groundHeight.push(random(height * 0.83, height * 0.86));
  }
}

function draw() {
  // --- background ---
  // calling the bg function
  bgColor();

  // --- stars ---
  // calling the display method to display the number of stars
  // according to the current minute
  for (let i = 0; i < minute(); i++) {
    stars[i].display();
  }

  // --- ground ---
  // rendering the ground with the random heights stored in the array
  noStroke();
  fill("black");
  for (i = 0; i < width; i++) {
    rect(i, groundHeight[i], 10, 150);
  }

  // --- ferris wheel ---
  push();
  translate(width / 2, height / 2); // moving it to the center
  ferrisWheel(height * 0.4, 200);
  pop(); //reset the translation

  // keeping track of time here (will delete)
  // fill("green");
  // textSize(24);
  // text(hour() + ":" + minute() + ":" + second(), 20, 20);
}

// ----- functions -----

// creating functions for each component so the draw function easier to read through

// --- ferris wheel ---
// the ferris wheel will represent the seconds as it rotates fully every minute
// the lights in the carriages flicker every minute
function ferrisWheel(baseHeight, h) {
  // parameters: height of the base; height of the spokes

  // mapping angle to second() results in a very glitchy animation
  // so I'm using millis() instead
  // 60000 ms = 1 min, 360 degrees per min
  angle = (millis() / 60000) * 360;

  // drawing the thin spokes using a for loop since it's repeating in a radial pattern
  for (let x = 0; x < 360; x += 6) {
    // 360/6=60 spokes
    push();

    rotate(x + angle); //rotate this section
    // drawing a section to be repeated
    // these are the radial pillars
    strokeWeight(2);
    stroke("black");
    line(0, 0, 0, h);
    pop(); // reset
  }

  // spokes + carriages
  // using another for loop since they are repeated at diff frequencies
  for (let x = 0; x < 360; x += 30) {
    //360/30=12 carriages
    push();
    rotate(x + angle);

    // triangular spokes
    noStroke();
    fill("rgba(0, 0, 0, 1)");
    triangle(-8, 0, 0, h, 8, 0);

    // carriages
    // using another set of push() and pop() to keep the carriages upright
    // regardless of their rotation
    push();
    translate(0, -h); // move center to end of spoke
    rotate(-(x + angle)); // cancel the wheel’s rotation
    // base: black
    fill("black");
    ellipse(0, 0, 40);
    // windows: orange
    // the lights flicker off every full minute on the clock
    if (second() == 0) {
      fill(30, 100, 0);
    } else {
      flicker = random(0.8, 1);
      // randomized brightness to create the flickering effect
      fill(30, 100, 50 * flicker);
    }
    rect(5, -5, 15, 15);
    rect(-20, -5, 15, 15);
    // outline: black
    strokeWeight(4);
    stroke("black");
    noFill();
    ellipse(0, 0, 40);
    pop(); // reset

    pop();
  }

  // drawing the outer rings
  noFill();
  ellipse(0, 0, 50);
  stroke("black");
  strokeWeight(5);
  ellipse(0, 0, 80);
  ellipse(0, 0, 360);
  ellipse(0, 0, 400);

  // drawing the base using a custom shape
  noStroke();
  fill("black");
  beginShape();
  vertex(0, 0);
  vertex(-80, baseHeight);
  vertex(-50, baseHeight);
  vertex(0, 30);
  vertex(50, baseHeight);
  vertex(80, baseHeight);
  vertex(0, 0); //closing the shape
  endShape();
}

// --- background ---
// the nightsky changes color according to the hour

function bgColor() {
  let hr = hour();
  // instead of a realistic day/night cycle, I want to create a
  // stylized, moody night sky that transitions from red to blue
  // the hue values for those colors are between 210 - 360
  // but since I still want it to cycle, I'll map it to the
  // difference between the extremes and create a conditional
  if (hr < 12) {
    h = map(hr, 0, 11, 220, 360);
    // from 0–11 hours, go from red (360) to blue (220)
  } else {
    h = map(hr, 12, 23, 360, 220);
    // from 12-23 hours, go from blue to red
  }

  for (let y = 0; y < height; y++) {
    // vertical brightness gradient
    let b = map(y, 0, height, 10, 50);
    stroke(h, 50, b);
    line(0, y, width, y);
  }
}

// ----- stars -----
// the number of stars corresponds to the current minute
// creating a class to better keep track of their position
class Star {
  constructor() {
    // setting a random position and opacity for each start that's created
    this.x = random(width);
    this.y = random(height * 0.85);
    this.opacity = random(0.1, 0.8);
  }

  // draw each star at its randomized position when this method is called
  display() {
    noStroke();
    fill(0, 100, 100, this.opacity);
    circle(this.x, this.y, 10);
  }
}

//resize the window automatically
//reference: https://p5js.org/reference/p5/resizeCanvas/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
