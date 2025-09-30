//setting up background color
let backgroundR = 0;
let backgroundG = 0;
let backgroundB = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //conditional for background
  if (mouseIsPressed) {
    backgroundR = random(200, 255); //flickering red effect
    backgroundG = 0;
    backgroundB = 0;
    // generate a random R value for bg color when mouse is pressed
    // to create a flickering red bg
  }
  background(backgroundR, backgroundG, backgroundB);

  //setting up variables for interactivity
  //setting angle for rotation
  let angle = map(mouseY, 0, height, 0, 360);
  //setting colors that respond to mouseX and mouseY
  let colorx = map(mouseX, 0, width, 0, 255);
  let colory = map(mouseY, 0, height, 0, 255);
  //setting a size that's responsive to mousemovement
  //this will be added onto pedalSize
  let sizeIncrease = map(mouseY, 0, height, 0, 40);

  //setting a rotation that is responsive to mouse position

  for (let x = 50; x < width; x += 100) {
    for (let y = 50; y < height; y += 100) {
      push();

      translate(x, y);

      ///////variation on y axis
      //increasing the size as y increases
      let pedalSize;
      pedalSize = map(y, 0, height, 90, 120);
      //rotating slightly as y increases
      let rotation;
      rotation = map(y, 0, height, 0, 90);

      strokeWeight(4);
      noFill();

      //creating a conditional for the shape
      //the shape changes based on mouseclick

      //adding interactive rotation based on mouse position
      rotate(radians(360 - rotation));
      rotate(radians(angle - y / 5));

      if (mouseIsPressed == true) {
        //if mouse is pressed, draw darts
        //create a jittering effect
        let jitterX = random(-3, 3);
        let jitterY = random(-3, 3);
        translate(jitterX, jitterY);

        //changing the color and opacity based on mouse position
        //also making the colors vary a bit along the axes
        let opacity = map(colorx, 0, 255, 100, 255);
        fill(0, 0, 0, 100 + opacity);
        stroke(0, 0, 0, 100 + opacity);

        //calling dart functions
        //size increases as mouseY increases
        //decreasing the scale of the transformation
        //since the rotating shapes are half the size of the ellipsis
        drawDart(pedalSize * 0.5 + sizeIncrease * 0.8);
        pop();
        //have to add this here otherwise the grid breaks
      } else {
        //otherwise, drawflowers

        //changing the colors and opacity based on mouse position
        //opacity increases as mouseX increases
        //a different color scheme from dart (bluer)
        //also making the colors vary a bit along the axes
        fill(colorx - x * 0.2, colory - y * 0.3, 200, colorx / 2);
        stroke(colorx - x * 0.2, colory - y * 0.3, 200, 150);

        //calling custom funciton to draw the flowers
        //size increases as mouseY increases
        drawFlower(15, pedalSize + sizeIncrease);

        pop();
      }
    }
  }
}

//creating a function to draw the shapes
//so it's easier to read through the code
//reference: https://p5js.org/reference/p5/function/
//these are all small shapes repeated in a radial pattern
function drawFlower(w, h) {
  //using ellipsis and rotate to create the flower shape
  rotate(radians(22.5));
  ellipse(0, 0, w, h);
  rotate(radians(45));
  ellipse(0, 0, w, h);
  rotate(radians(45));
  ellipse(0, 0, w, h);
  rotate(radians(45));
  ellipse(0, 0, w, h);
}

function drawDart(h) {
  //creating the center
  strokeWeight(5);
  ellipse(0, 0, 20, 20);

  //the dart shape is more complicated
  //so I am making a for loop to avoid drawing the shape too many times
  //this will repeat every 60 degrees to create the radial shape
  for (let x = 0; x < 360; x += 60) {
    push(); //save the current transform
    rotate(radians(x)); //rotate this blade only
    //drawing a triangular blade to be repeated
    beginShape();
    //base
    vertex(-10, -10);
    vertex(-10, -15);
    vertex(0, -h); //tip of the blade
    vertex(10, -15);
    vertex(6, -6);
    endShape(CLOSE);
    pop(); //restore for next blade
  }
}

//changing the background color when the mouse is released
function mouseReleased() {
  backgroundR = random(255); // generate a random R value for my background color
  backgroundG = random(255); // generate a random G value for my background color
  backgroundB = random(255); // generate a random B value for my background color
}
