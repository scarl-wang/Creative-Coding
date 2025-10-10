let drunks = []; // square brackets indicate an array
let drunkAmount = 30;

// an array is a variable containing multiple variables
// each variable can be accessed using an index number
// that is fed into the square brackets
// e.g., drunks[5] would be the 6th drunk in the list (it starts from 0)
// access array length using Array.length

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  colorMode(HSB);
  background(0, 100, 100);

  for (let i = 0; i < drunkAmount; i++) {
    let drunkD = random(10, 80);
    let drunkSpeed = random(2, 10);
    let drunkHue = random(180, 260);
    drunks[i] = new Drunk(width / 2, height / 2, drunkD, drunkSpeed, drunkHue);
  }
}

function draw() {
  for (let i = 0; i < drunks.length; i++) {
    drunks[i].move();
    drunks[i].drawDrunk();
  }
}

// a CLASS is like a factory for objects
// a OBJECT is like an assemblage of variables

class Drunk {
  // class declares a new type of object
  constructor(x, y, diameter, speed, hue) {
    // "this" is an object's unique variables
    // called "fields"
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
    this.hue = hue;
    this.opacity = random(0, 1); // you can also initialize variables here
  }
  // you can declare functions or 'methods' within a class like this
  move() {
    this.x = this.x + random(-this.speed, this.speed);
    this.y = this.y + random(-this.speed, this.speed);
  }

  drawDrunk() {
    fill(this.hue, 100, 100, this.opacity);
    circle(this.x, this.y, this.diameter);
  }
}
