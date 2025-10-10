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
5. add more visual elements (other attractions) if i have time
*/

let angle = 0; // setting this up for the rotation speed of theanimation

let prevHour = 0;
let prevMin = 0; // track when to add a new star

let starsX = []; // create an array for stars x coordinate
let starsY = []; // create an array for stars y coordinate
let starsSize = []; // array for stars size
let starsOpacity = []; // array for stars opacity

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // using degrees so it's easier to calculate
  colorMode(HSL); // using HSL so it's easier to adjust the hue

  //initStars(); // set up the stars
}

function draw() {
  // --- background ---
  bgColor();

  // --- ground ---
  fill("rgba(0, 0, 0, 1)");
  rect(0, height * 0.85, width, 130);

  // --- stars ---
  stars();

  // --- ferris wheel ---
  push();
  translate(width / 2, height / 2); //moving it to the center
  ferrisWheel(height * 0.4, 200);
  pop(); //reset the translation

  // keeping track of time here (will delete)
  fill("green");
  textSize(24);
  text(hour() + ":" + minute() + ":" + second(), 20, 20);
}

// ----- functions -----

// creating functions for each component so the draw function easier to read through

// --- ferris wheel ---
// the ferris wheel will represent the seconds as it rotates fully every minute
function ferrisWheel(baseHeight, h) {
  // h is the size of the spokes

  // mapping angle to second() results in a very glitchy animation
  // so I'm using millis() instead
  // 60000 ms = 1 min, 360 degrees per min
  angle = (millis() / 60000) * 360;

  // thin spokes
  for (let x = 0; x < 360; x += 6) {
    push(); //save the current transform

    rotate(x + angle); //rotate this section
    //drawing a section to be repeated
    //these are the radial pillars
    strokeWeight(2);
    stroke("black");
    line(0, 0, 0, h);
    pop(); // reset
  }

  // spokes + carriages
  // using another for loop since they are repeated at diff frequencies
  for (let x = 0; x < 360; x += 30) {
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
    // flickering lights that shuts off every minute
    if (second() == 0) {
      fill(30, 100, 0);
    } else {
      let flicker = random(0.8, 1); // random brightness
      fill(30, 100, 50 * flicker);
      rect(5, -5, 15, 15);
      rect(-20, -5, 15, 15);
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

  // outer rings
  noFill();
  ellipse(0, 0, 50);
  stroke("black");
  strokeWeight(5);
  ellipse(0, 0, 80);
  ellipse(0, 0, 360);
  ellipse(0, 0, 400);

  // base
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
  // the hue values for those colors are between 210 - 360 (0)
  // but since I still want it to cycle, I'll map it to the
  // difference between the extreme and create a conditional
  if (hr < 12) {
    h = map(hr, 0, 11, 220, 360);
    //  from 0–11 hours, go from red (360) to blue (220)
  } else {
    h = map(hr, 12, 23, 360, 220);
    //  from 12-23 hours, go from blue to red
  }

  for (let y = 0; y < height; y++) {
    // vertical brightness gradient
    let b = map(y, 0, height, 10, 50);
    stroke(h, 50, b);
    line(0, y, width, y);
  }
}

// ----- stars -----
// number of stars corresponds to the current minute

// function initStars() {
//   // set the star number according to current minute
//   // fill the arrays with one star per current minute
//   let currentMin = minute();
//   for (let i = 0; i < currentMin; i++) {
//     starsX.push(random(width));
//     starsY.push(random(height * 0.9));
//     starsSize.push(random(2, 8));
//     starsOpacity.push(random(0.5, 1));
//   }
//   prevMin = currentMin;
// }

function stars() {
  // every minute, add a star to the array
  // reference: https://p5js.org/reference/p5/Array/
  // refresh every hour

  // reset the sky by clearing the arraysevery hour
  if (prevHour != hour()) {
    starsX = [];
    starsY = [];
    starsSize = [];
    starsOpacity = [];
    prevHour = hour();
  }

  // add a star per minute
  if (prevMin != minute()) {
    starsX.push(random(width));
    starsY.push(random(height * 0.8));
    starsSize.push(random(0, 10));
    starsOpacity.push(random(0.1, 1));
    prevMin = minute();
  }

  // draw all existing stars
  noStroke();
  for (let i = 0; i < starsX.length; i++) {
    fill(0, 100, 100, starsOpacity[i]);
    ellipse(starsX[i], starsY[i], starsSize[i]);
  }
}

//resize the window automatically
//reference: https://p5js.org/reference/p5/resizeCanvas/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
