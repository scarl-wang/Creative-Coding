/*
So far I have the basic elements:
ferris wheel - seconds
stars - minute
sky - hour

My next steps:
1. use the second() function for the rotation of the ferris wheel
2. find a way to mark a full rotation? like making one of the carriages different
3. make the stars refresh every hour instead of minute
4. find a better/simpler way to customize the nightsky, perhaps also giving it a smoother gradient/transition
5. add more visual elements (other attractions) if i have time
*/

let h = 200; // this is for the radius of the ferris wheel or height of the spokes
let angle = 0; // setting this up for the rotation speed of theanimation

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // using degrees so it's easier to calculate
}

function draw() {
  // --- background ---
  bgColor();

  // --- ground ---
  fill("rgba(0, 0, 0, 1)");
  rect(0, height - 130, width, 130);

  // --- stars ---
  stars();

  // --- ferris wheel ---
  push();
  translate(width / 2, height / 2); //moving it to the center
  ferrisWheel();
  pop(); //reset the translation

  // keeping track of time here (will delete)
  fill("green");
  textSize(24);
  text(hour() + ":" + minute(), 20, 20);
}

// ----- functions -----

// creating functions for each component so the draw function easier to read through

// --- ferris wheel ---
// the ferris wheel will represent the seconds as it rotates fully every minute
function ferrisWheel() {
  angle += 0.1; // setting rotation speed

  // next step: use the second() function for this element
  // map seconds to angle? (need to figure out frame rate)

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
    fill("rgba(255, 108, 49, 1)");
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
  let baseHeight = 250;
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

  // customizing the color so they are realistic to the time of the day
  // doing this manually for now but I want to find a way to simplify
  if (hr >= 0 && hr < 4) {
    // Deep night (navy blue)
    background("rgba(33, 28, 87, 1)");
  } else if (hr >= 4 && hr < 6) {
    background("rgba(10, 49, 132, 1)");
  } else if (hr >= 6 && hr < 9) {
    // Morning — blue getting brighter
    background("rgba(30, 96, 183, 1)");
  } else if (hr >= 9 && hr < 17) {
    // Daytime — bright sky blue
    background("rgba(0, 110, 255, 1)");
  } else if (hr >= 17 && hr < 19) {
    // Sunset — warm pink-orange tones
    background("rgba(208, 100, 130, 1)");
  } else if (hr >= 19 && hr < 21) {
    // Evening — darkening purple
    background("rgba(119, 63, 139, 1)");
  } else {
    // Late night — back to dark navy
    background("rgba(32, 37, 87, 1)");
  }
}

// ----- stars -----

function stars() {
  // number of stars corresponds to the current minute
  randomSeed(minute());
  // this prevents the starts from rerendering every frame
  // reference: https://p5js.org/reference/p5/randomSeed/
  let numStars = minute();
  noStroke();
  for (let i = 0; i < numStars; i++) {
    // random position
    let x = random(width); // fill width
    let y = random(height * 0.8); // limit it to upper half of canvas
    // random radius between 1 and 5
    let size = random(2, 5);
    // random opacity
    let opacity = random(180, 255);
    fill(255, 255, 255, opacity);
    ellipse(x, y, size);
  }
}
