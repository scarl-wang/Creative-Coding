// Sketch 2: travelling circle using lerp()

// --- setting up the variables ---

// origin point, where the circle is moving from
let scarl2pX = 0;
let scarl2pY = 0;
// destination point
let scarl2targetX = 0;
let scarl2targetY = 0;
// current position of the circle
let scarl2currentX = 200;
let scarl2currentY = 200;
// progress from origin to destination (0 to 1)
let scarl2lerpAmt = 0;
// custom speed
let scarl2speed = 0.01;
// perlin noise position
let scarl2noisePosition = 0;
// this is to store the second
let scarl2prevSecond = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  // create two diff noise values
  let noiseVal = noise(scarl2noisePosition);

  // using noise to create a smooth transitioning yellow background
  let colorVal = map(noiseVal, 0, 1, 40, 70);
  background(colorVal, 100, 100);

  // --- draw background pattern using cocentric circles ---

  // start from middle
  translate(200, 200);

  stroke(0);
  noFill();

  for (let i = 10; i < 800; i += 12) {
    strokeWeight(5-i/200);

    circle(0, 0, i);
  }

  // --- drawing the lerping circle ---

  // every second, move it to a random position
  if (scarl2prevSecond != second()) {
    // update the second tracker
    scarl2prevSecond = second();
    // generate a random position within the frame
    scarl2targetX = random(-200, 200);
    scarl2targetY = random(-200, 200);
    // reset lerp progress
    scarl2lerpAmt = 0;
    scarl2pX = scarl2currentX;
    scarl2pY = scarl2currentY;
  }

  // calculate current position using lerp
  scarl2currentX = lerp(scarl2pX, scarl2targetX, scarl2lerpAmt);
  scarl2currentY = lerp(scarl2pY, scarl2targetY, scarl2lerpAmt);

  // update lerp amount for next frame (keep it between 0-1)
  scarl2lerpAmt = constrain(scarl2lerpAmt + scarl2speed, 0, 1);

  // update noise position
  scarl2noisePosition += scarl2speed;

  // --- draw the travelling circle ---
  push();
  translate(scarl2currentX, scarl2currentY);

  stroke(0);
  strokeWeight(3);
  noFill();

  for (let i = 10; i < 700; i += 12) {
    circle(0, 0, i);
  }
  pop();
}
