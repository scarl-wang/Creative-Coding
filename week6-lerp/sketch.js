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
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  currentX = lerp(pX, targetX, lerpAmt);
  currentY = lerp(pY, targetY, lerpAmt);
  circle(currentX, currentY, 20);
  lerpAmt = lerpAmt + speed;
  // constrain is a function that keeps a value between a certain range
  // it take 3 parameters: the value, the low limit, and the high limit
  lerpAmt = constrain(lerpAmt, 0, 1);

  // this is now a discreet event that runs every second
  if (prevSecond != second()) {
    console.log("do something");
    prevSecond = second();
    targetX = random(width);
    targetY = random(height);
    lerpAmt = 0;
    pX = currentX;
    pY = currentY;
  }
}

function mousePressed() {
  targetX = mouseX;
  targetY = mouseY;
}
