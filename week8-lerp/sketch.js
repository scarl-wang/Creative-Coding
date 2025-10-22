let eye1;

let pX = 0;
let pY = 0;

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

let lerpAmount = 0;
let speed = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  colorMode(HSB);
  background(0);

  eye1 = new EyeBall(0, 0, 100, 100, 1, 1000);
}

function draw() {
  background(0);

  // set current position according to lerp functions
  currentX = lerp(pX, targetX, lerpAmount);
  currentY = lerp(pY, targetY, lerpAmount);

  eye1.x = currentX;
  eye1.y = currentY;
  eye1.display();

  lerpAmount = lerpAmount + speed;
  lerpAmount = constrain(lerpAmount, 0, 1);
}

function mousePressed() {
  pX = currentX;
  pY = currentY;
  targetX = mouseX;
  targetY = mouseY;
  lerpAmount = 0;
}

// things with capital letters are assumed to be classes
class EyeBall {
  constructor(x, y, w, h, r, t) {
    this.x = x;
    this.y = y;

    this.w = w; //width
    this.h = h; //height

    this.speed = 0.005;
    this.noiseR = r;
    this.noiseT = t;
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(255);
    ellipse(0, 0, this.w, this.h);

    let eyeTheta = noise(this.noiseT) * 360;
    let eyeXRadius = (noise(this.noiseR) * this.w) / 2;
    let eyeYRadius = (noise(this.noiseR) * this.h) / 2;

    let eyeX = cos(eyeTheta) * eyeXRadius;
    let eyeY = sin(eyeTheta) * eyeYRadius;
    // cos() and sin() return values between -1 and 1
    // multiplying by the radius scales it to the actual distance you want

    fill(0);
    ellipse(eyeX, eyeY, this.w / 2);

    this.noiseR += this.speed;
    this.noiseT += this.speed;
    pop();
  }
}
