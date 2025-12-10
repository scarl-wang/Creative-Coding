// ------ setting up variables for the screens ------
let stars = []; // array to store star objects for drawStars()
let numStars = 200; // number of stars to on the background
let currentScreen = 0; // starting screen at 0
let textFlicker = 1; // for the flickering text
let myFont;
let optionPosition = 0.25; // position of the options relative to the screen width (smaller = closer together)

// ----- setting up variables for face mesh -----
let video;
let faceMesh;
let faces = [];
// setting refineLandmarks to true helps with more accurate eye detection
let options = { maxFaces: 1, refineLandmarks: true, flipHorizontal: true };

// ----- setting up the keypoints for blink detection -----

// defining the useful keypoints from the fashmesh
// https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg
let noseIndex = 1;
let leftEyeTopIndex = 159;
let leftEyeBottomIndex = 145;
let leftEyeLeftIndex = 33;
let leftEyeRightIndex = 133;
let rightEyeTopIndex = 386;
let rightEyeBottomIndex = 374;
let rightEyeLeftIndex = 362;
let rightEyeRightIndex = 263;

// blink detection variables
let bothEyesWereClosed = false;
let blinkThreshold = 0.26; // eye aspect ratio threshold to compare with ear (the lower the more sensitive)

// tracking blink count and previous count
let blinkCount = 0;
let previousBlinkCount = 0;

// resets for each selection as cooldown
let readyForSelection = true; // starts true for first selection

// ----- setting up the variables for the donut -----

// initial variables
let angle = 0; // this sets up the animation of the donut
let rotation = 0; // this sets up the rotation around the central axis
let noseX = 0;
let noseY = 0; // these are the coordinates for the donut
let donutScale = 1; // this is the overall size of the donut, responsive to head size

// variables that are responsive to user choice
let r1; // this is the radius of the larger donut
let r2; // this is the radius of the tube cross-section
let spacing; // this is the spacing/frequencing of circles revolving around the larger donut
let speed = 0; // the speed at which the small dots of the donut move
let t; // these are the powers to raise the sin/cos functions
let s; // they control the shape of the supertoroid (see the supertoroid chart)

function preload() {
  faceMesh = ml5.faceMesh(options); // load the faceMesh model
  myFont = loadFont("AndaleMono.ttf"); // customize font
}

function setup() {
  // set canvas size to window size
  createCanvas(windowWidth, windowHeight, WEBGL);
  // WEBGL allows for 3D rendering and sets the origin point (0,0,0) to the center of the screen
  angleMode(DEGREES);

  // create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);

  // generate stars to add to the array
  for (i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);

  // draw flickering stars on top of bg
  noStroke();
  fill("white");
  // loop through the array and render the stars
  for (i = 0; i < stars.length; i++) {
    stars[i].show();
  }

  // detect blinks and update nose position if face is present
  if (faces.length > 0) {
    detectBlinks();
    updateNosePosition(); // update nose from facemesh
    drawEyes(); // draw the eyes
  }

  // check for blink selections
  checkBlinkSelection();

  // rendering screen progression
  if (currentScreen === 0) {
    startScreen();
  } else if (currentScreen === 1) {
    screen1();
  } else if (currentScreen === 2) {
    screen2();
  } else if (currentScreen === 3) {
    screen3();
  } else if (currentScreen === 4) {
    screen4();
  } else if (currentScreen === 5) {
    endScreen();
  }

  // show selection zones and nose position (for visual feedback)
  drawSelectionFeedback();
}

// ----- creating the various screens -----

// screen 0: start screen
function startScreen() {
  // add text
  displayText("what's going on in your head?", 0, -20, width);
  displayText("click anywhere to start", 0, 60, width, true);
}

// screen 1
function screen1() {
  // add text
  displayText(
    "tilt your head towards the answer",
    0,
    -height * 0.3,
    width,
    true
  );
  displayText("and blink to choose", 0, -height * 0.25, width, true);
  displayText("to remember", -width * optionPosition, 0, 150);
  displayText("to forget", width * optionPosition, 0, 150);
}

