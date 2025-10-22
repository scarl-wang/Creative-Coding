// Donuts
let donuts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSL);
  angleMode(DEGREES);
  background(50, 100, 80);
}

function draw() {
  background(50, 100, 80);

  for (let i = 0; i < donuts.length; i++) {
    donuts[i].display();
  }
}

function mousePressed() {
  let newDonut = new Donut(
    mouseX,
    mouseY,
    random(100, 200),
    random(["original", "strawberry", "chocolate"])
  );
  donuts.push(newDonut);

  //strawberrySprinkle(mouseX, mouseY, random(100, 200));
}

class Donut {
  constructor(x, y, d, flavor) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.flavor = flavor;
    this.icing = []; // need this to store icing
    this.sprinkles = []; // need this to store sprinkles

    // generate random positions for the icing & sprinkles
    // this need to be in the constructor so the random
    // positions don't regenerate every frame
    if (this.flavor != "original") {
      // draw icing only for flavors that are NOT original
      for (let i = 0; i < 360; i += 10) {
        let icingX = (cos(i) * this.d) / random(1.65, 2);
        let icingY = (sin(i) * this.d) / random(1.6, 2);
        let icingWeight = random(this.d * 0.4, this.d * 0.6);
        this.icing.push({ x: icingX, y: icingY, weight: icingWeight });
      }
      // store these random values in the icing array

      // draw sprinkles only for flavors that are NOT original
      for (let i = 0; i < 360; i += 5) {
        let sprinklesX = (cos(i) * this.d) / random(1.2, 2.5);
        let sprinklesY = (sin(i) * this.d) / random(1.2, 2.5);
        let sprinklesHue = random(0, 360);
        // random sprinkle colors
        this.sprinkles.push({
          x: sprinklesX,
          y: sprinklesY,
          hue: sprinklesHue,
        });
        // store these random values in the sprinkles array
      }
    }
  }

  display() {
    // drawing the donut base
    push();
    translate(this.x, this.y);

    // shadow
    noFill();
    stroke(30, 100, 45);
    strokeWeight(this.d * 0.75);
    circle(0, 0, this.d);

    // light
    stroke(30, 100, 50);
    strokeWeight(this.d / 2);
    circle(0, 0, this.d);

    // flavor (strawberry & chocolate icing)
    // icing & sprinkles

    // loop through the icing array
    for (let i = 0; i < this.icing.length; i++) {
      // drawing the icing using the random values stored
      if (this.flavor == "strawberry") {
        stroke(340, 100, 75); // pink for strawberry
      } else {
        stroke(15, 100, 15); // dark brown for chocolate
      }
      strokeWeight(this.icing[i].weight);
      point(this.icing[i].x, this.icing[i].y);
    }

    // loop through the sprinkles array
    for (let i = 0; i < this.sprinkles.length; i++) {
      // drawing sprinkles with the random values stored
      stroke(this.sprinkles[i].hue, 100, 60);
      strokeWeight(this.d / 25);
      point(this.sprinkles[i].x, this.sprinkles[i].y);
    }

    // highlight
    stroke(0, 100, 100, 0.7);
    strokeWeight(this.d * 0.1);
    arc(0, 0, this.d * 1.25, this.d * 1.25, 190, 200);
    arc(0, 0, this.d * 1.25, this.d * 1.25, 220, 260);

    pop();
  }

  move() {
    // I want the donuts to move along a conveyer belt
  }
}

// obsolete code for the initial graphics
// function originalGlazed(x, y, d) {
//   // original glazed

//   push();
//   translate(x, y);

//   // shadow
//   noFill();
//   stroke(30, 100, 45);
//   strokeWeight(d * 0.75);
//   circle(0, 0, d);

//   // light
//   stroke(30, 100, 50);
//   strokeWeight(d / 2);
//   circle(0, 0, d);

//   // highlight
//   stroke(0, 100, 100, 0.7);
//   strokeWeight(d * 0.1);
//   arc(0, 0, d * 1.25, d * 1.25, 190, 200);
//   arc(0, 0, d * 1.25, d * 1.25, 220, 260);

//   pop();
// }

// function strawberrySprinkle(x, y, d) {
//   push();
//   translate(x, y);

//   // base

//   // shadow
//   noFill();
//   stroke(30, 100, 45);
//   strokeWeight(d * 0.75);
//   circle(0, 0, d);

//   // light
//   stroke(30, 100, 50);
//   strokeWeight(d * 0.5);
//   circle(0, 0, d);

//   // strawberry icing

//   for (let i = 0; i < 360; i += 10) {
//     let sx = (cos(i) * d) / random(1.65, 2);
//     let sy = (sin(i) * d) / random(1.6, 2);
//     stroke(340, 100, 75);
//     strokeWeight(random(d * 0.4, d * 0.6));
//     let dot = point(sx, sy);
//     icing.push(dot);
//   }

//   // sprinkles
//   strokeWeight(d / 25);

//   for (let i = 0; i < 360; i += 5) {
//     let sx = (cos(i) * d) / random(1.2, 2.5);
//     let sy = (sin(i) * d) / random(1.2, 2.5);
//     stroke(random(0, 360), 100, 60);
//     let dot = point(sx, sy);
//     icing.push(dot);
//   }

//   // highlight
//   stroke(0, 100, 100, 0.7);
//   strokeWeight(d * 0.1);
//   arc(0, 0, d * 1.25, d * 1.25, 190, 200);
//   arc(0, 0, d * 1.25, d * 1.25, 220, 260);

//   pop();
// }

// function ChocolateSprinkle(x, y, d) {
//   push();
//   translate(x, y);

//   // base

//   // shadow
//   noFill();
//   stroke(30, 100, 45);
//   strokeWeight(d * 0.75);
//   circle(0, 0, d);

//   // light
//   stroke(30, 100, 50);
//   strokeWeight(d * 0.5);
//   circle(0, 0, d);

//   // chocolate icing

//   for (let i = 0; i < 360; i += 10) {
//     let sx = (cos(i) * d) / random(1.65, 2);
//     let sy = (sin(i) * d) / random(1.6, 2);
//     stroke(15, 100, 15); // brown
//     strokeWeight(random(d * 0.4, d * 0.6));
//     let dot = point(sx, sy);
//     icing.push(dot);
//   }

//   // sprinkles
//   strokeWeight(d / 25);

//   for (let i = 0; i < 360; i += 5) {
//     let sx = (cos(i) * d) / random(1.2, 2.5);
//     let sy = (sin(i) * d) / random(1.2, 2.5);
//     stroke(random(0, 360), 100, 60);
//     let dot = point(sx, sy);
//     icing.push(dot);
//   }

//   // highlight
//   stroke(0, 100, 100, 0.7);
//   strokeWeight(d * 0.1);
//   arc(0, 0, d * 1.25, d * 1.25, 190, 200);
//   arc(0, 0, d * 1.25, d * 1.25, 220, 260);

//   pop();
// }
