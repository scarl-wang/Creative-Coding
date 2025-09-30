function setup() {
  createCanvas(windowWidth, windowHeight);

  // iteration operators
  // i++: add 1 to i
  // i +=10: add 10 to i
  // i--: subtract 1 from i
  // i-=5: subtract 5 from i
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
}

function draw() {
  background("#3c6e24ff");

  for (let x = 50; x < width - 50; x += 100) {
    for (let y = 50; y < height; y += 100) {
      fill("yellow");
      push();
      strokeWeight(3);
      translate(x, y);
      let rotation
      rotation = map (x, 0,width-50,radians(-20),radians(20))
      rotate(rotation);
      // everything within this push/pop block
      // will be centered with 0,0 as the center point
      let circleSize;
      circleSize = map(y, 50, height - 50, 100, 90);
      circle(0, 0, circleSize);
      circle(- 15, - 10, 10);
      circle(+ 15, - 10, 10);
      arc(0, 0, 60, 60, 0, PI);
      pop();
    }
  }

  // translate is a TRANSFORMATION function
  // it moves the coordinate matrix according to
  // a new set of coordiates, which become
  // the new 0,0

  // push and pop ISOLATE a transformation
  // anything enclosed in a push and pop only applies within that enclosure
  push(); // beginning of an isolated segment

  if (mouseX > width / 2 && mouseY > height / 2) {
    //if the test inside the () is met
    fill("pink");
  } else if (mouseIsPressed == true) {
    fill("red"); //if the condition is put here,
    // it will be skipped if the first condition is fulfilled
    // to make sure this runs, pull it out into another if conditional
  } else {
    //otherwise...
    fill("yellow");
  }

  translate(width / 2, height / 2);

  let angle;

  // map is a function that scales numbers proportionately
  // parameters:
  // 1: input number to scale
  // 2,3: low & high end of input range
  // 4,5: low & high end of output range
  angle = map(mouseX, 0, width, 0, 360);

  // rotate arounds 0,0
  rotate(radians(angle));

  // scale makes the coordinate system larger or smaller
  // it takes a facter as parameter
  // it can take 2 parameters as x,y
  let size = map(mouseY, 0, height, 1, 3);
  scale(size);

  circle(0, 0, 100);
  circle(-15, -10, 5);
  circle(15, -10, 5);
  arc(0, 0, 60, 60, 0, PI);

  pop(); // end of an isolated block

  //display mouse position in text
  text(mouseX + "," + mouseY, 10, 20);
}
