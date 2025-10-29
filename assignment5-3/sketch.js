let noiseOffset = 0; // for smooth noise changes

function setup() {
  createCanvas(400, 400);
  background("yellow");
  angleMode(DEGREES);
}

function draw() {
  background("orange");

  // create striped pattern for background
  for (let i = 0; i < 400; i += 6) {
    fill(0);
    rect(i, 0, 3, 400);
  }

  // Get noise value (0 to 1) and map it to a scale factor
  let noiseVal = noise(noiseOffset);
  let scale = map(noiseVal, 0, 1, 0.3, 2.5); // scale between 0.3x and 2x

  // Increment noise offset for smooth animation
  noiseOffset += 0.01;

  drawScreen(scale);
}

function drawScreen(scale) {
  push();

  translate(200, 200);

  // Draw concentric circles (rings)
  stroke(0);
  strokeWeight(3);
  noFill();

  for (let radius = 10; radius < 200; radius += 8) {
    circle(0, 0, radius * scale);
  }
  pop();
}
