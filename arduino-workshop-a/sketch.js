// graphs sensor data from an analog
// sensor on A0 to the window

let port; // object to hold serial port
let c; // button
let potentiometer = 0;
let photoCell = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colors
  colorMode(HSL);
  // create instance of the lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  c = createButton("Connect to Arduino");
  c.position(10, 10);
  c.mousePressed(connectBtnClick);
}

function draw() {
  background(220, 80, 50);
  // read serial bufffer
  let str = port.readUntil("\n"); // \n means new line
  // split the values according to "space" character
  let sensorValues = str.split(" ");
  // if there's valid data
  if (str.length > 0) {
    potentiometer = sensorValues[0]; // extract potentiometer value
    photoCell = sensorValues[1]; // extract photoCell value
  }
  fill(255);
  noStroke();
  text("Potentiometer: " + potentiometer, 10, 50);
  text("Photo Cell: " + photoCell, 10, 70);

  let circleD = map(potentiometer, 0, 4095, 0, width);
  let lightness = map(photoCell, 4095, 2900, 0, 100);

  fill(0, 255, lightness);
  circle(width / 2, height / 2, circleD);

  // changes button label based on connection status
  if (!port.opened()) {
    c.html("Connect to Arduino");
  } else {
    c.html("Disconnect");
  }
}
// if the connect button is clicked and there's
// no connection, look for something named
// "Arduino"
function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}
