// For the toroids, I reference this tutorial: https://www.youtube.com/watch?v=p0uKK2jv_m0
// For FaceMesh, I referenced this ml5.js starter file: https://editor.p5js.org/ml5/sketches/lCurUW1TT
// For BodyPose, I referenced this ml5.js starter file: https://editor.p5js.org/ml5/sketches/hMN9GdrO3

// setting up variables for face mesh & body pose
let video; // set up video

let faceMesh;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };
// flip horizontally

let BodyPose;
let poses = [];
let connections;

// setting up the variables for the donut
// initial variables
let angle = 0; // this sets up the animation of the donut
let rotation = 0; // this sets up the rotation around the central axis

// variables to be adjusted
let r1 = 80; // this is the radius of the larger donut
let r2 = 90; // this is the radius of the tube cross-section
let donutScale = 1; // this is the overall size of the donut, responsive to head size
let spacing1 = 20; // this is the spacing/frequencing of circles revolving around the larger donut
let spacing2 = 20; // this is the spacing of dots revolving around the tube
let speed = 0.005; // the speed at which the small dots of the donut move
// these are the powers to raise the sin/cos functions
// they control the shape of the supertoroid (see the supertoroid chart)
let t = 2.5;
let s = 2.5;

function preload() {
  // Load the faceMesh & bodyPose model
  faceMesh = ml5.faceMesh(options);
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // WEBGL allows for 3D rendering and sets the origin point (0,0,0) to the center of the screen
  angleMode(DEGREES);

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeletal connection information
  connections = bodyPose.getConnections();
}

function draw() {
  background(0);

  // orbitControl(1, 1);
  // this uses the mouse input to adjust camera orientation

  push();
  // move the origin to the top-left corner since WEBGL moved it to the center
  translate(-width / 2, -height / 2);

  // ---- face mesh ----
  // Draw all the tracked face points
  // for (let i = 0; i < faces.length; i++) {
  //   let face = faces[i];
  //   for (let j = 0; j < face.keypoints.length; j++) {
  //     let keypoint = face.keypoints[j];
  //     fill(0);
  //     noStroke();
  //     circle(keypoint.x, keypoint.y, 5);
  //   }
  // }

  // draw the key points from body pose
  push();
  scale(-1, 1); // flip horizontal so it mirrors your movement
  translate(-video.width, 0);
  // the flipping moved the image outside of the canvas so i need to move it back into view

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];

    // also need the nose

    // save the key points needed to mapping the body & head
    // https://docs.ml5js.org/#/reference/bodypose
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let nose = pose.keypoints[0];
    // to calculate the distance between the side of the face from the nose
    let leftEar = pose.keypoints[4];
    let rightEar = pose.keypoints[3];
    let headSize = dist(leftEar.x, leftEar.y, rightEar.x, rightEar.y);
    donutScale = map(headSize, 50, 150, 0.5, 1);

    fill(255);
    noStroke();

    // only draw a circle if the keypoints' confidence is bigger than 0.1
    if (
      leftShoulder.confidence > 0.1 &&
      rightShoulder.confidence > 0.1 &&
      nose.confidence > 0.1
    ) {
      // draw the shoulders and nose dots
      circle(leftShoulder.x, leftShoulder.y, 10);
      circle(rightShoulder.x, rightShoulder.y, 10);
      circle(nose.x, nose.y, 20); // this will be where the donut is

      // calculate the chest center point using the shoulder point
      let centerX = (leftShoulder.x + rightShoulder.x) / 2;
      let centerY = ((leftShoulder.y + rightShoulder.y) / 2) * 1.2; // slightly lower than the midpoint of the shoulders

      // calculate the neck point
      // roughly the mid point between the nose and the center point
      let neckX = (centerX + nose.x) / 2;
      let neckY = ((centerY + nose.y) / 2) * 1.05; // slightly lower

      // draw dots for the center of the chest and the neck
      circle(centerX, centerY, 10);
      circle(neckX, neckY, 10);
    }

    push();
    translate(nose.x, nose.y); // draw donut where the nose is
    rotateX(rotation); // rotation along the x axis

    // animate the donut and rotate it around the z axis
    rotateZ(rotation);
    rotation += 0.5;
    drawDonut();
    pop();
  }

  pop();
  pop();
}

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

// ----- callback functions -----
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
