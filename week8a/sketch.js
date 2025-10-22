let points = [];
let lineStart = 0;
let lineEnd = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  background("black");

  // points = [
  //   { x: 0, y: 0 },
  //   { x: 0, y: 100 },
  //   { x: 0, y: -100 },
  //   { x: 85, y: 50 },
  //   { x: -85, y: 50 },
  //   { x: 85, y: -50 },
  //   { x: -85, y: -50 },
  // ]; this is called an object literal

  points = [
    createVector(0, 0),
    createVector(0, 100),
    createVector(85, 50),
    createVector(85, -50),
    createVector(0, -100),
    createVector(-85, 50),
    createVector(-85, -50),
  ];
}

function draw() {
  noLoop();
  background("black");

  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(5);

  for (let i = 0; i < points.length; i++) {
    point(points[i]);
  }

  stroke(255, 0, 0);
  // line(
  //   points[lineStart].x,
  //   points[lineStart].y,
  //   points[lineEnd].x,
  //   points[lineEnd].y
  // );
  // using different array indeces

  let lineAmount = floor(random(1, 9));

  // for (let i = 0; i < lineAmount; i++) {
  //   let start = floor(random(points.length));
  //   // the floor function will round a number
  //   // to whatever the lower whole integer is
  //   let end = floor(random(points.length));
  //   line(points[start].x, points[start].y, points[end].x, points[end].y);
  // }
}

function mousePressed() {
  background(0);

  stroke(255);
  for (let i = 0; i < points.length; i++) {
    point(points[i]);
  }

  lineStart = floor(random(points.length));
  // the floor function will round a number
  // to whatever the lower whole integer is

  lineEnd = floor(random(points.length));

  let lineAmount = floor(random(1, 9));

  stroke(255, 0, 0);
  for (let i = 0; i < lineAmount; i++) {
    let start = floor(random(points.length));
    // the floor function will round a number
    // to whatever the lower whole integer is
    let end = floor(random(points.length));
    line(points[start].x, points[start].y, points[end].x, points[end].y);
  }
}
