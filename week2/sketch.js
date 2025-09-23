let myDiameter; //setting the diameter of the biggest circle
let gap; //setting the gap between the circles

function setup() {
  createCanvas(windowWidth, windowHeight); //set canvas to window size
  background("blue"); //make background blue
  noLoop(); //so it only loads once
}

function draw() {
  strokeWeight(4);
  stroke("red");
  noFill();
  //setting the style of the circles

  myDiameter = windowWidth * 1.5;
  circle(windowWidth / 2, windowHeight / 2, myDiameter);
  //drawing a circle 1.5 times as big as the screen

  gap = windowWidth / 6;
  // setting the gap to 1/6 of the window size

  //repeating the circle and making it smaller each time
  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  myDiameter = myDiameter - gap; // assign a new value to myDiameter
  circle(windowWidth / 2, windowHeight / 2, myDiameter);

  //making a smiley face with a yellow circle with black outline
  strokeWeight(5);
  stroke("black");
  fill("yellow");
  circle(windowWidth / 2, windowHeight / 2, 120); //centered circle with the newest diameter

  //2 ellipses for eyes
  fill("black");
  ellipse(windowWidth / 2 - 15, windowHeight / 2 - 20, 8, 30); //left eye
  ellipse(windowWidth / 2 + 15, windowHeight / 2 - 20, 8, 30); //right eye

  //arc for mouth
  noFill();
  arc(windowWidth / 2, windowHeight / 2, 80, 75, 0, PI);
}
