let circleD = 25;

let circleX;
let thetaX = 0;
//angle in trigonometry
let radiusX = 100;

let circleY;
let thetaY = 0;
let radiusY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width / 2;
  circleY = height / 2;
}

function draw() {
  let r = map(second(), 0, 60, 0, width);
  // radiusX = mouseX;
  // radiusY = mouseY;
  background(0, 20);
  noStroke();
  circleX = cos(radians(thetaX)) * radiusX;
  thetaX++;
  //this is the same as thetaX = thetaX+1
  //following the curves of a circle in its path

  translate(width / 2, height / 2); //brings everything into the middle
  fill(255);
  textSize(30);
  text(day(), 0, 0);
  //day() function gives us the calendar day
  text(hour(), 0, 30);
  //hour() function gives us the 24-hour hour
  text(minute(), 0, 60);
  // miniute() gives us clock time minutes
  text(second(), 0, 90);
  fill("red");
  circle(circleX, 0, circleD);

  circleY = sin(radians(thetaY)) * radiusY;
  thetaY++;
  fill("green");
  circle(0, circleY, circleD);

  fill(255);

  circle(circleX, circleY, circleD);

  noFill();
  strokeWeight(4);
  stroke(255);
  for (let i = 0; i < 12; i++) {
    let theta = i * (360 / 12);
    let x = cos(radians(theta)) * radiusX;
    let y = sin(radians(theta)) * radiusY;
    circle(x, y, circleD);
    // push()
    // noStroke()
    // fill('green')
    // text(i+1,x,y)
    // pop()
  }
}
