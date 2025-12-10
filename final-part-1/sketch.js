// create an array to store star objects for drawStars()
let stars = [];
let numStars = 200; // number of stars

let currentScreen = 0; // starting screen at 0
let userChoices = {}; // storing all user choices here

function setup() {
  // set canvas size to video size
  createCanvas(windowWidth, windowHeight);

  // generate stars to add to the array
  for (i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  drawStars();

  // set starting point to center of the screen
  translate(width / 2, height / 2);

  text();

  // screen progression
  if (currentScreen === 0) {
    startScreen();
  } else if (currentScreen === 1) {
    screen1();
  } else if (currentScreen === 2) {
    screen2();
  } else if (currentScreen === 3) {
    screen3();
  } else if (currentScreen === 4) {
    endScreen();
  }
}

// --- creating the various screens ---

// screen 0: start screen
function startScreen() {
  // add text
  displayText("what's going on in your head?", 0, -20, width, false);
  displayText("click anywhere to start", 0, 60, width, false);
}

// screen 1
function screen1() {
  // add text
  displayText("to remember", -width * 0.3, 0, 150, true);
  displayText("to forget", width * 0.3, 0, 150, true);
}

// screen 2
function screen2() {
  // add text
  displayText("more", -width * 0.3, 0, 150, true);
  displayText("less", width * 0.3, 0, 150, true);
}

// screen 3
function screen3() {
  // add text
  displayText("a little at a time", -width * 0.3, 0, 150, true);
  displayText("all at once", width * 0.3, 0, 150, true);
}

// screen 4: end screen
// this is just a placeholder to display all the user selections.
// it will be replaced with a rendered webcam image in part 2
function endScreen() {
  // display choices
  displayText("your choices:", 0, -100);
  displayText(userChoices.screen1, 0, -50, width, false);
  displayText(userChoices.screen2, 0, 0, width, false);
  displayText(userChoices.screen3, 0, 50, width, false);
}

// --- creating a class for flickering stars in the background ---

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.timer = random(0, 5); // generate a random starting value to offset the flicker
  }

  show() {
    // sin(this.timer) produces a value between -1 and 1
    // map it to (0,1) to adjust the alpha to produce the flickering effect
    let flicker = map(sin(this.timer), -1, 1, 0, 1);
    fill(255, 255, 255, flicker * 255);
    ellipse(this.x, this.y, 2, 2);
    // increment the timer to animate the flickering effect
    this.timer += 0.02;
  }
}

// --- resusable functions ----
// drawing the toroids (donuts)
function drawDonut() {
  fill(255);
  stroke(255);
  beginShape(POINTS); // this makes the vertices discreet points
  for (let theta = 0; theta < 360; theta += spacing1) {
    // theta goes around the big ring
    for (let phi = 0; phi < 360; phi += spacing2) {
      // phi goes around the tube cross-sections

      // set up the variables using the custom xn function
      // these values reference the toroid function
      let an = xn(cos(theta + angle), t);
      let bn = xn(sin(theta + angle), t);
      let cn = xn(cos(phi + angle), s);
      let dn = xn(sin(phi + angle), s);

      // referencing the formula in README
      let x = (r1 * donutScale + r2 * donutScale * cn) * an;
      let y = (r1 * donutScale + r2 * donutScale * cn) * bn;
      let z = r2 * donutScale * dn;

      vertex(x, y, z);

      angle += speed;
    }
    // looping through the circle and draw points at equal distances
  }
  endShape();
}

function xn(x, n) {
  // this is for the calculation of the supertorus
  // x is the sin or cos function; n is the power to raise it to
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
  let xn = Math.sign(x) * pow(abs(x), n);
  return xn;
}

// mouse interactions for selections
function mouseClicked() {
  if (currentScreen === 0) {
    // move on to the next screen when clicked
    currentScreen = 1;
  } else if (currentScreen === 1) {
    // if mouse is clicked on the left option
    if (mouseInside(-width * 0.3, 0)) {
      // save the option and move on to the next screen
      userChoices.screen1 = "to remember";
      currentScreen = 2;
    } else if (mouseInside(width * 0.3, 0)) {
      userChoices.screen1 = "to forget";
      currentScreen = 2;
    }
  } else if (currentScreen === 2) {
    // if mouse is clicked on the left side
    if (mouseInside(-width * 0.3, 0)) {
      userChoices.screen2 = "more";
      currentScreen = 3;
    } else if (mouseInside(width * 0.3, 0)) {
      userChoices.screen2 = "less";
      currentScreen = 3;
    }
  } else if (currentScreen === 3) {
    // if mouse is clicked on the left side
    if (mouseInside(-width * 0.3, 0)) {
      userChoices.screen3 = "a little at a time";
      currentScreen = 4;
    } else if (mouseInside(width * 0.3, 0)) {
      userChoices.screen3 = "all at once";
      currentScreen = 4;
    }
  }
}

// checking if mouse is within bounds of the option
// x,y: center point for the text option
function mouseInside(x, y) {
  // have to convert mouse coordinates since the center is translated to 0,0
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  // return a boolean: is the mouse within 100px of the option?
  return dist(mx, my, x, y) < 100;
}

// background with flickering stars
function drawStars() {
  // draw the stars from the array
  noStroke();
  fill("white");
  // loop through the array and render the stars
  for (i = 0; i < stars.length; i++) {
    stars[i].show();
  }
}

// creating a function to display stylized text
// t: text string, x,y: coordinates, w: max width of the textbox, hover: whether there is a hover state
function displayText(t, x, y, w, hover) {
  push();
  // stylize the text
  textFont("Courier New");
  // make the texts flicker slightly with noise
  // mapping the noise to (0.8,1) to make it more subtle
  flicker = map(noise(random(1, 1000)), 0, 1, 0.8, 1);
  fill(255, 255, 255, flicker * 255);
  textSize(20);
  // align text and textbox to center so it's easier to adjust the coordinates
  textAlign(CENTER);
  rectMode(CENTER);

  // highlight text if mouse is within bounds
  if (hover) {
    if (mouseInside(x, y)) {
      stroke(255, 200);
      strokeWeight(2);
    }
  }

  text(t, x, y, w);

  pop();
}
