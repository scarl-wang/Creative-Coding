let noisePosition = 0;
let noiseSpeed = 0.01;
let startingPoint = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  angleMode(DEGREES);

  background(0);
}

function draw() {
  //background(0);
  translate(width / 2, height / 2);

  strokeWeight(5);
  point(0, 0);

  noiseTheta = map(noise(noisePosition), 0, 1, 0, 360);

  noiseRadius = map(noise(noisePosition + 10), 0, 1, 0, width / 2);

  let x = cos(noiseTheta) * noiseRadius;
  let y = sin(noiseTheta) * noiseRadius;

  stroke(noiseTheta, 100, noiseRadius);
  line(0, 0, x, y);
  circle(x, y, 10);

  // stroke(255);
  // let circleD = noise(noisePosition) * width;
  // circle(0, 0, circleD);
  noisePosition += noiseSpeed;

  // stroke(255);
  // fill(255);
  // noisePosition = startingPoint;
  // for (let i = 0; i < width; i += 1) {
  //   let y = noise(noisePosition) * height;
  //   noisePosition = noisePosition + noiseSpeed;
  //   let d = map(i, 0, width, 0, 25);
  //   circle(i, y, d);
  // }
  // noisePosition = noisePosition + noiseSpeed;
}

function mousePressed() {}
