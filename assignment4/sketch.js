// Donuts
let donuts = [];
let donutAmount = 50;
let buttonRadius = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSL);
  // changing the color setting so it's easier to adjust the hue
  angleMode(DEGREES);
  rectMode(CENTER);
  // setting rect mode so it's easier to line it up to the screen
  background(50, 100, 80);

  // set up the array by generating random donuts
  for (i = 0; i < donutAmount; i++) {
    let newDonut = new Donut(
      random(width),
      random(height),
      random(80, 100),
      random(["original", "strawberry", "chocolate"])
    );
    donuts.push(newDonut);
  }
}

function draw() {
  background("#ffee31ff");

  // when there are no donuts left, show the regenerate button
  if (donuts.length === 0) {
    // creating a button to generate the donuts
    // rectangle background
    fill("#e0311eff");
    noStroke();
    rect(width / 2, height * 0.49, 400, 50);
    // text
    strokeWeight(1);
    stroke("#ffffffff");
    fill("#ffffffff");
    textSize(24);
    textFont("Courier New");
    textAlign(CENTER);
    text("CLICK TO MAKE SOME MORE!", width * 0.5, height * 0.5);
  }

  // display all the donuts in the array
  for (let i = 0; i < donuts.length; i++) {
    donuts[i].display();
  }

  // at the beginning when the all the donuts are still there
  // add instructional text that goes on top of everything
  if (donuts.length === donutAmount) {
    // rectangle background
    fill("#e0311eff");
    noStroke();
    rect(width / 2, height * 0.49, 380, 50);
    // text
    strokeWeight(1);
    stroke("#ffffffff");
    fill("#ffffffff");
    textSize(24);
    textFont("Courier New");
    textAlign(CENTER);
    text("CLICK TO EAT THE DONUTS!", width * 0.5, height * 0.5);
  }
}

// for mouse interactivity
function mousePressed() {
  // when there are donuts on the screen
  if (donuts.length != 0) {
    for (let i = 0; i < donuts.length; i++) {
      // loop through the donut array
      if (donuts[i].isClicked(mouseX, mouseY)) {
        // delete the clicked donut from the array
        donuts.splice(i, 1);
      }
    }
  } else {
    // If there's no donut left, regenerate donuts
    for (let i = 0; i < donutAmount; i++) {
      let newDonut = new Donut(
        random(width),
        random(height),
        random(80, 100),
        random(["original", "strawberry", "chocolate"])
      );
      donuts.push(newDonut);
    }
  }

  // --- old ---
  // generate a random donut wherever users click
  // let newDonut = new Donut(
  //   mouseX,
  //   mouseY,
  //   random(80, 150),
  //   random(["original", "strawberry", "chocolate"])
  // );
  // donuts.push(newDonut);
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
        // drawing the icings as slightly offset dots around the donut
        let icingX = (cos(i) * this.d) / random(1.65, 2);
        let icingY = (sin(i) * this.d) / random(1.6, 2);
        let icingWeight = random(this.d * 0.4, this.d * 0.6);
        this.icing.push({ x: icingX, y: icingY, weight: icingWeight });
      }
      // store these random values in the icing array

      // draw sprinkles only for flavors that are NOT original
      for (let i = 0; i < 360; i += 5) {
        // the sprinkles are smaller and denser offset dots around the donut
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
    // they need a hole in the middle so I did that by making them circles with thick strokes
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

  isClicked(mx, my) {
    // this function checks if the mouse is inside the donut and returns a boolean
    let mouseDist = dist(mx, my, this.x, this.y);
    // the donut is a ring, so check if distance is less than outer radius
    // and greater than inner radius (the hole)
    // since the size of the donut was created using stroke weight I kinda had to eyeball this
    let outerRadius = this.d * 0.875;
    let innerRadius = this.d * 0.1;

    // return true if clicked on the donut ring (not the hole)
    return mouseDist < outerRadius && mouseDist > innerRadius;
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
