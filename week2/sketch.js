

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  
}

function draw() {

  noStroke();

  fill("white");
  rect(100,100,100,100);

  fill("red");
  circle(windowWidth/2,windowHeight/2,windowHeight/2);

  fill("yellow");
  triangle(200,200,windowWidth/2,windowHeight/2,500,500);

}