// screen 2
function screen2() {
  displayText(
    "tilt your head towards the answer",
    0,
    -height * 0.3,
    width,
    true
  );
  displayText("and blink to choose", 0, -height * 0.25, width, true);
  displayText("more", -width * optionPosition, 0, 150);
  displayText("less", width * optionPosition, 0, 150);
}

// screen 3
function screen3() {
  displayText(
    "tilt your head towards the answer",
    0,
    -height * 0.3,
    width,
    true
  );
  displayText("and blink to choose", 0, -height * 0.25, width, true);
  displayText("a little at a time", -width * optionPosition, 0, 150);
  displayText("all at once", width * optionPosition, 0, 150);
}

// screen 4
function screen4() {
  displayText(
    "tilt your head towards the answer",
    0,
    -height * 0.3,
    width,
    true
  );
  displayText("and blink to choose", 0, -height * 0.25, width, true);
  displayText("fight it", -width * optionPosition, 0, 150);
  displayText("let it be", width * optionPosition, 0, 150);
}

// screen 5: end screen
function endScreen() {
  // render the donut based on user selection
  drawDonut(r1, r2, spacing, t, s, speed);
}

// the only mouse interaction
function mouseClicked() {
  if (currentScreen === 0) {
    // move on to the next screen when clicked
    currentScreen = 1;
  }
}

// ========== FUNCTIONS FOR BLINK SELECTIONS ==========

// check for blink selections
function checkBlinkSelection() {
  // to prevent blinks from being registered multiple times while users are still in a selection zone
  // i added this block to only allow a new selection when users exit the zones

  // check if user is currently in any zone
  let inAnyZone =
    noseInside(-width * optionPosition, 0) ||
    noseInside(width * optionPosition, 0); // returns a boolean

  // if not ready and nose has left both zones, become ready again
  if (!readyForSelection && !inAnyZone) {
    readyForSelection = true;
  }

  // if not ready for selection, don't process blinks
  if (!readyForSelection) {
    return;
  }

  // check if a new blink just happened
  let newBlinkDetected = blinkCount > previousBlinkCount;

  // update previous count for next frame
  previousBlinkCount = blinkCount;

  // only process selection if a new blink was detected
  if (!newBlinkDetected) {
    return;
  }

  // each selection corresponds to a parameter for the donut

  // Screen 1: ratio (shape) of the supertoroid
  // to remember: small circles overlap, creating middle tube; to forget: small circles dispersed
  else if (currentScreen === 1) {
    // if blink happens on the left option
    if (noseInside(-width * optionPosition, 0)) {
      r1 = 60;
      r2 = 90;
      currentScreen = 2;
      readyForSelection = false; // user must exit zone before next selection
    } // if blink happens on the right option
    else if (noseInside(width * optionPosition, 0)) {
      r1 = 90;
      r2 = 60;
      currentScreen = 2;
      readyForSelection = false;
    }
  }
  // Screen 2: rotation speed of the larger donut
  // more: faster; less: slower
  else if (currentScreen === 2) {
    if (noseInside(-width * optionPosition, 0)) {
      speed = 0.002;
      currentScreen = 3;
      readyForSelection = false;
    } else if (noseInside(width * optionPosition, 0)) {
      speed = 0.001;
      currentScreen = 3;
      readyForSelection = false;
    }
  }
  // Screen 3: spacing between the revolving circles
  // a little at a time: more spacing; all at once: less spacing
  else if (currentScreen === 3) {
    if (noseInside(-width * optionPosition, 0)) {
      spacing = 20;
      currentScreen = 4;
      readyForSelection = false;
    } else if (noseInside(width * optionPosition, 0)) {
      spacing = 10;
      currentScreen = 4;
      readyForSelection = false;
    }
  }
  // Screen 4: shape of the supertoroid
  // fight it: sharp edges; let it be: rounded edges
  else if (currentScreen === 4) {
    if (noseInside(-width * optionPosition, 0)) {
      t = 2.5;
      s = 2.5;
      currentScreen = 5;
      readyForSelection = false;
    } else if (noseInside(width * optionPosition, 0)) {
      t = 1;
      s = 1;
      currentScreen = 5;
      readyForSelection = false;
    }
  }
}

