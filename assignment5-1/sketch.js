let pX = 0; // these are origin points
let pY = 0;
let targetX = 0; // these are destination points
let targetY = 0;
let currentX = 0; // these are current positions
let currentY = 0;
// how much to move from origin to destination (0 to 1)
let lerpAmt = 0;
let speed = 0.01;

let prevSecond = 0; // to store the second

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

  if (prevSecond != second()) {
    prevSecond = second();
    targetX = random(400);
    targetY = random(400);
    lerpAmt = 0;
    pX = currentX;
    pY = currentY;
  }

  // set current position according to lerp functions
  currentX = lerp(pX, targetX, lerpAmt);
  currentY = lerp(pY, targetY, lerpAmt);

  lerpAmt = constrain(lerpAmt + speed, 0, 1);

  drawScreen();
}

function drawScreen() {
  push();
  rectMode(CENTER);
  translate(currentX, currentY);
  rotate(1);
  for (let i = -100; i < 100; i += 6) {
    fill(0);
    rect(i, 0, 3, 200);
  }
  pop();
}
