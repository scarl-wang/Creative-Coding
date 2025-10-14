// Donuts
let x = 0;
let y = 0;
let d = 200;
let icing = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSL);
  angleMode(DEGREES);
  background(50, 100, 80);

  strawberrySprinkle(200, 300, 100);
  originalGlazed(400, 400, 100);
  ChocolateSprinkle(400, 100, 100);
}

function draw() {}

function mousePressed() {
  ChocolateSprinkle(mouseX, mouseY, random(100, 200));
}

function originalGlazed(x, y, d) {
  // original glazed

  push();
  translate(x, y);

  // shadow
  noFill();
  stroke(30, 100, 45);
  strokeWeight(d * 0.75);
  circle(0, 0, d);

  // light
  stroke(30, 100, 50);
  strokeWeight(d / 2);
  circle(0, 0, d);

  // highlight
  stroke(0, 100, 100, 0.7);
  strokeWeight(d * 0.1);
  arc(0, 0, d * 1.25, d * 1.25, 190, 200);
  arc(0, 0, d * 1.25, d * 1.25, 220, 260);

  pop();
}

function strawberrySprinkle(x, y, d) {
  push();
  translate(x, y);

  // base

  // shadow
  noFill();
  stroke(30, 100, 45);
  strokeWeight(d * 0.75);
  circle(0, 0, d);

  // light
  stroke(30, 100, 50);
  strokeWeight(d * 0.5);
  circle(0, 0, d);

  // strawberry icing

  for (let i = 0; i < 360; i += 10) {
    let sx = (cos(i) * d) / random(1.65, 2);
    let sy = (sin(i) * d) / random(1.6, 2);
    stroke(340, 100, 75);
    strokeWeight(random(d * 0.4, d * 0.6));
    let dot = point(sx, sy);
    icing.push(dot);
  }

  // sprinkles
  strokeWeight(d / 25);

  for (let i = 0; i < 360; i += 5) {
    let sx = (cos(i) * d) / random(1.2, 2.5);
    let sy = (sin(i) * d) / random(1.2, 2.5);
    stroke(random(0, 360), 100, 60);
    let dot = point(sx, sy);
    icing.push(dot);
  }

  // highlight
  stroke(0, 100, 100, 0.7);
  strokeWeight(d * 0.1);
  arc(0, 0, d * 1.25, d * 1.25, 190, 200);
  arc(0, 0, d * 1.25, d * 1.25, 220, 260);

  pop();
}

function ChocolateSprinkle(x, y, d) {
  push();
  translate(x, y);

  // base

  // shadow
  noFill();
  stroke(30, 100, 45);
  strokeWeight(d * 0.75);
  circle(0, 0, d);

  // light
  stroke(30, 100, 50);
  strokeWeight(d * 0.5);
  circle(0, 0, d);

  // chocolate icing

  for (let i = 0; i < 360; i += 10) {
    let sx = (cos(i) * d) / random(1.65, 2);
    let sy = (sin(i) * d) / random(1.6, 2);
    stroke(15, 100, 15); // brown
    strokeWeight(random(d * 0.4, d * 0.6));
    let dot = point(sx, sy);
    icing.push(dot);
  }

  // sprinkles
  strokeWeight(d / 25);

  for (let i = 0; i < 360; i += 5) {
    let sx = (cos(i) * d) / random(1.2, 2.5);
    let sy = (sin(i) * d) / random(1.2, 2.5);
    stroke(random(0, 360), 100, 60);
    let dot = point(sx, sy);
    icing.push(dot);
  }

  // highlight
  stroke(0, 100, 100, 0.7);
  strokeWeight(d * 0.1);
  arc(0, 0, d * 1.25, d * 1.25, 190, 200);
  arc(0, 0, d * 1.25, d * 1.25, 220, 260);

  pop();
}