// --------get nose position and size of the head--------
function updateNosePosition() {
  if (faces.length > 0) {
    // get nose position form facemesh
    let nose = faces[0].keypoints[noseIndex];
    noseX = nose.x;
    noseY = nose.y;

    // calculate head size to adjust donut scale
    let leftEye = faces[0].keypoints[leftEyeLeftIndex];
    let rightEye = faces[0].keypoints[rightEyeRightIndex];
    let headSize = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
    donutScale = map(headSize, 50, 150, 0.5, 1.5);
  }
}

// --------calculate if the nose is inside the option selection zone--------
// x, y are the coordinates for the option
function noseInside(x, y) {
  // center the video coordinates
  let centeredX = noseX - video.width / 2;
  let centeredY = noseY - video.height / 2;

  // check if nose is within 200px of the option center
  return dist(centeredX, centeredY, x, y) < 200;
}

// visual feedback for selection zones
function drawSelectionFeedback() {
  // do not show on first and last screen
  if (currentScreen === 0 || currentScreen === 5) {
    return;
  }

  push();
  noFill();
  strokeWeight(2);

  // highlight the zone where nose is currently positioned when selection is active
  if (noseInside(-width * optionPosition, 0) && readyForSelection) {
    stroke("white"); // full opacity when nose is over left option
    circle(-width * optionPosition, 0, 300);
  } else if (noseInside(width * optionPosition, 0) && readyForSelection) {
    stroke("white"); // full opacity when nose is over left option
    circle(width * optionPosition, 0, 300);
  }

  // draw faint circles around both options
  stroke(255, 255, 255, 50);
  circle(-width * optionPosition, 0, 300);
  circle(width * optionPosition, 0, 300);

  pop();
}

// ======== DETECTING THE BLINKS ===========
// I referenced this video's method of using EAR (Eye Aspect Ratio)
// https://www.youtube.com/watch?v=br0eUIBROjo

// I originally relied on the distance between the top and bottom points of the eyes
// but there was too much error and didn't account for the distance between the
// user and the screen, so comparing the vertical and horizontal distance
// was actually more accurate and helpful

function detectBlinks() {
  let face = faces[0];
  let keypoints = face.keypoints;

  // calculate the EAR for both eyes
  let leftEAR = calculateEAR(
    keypoints[leftEyeTopIndex], // left eye top
    keypoints[leftEyeBottomIndex], // left eye bottom
    keypoints[leftEyeLeftIndex], // left eye left corner
    keypoints[leftEyeRightIndex] // left eye right corner
  );

  let rightEAR = calculateEAR(
    keypoints[rightEyeTopIndex], // right eye top
    keypoints[rightEyeBottomIndex], // right eye bottom
    keypoints[rightEyeLeftIndex], // right eye left corner
    keypoints[rightEyeRightIndex] // right eye right corner
  );

  let averageEAR = (leftEAR + rightEAR) / 2; // average the EAR of both eyes

  let eyesAreClosed = averageEAR < blinkThreshold; // determine if eyes are currently closed

  // detect blink only when change occurs
  // this only triggers when eyesAreClosed is TRUE and bothEyesWereClosed is FALSE
  // this prevents counting every frame when eyes are closed
  if (eyesAreClosed && !bothEyesWereClosed) {
    blinkCount += 1;
  }
  bothEyesWereClosed = eyesAreClosed; // resetting the state for next frame
}

// ----------calculating the eye aspect ratio----------
// this returns the EAR
function calculateEAR(topPoint, bottomPoint, leftPoint, rightPoint) {
  // calculate vertical distance (eye height)
  let verticalDist = dist(topPoint.x, topPoint.y, bottomPoint.x, bottomPoint.y);

  // calculate horizontal distance (eye width)
  let horizontalDist = dist(
    leftPoint.x,
    leftPoint.y,
    rightPoint.x,
    rightPoint.y
  );

  // Eye Aspect Ratio = height / width
  // EAR is bigger when eye is open (~0.3) and smaller when eye is closed (~0.1)
  let ear = verticalDist / horizontalDist;

  return ear;
}

