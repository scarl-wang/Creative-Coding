let eye1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  colorMode(HSB);
  background(0);

  eye1 = new EyeBall(200, 200, 100, 100, 1, 1000);
  eye2 = new EyeBall(300, 200, 100, 100, 2, 22);
}

function draw() {
  background(0);
  eye1.display();
  eye2.display();
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
