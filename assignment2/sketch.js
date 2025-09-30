//setting up the variables for the background color
let backgroundR = 0;
let backgroundG = 0;
let backgroundB = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  ////////background

  //when mouse is pressed, turn bg to red
  if (mouseIsPressed) {
    //generate a random R value for bg color when mouse is pressed
    //to create a flickering red bg
    backgroundR = random(200, 255);
    backgroundG = 0;
    backgroundB = 0;
  }
  background(backgroundR, backgroundG, backgroundB);

  ////////setting up variables for interactivity

  //angle for rotation responsive to mouseY
  let angle = map(mouseY, 0, height, 0, 360);

  //colors that respond to mouseX and mouseY
  let colorx = map(mouseX, 0, width, 0, 255);
  let colory = map(mouseY, 0, height, 0, 255);

  //size responsive to mouse Y
  //this will be added onto pedalSize
  let sizeIncrease = map(mouseY, 0, height, 0, 60);

  //for loop for the grid
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

      //adding interactive rotation based on mouse position
      rotate(radians(360 - rotation));
      rotate(radians(angle - y / 5));

      //creating a conditional for the shape
      //the shape changes based on mouse click
      if (mouseIsPressed == true) {
        ////////if mouse is pressed, draw darts

        //create a jittering effect using random values
        //applies to each individual shape
        let jitterX = random(-3, 3);
        let jitterY = random(-3, 3);
        translate(jitterX, jitterY);

        //changing the opacity based on mouse position
        //opacity increases as mouse increases (within 100-255)
        let opacity = map(colorx, 0, 255, 100, 255);
        fill(0, 0, 0, opacity);
        stroke(0, 0, 0, opacity);

        //draw darts
        //size increases as mouseY increases
        //decreasing the scale of the transformation
        //since the rotating shapes are half the size of the ellipsis
        drawDart(pedalSize * 0.5 + sizeIncrease * 0.8);

        //restore transformations
        //have to add this here otherwise the grid breaks
        pop();
      } else {
        //otherwise, draw flowers

        //dynamic colors based on mouse position
        //opacity increases as mouseX increases
        //also involving x & y to make the colors vary a bit along the axes
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
  //using ellipsis and rotate ellipsis to create the flower shape
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
  backgroundR = random(255); //generate a random R value for my background color
  backgroundG = random(255); //generate a random G value for my background color
  backgroundB = random(255); //generate a random B value for my background color
}

//resize the window automatically
//reference: https://p5js.org/reference/p5/resizeCanvas/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
