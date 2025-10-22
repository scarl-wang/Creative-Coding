function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  angleMode(DEGREES);
}

function draw() {
  background(255);

  for (let i = 0; i < width; i += 6) {
    fill(0);
    rect(i, 0, 3, height);
  }

  drawScreen();
}

function drawScreen() {
  push();
  rectMode(CENTER);
  translate(mouseX, mouseY);
  rotate(1);
  for (let i = -width / 2; i < width / 2; i += 6) {
    fill(0);
    rect(i, 0, 3, height / 2);
  }
  pop();
}
