let buttonX = 100;
let buttonY = 100;
let buttonD = 80;
let hovering = false;
//boolean variable that tracks whether the mouse is hovering over the button

let ballX = 25;
let ballSpeed = 2;

let r = 0;
let g = 0;
let b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(r, g, b);
  strokeWeight(1);
  noStroke();
  fill(0, 255, 0);
  text("x: " + mouseX + " y: " + mouseY, 15, 15);

  noFill();

  let distance = dist(mouseX, mouseY, buttonX, buttonY);
  text("dist: " + distance, 15, 30);

  //if mouse is within the circle button
  if (distance <= buttonD / 2) {
    fill(0, 20);
    hovering = true;
    if (mouseIsPressed) {
      strokeWeight(4);
    }
    ballX = ballX + ballSpeed;
  } else {
    hovering = false;
  }

  stroke(255);

  circle(buttonX, buttonY, buttonD);

  fill("red");
  noStroke();

  if (ballX > width - 25 || ballX < 25) {
    ballSpeed = -ballSpeed;
  }
  circle(ballX, height / 2, 50);
}

function mousePressed() {
  if (hovering) {
    r = random(255);
    g = random(255);
    b = random(255);
  }
}
