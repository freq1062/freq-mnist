function setup() {
  createCanvas(784 / 2, 784 / 2);
  background(0);
  rectMode(CORNERS);
}

let data = [];

let mnistData = []

for (var i = 0; i < 28; i++) {
  data.push(i * (784 / 28));
  mnistData.push([])
  for (var j = 0; j < 28; j++) {
    mnistData[i].push(0)
  }
}
//console.log(mnistData)

function getInput() {
  let string = "[[[";
  for (var i = 0; i < 28; i++) {
    string = string+"["
    for (var j = 0; j < 28; j++) {
      string = string+(mnistData[i][j]/255)
      string = string+","
    }
    string = string+"],"
  }
  string = string + "]]]";
  return string
}

function getPixelInfo(x, y) {
  let index = (y * img.width + x) * 4;
  let r = img.pixels[index + 0];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  return [r, g, b];
}

function getAreaAverage(xStart, xEnd, yStart, yEnd) {
  let average = [];
  let sum = {
    r: 0,
    g: 0,
    b: 0,
  };
  //console.log(metaX+" "+metaY)
  let imColour = [];
  //console.log(xStart, xEnd, yStart, yEnd)
  for (var x = xStart; x < yStart; x++) {
    for (var y = xEnd; y < yEnd; y++) {
      imColour = getPixelInfo(x, y);
      sum.r = sum.r + imColour[0];
      sum.g = sum.g + imColour[1];
      sum.b = sum.b + imColour[2];
    }
  }
  //if (sum.r >25500) {console.log(sum.r)}
  average.push(sum.r / 100);
  average.push(sum.g / 100);
  average.push(sum.b / 100);
  //average.push([xStart, xEnd, yStart, yEnd])
  //values.push(average);
  push();
  fill(average);
  rect(xStart, yStart, xEnd, yEnd);
  pop();
}

function draw() {
  push();
  stroke(120);
  line(392, 0, 392, 392);
  for (var i = 0; i <= 28; i++) {
    line(0, i * (392 / 28), 392, i * (392 / 28));
    line(i * (392 / 28), 0, i * (392 / 28), 392);
  }
  if (keyIsDown(32)) {
    let diffX = [];
    let diffY = [];
    let x;
    let y;
    for (var j = 1; j < data.length; j++) {
      if (mouseX * 2 - 14 <= data[j] && mouseX * 2 - 14 >= data[j - 1]) {
        //print(data[j], data[j-1],mouseX)
        x = data[j];
      }
      if (mouseY * 2 - 14 <= data[j] && mouseY * 2 - 14 >= data[j - 1]) {
        y = data[j];
      }
    }
    push();
    fill(255);
    noStroke();
    rect(x / 2, y / 2, x / 2 + 14, y / 2 + 14);
    fill(120)
    rect(x / 2 + 14, y / 2 +14, x / 2 + 14+14, y / 2 +14+14);
    pop();
    mnistData[data.indexOf(y)][data.indexOf(x)] = 255;
    mnistData[data.indexOf(y)+1][data.indexOf(x)+1] = 120;
  }
  pop();
  if (keyIsPressed) {
    if (keyIsDown(68)) {
      console.log(getInput());
      noLoop();
    }
  }
}
