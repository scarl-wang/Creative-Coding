// Sketch 3: breathing circle on top of rotating stripes

// --- setting up the variables ---
let scarl3NoisePosition = 0;
let scarl3speed = 0.01;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  rectMode(CENTER);
  colorMode(HSB);
}

function draw() {
  // create two diff noise values
  let noiseVal1 = noise(scarl3NoisePosition);
  let noiseVal2 = noise(scarl3NoisePosition + 100);

  // using noise to create a smooth transitioning red background
  let colorVal = map(noiseVal1, 0, 1, 80, 100);
  background(0, 100, colorVal);

  // --- draw a dense striped pattern for background ---

  // rotate it smoothly using milli()
  let rotation = (millis() / 50000) * 360;

  for (let i = -300; i < 300; i += 6) {
    push();
    translate(200, 200);
    rotate(rotation);
    fill(0);
    rect(i, 0, 2, 600);
    pop();
  }

  // increment noise position for smooth animation
  scarl3NoisePosition += scarl3speed;

  // --- drawing the breathing circle ---

  // map noise value to a scale factor for the circle
  let scale = map(noiseVal2, 0, 1, 1, 2.5);

  push();

  translate(200, 200);

  stroke(0);
  noFill();

  // draw concentric circles (rings)
  // the stroke weight gets smaller as size increases
  for (let i = 10; i < 300; i += 8) {
    strokeWeight(6 - i / 60);
    circle(0, 0, i * scale);
  }
  pop();
}