// --------draw eyes from facemesh--------
function drawEyes() {
  let keypoints = faces[0].keypoints; // set up keypoints of the detected face

  push();

  // move origin to top-left corner to compensate for WEBGL
  translate(-width / 2, -height / 2);
  // move video from top left to center of the screen
  translate((width - video.width) / 2, (height - video.height) / 2);

  stroke("white"); // white outline
  noFill();
  strokeWeight(2);

  // draw left eye
  // keypoints of each eye were found here: https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/mesh_map.jpg
  beginShape();
  let leftEyePoints = [
    133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155,
  ];
  // using a value-based for loop so that i is directly the value from the array
  for (let i of leftEyePoints) {
    vertex(keypoints[i].x, keypoints[i].y);
  }

  endShape(CLOSE);

  // draw right eye
  beginShape();
  let rightEyePoints = [
    362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381,
    382,
  ];
  for (let i of rightEyePoints) {
    vertex(keypoints[i].x, keypoints[i].y);
  }
  endShape(CLOSE);

  pop();
}

// ---------drawing the supertoroids (donuts)--------
function drawDonut(r1, r2, spacing, t, s, speed) {
  push();

  // apply the same transformations as body tracking
  translate(-width / 2, -height / 2);
  translate((width - video.width) / 2, (height - video.height) / 2);

  // render it at the stored nose coordinates
  translate(noseX, noseY - height * 0.1); // move it a little higher like where the brain is
  rotateX(rotation); // add rotational movement along the X axis
  rotation += 0.5; // rotational speed

  fill(255);
  stroke(255);
  beginShape(POINTS); // this makes the vertices discreet points
  for (let theta = 0; theta < 360; theta += spacing) {
    // theta goes around the big ring
    for (let phi = 0; phi < 360; phi += 10) {
      // phi goes around the tube cross-sections

      // set up the variables using the custom xn function
      // these values reference the toroid function
      let an = xn(cos(theta + angle), t);
      let bn = xn(sin(theta + angle), t);
      let cn = xn(cos(phi + angle), s);
      let dn = xn(sin(phi + angle), s);
      // angle controls the animation

      // referencing the supertoroid formula (see README)
      let x = (r1 * donutScale + r2 * donutScale * cn) * an;
      let y = (r1 * donutScale + r2 * donutScale * cn) * bn;
      let z = r2 * donutScale * dn;

      vertex(x, y, z);

      angle += speed;
    }
    // looping through the circle and draw points at equal distances
  }
  endShape();
  pop();
}

// ---------function for the calculation of the super torus--------
// x is the sin or cos function; n is the power to raise it to.
// I referenced the YouTube tutorial (in README) for this
function xn(x, n) {
  let xn = Math.sign(x) * pow(abs(x), n);
  return xn;
}

// --------display stylized text--------
// t: text string, x,y: coordinates, w: max width of the textbox, flicker: whether the text flickers
function displayText(t, x, y, w, flicker) {
  push();
  // stylize the text
  textFont(myFont);
  fill("white");
  textSize(20);
  // align text and textbox to center so it's easier to adjust the coordinates
  textAlign(CENTER);
  rectMode(CENTER);

  if (flicker) {
    // make the texts flicker slightly with sin wave
    let opacity = map(sin(textFlicker), -1, 1, 100, 255); // map it to text opacity
    fill(255, 255, 255, opacity);
    textFlicker += 2;
  }
  text(t, x, y, w);

  pop();
}

// ------- callback functions -------
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

// ----- creating a class for flickering stars in the background -----
class Star {
  constructor() {
    // centered coordinates for WEBGL
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.offset = random(1000); // generate a random starting value to offset the flicker
  }

  show() {
    // sin(x) produces a value between -1 and 1
    // map it to (0,255) to adjust the opacity to produce the flickering effect
    let opacity = map(sin(this.offset), -1, 1, 0, 255);
    fill(255, 255, 255, opacity);
    ellipse(this.x, this.y, 2, 2);

    this.offset += 2; // flickering speed
  }
}
