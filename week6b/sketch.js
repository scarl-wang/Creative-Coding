let myDrunks = [];
let s;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);

  s = second();

  for (i = 0; i < s; i++) {
    spawnNewDrunk();
  }
}

function draw() {
  if (s != second()) {
    if (second() == 0) {
      myDrunks = [];
    }

    spawnNewDrunk();
    s = second();
    console.log(second());
  }

  for (i = 0; i < myDrunks.length; i++) {
    myDrunks[i].move();
    myDrunks[i].display();
  }
}

function spawnNewDrunk() {
  let x = random(width);
  let y = random(height);
  let d = random(20, 50);
  let range = random(3, 7);
  let myDrunk = new Drunk(x, y, d, range);
  myDrunks.push(myDrunk);
}

class Drunk {
  constructor(x, y, d, range) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.range = range;
  }

  move() {
    this.x = this.x + random(-this.range, this.range);
    this.y = this.y + random(-this.range, this.range);
  }

  display() {
    circle(this.x, this.y, this.d);
  }
}
