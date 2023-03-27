var canvas = document.getElementById("myCanvas");
//var ctx = c.getContext("2d");
/*
onmousemove = function(e){
    //console.log("mouse location:", e.clientX, e.clientY)
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 20, 0, 2 * Math.PI);
    ctx.stroke();
}*/
// create canvas element and append it to document body
//var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let finalData = "["
// some hotfixes... ( ≖_≖)
document.body.style.margin = 0;
canvas.style.position = 'fixed';

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d');
const quadrants = []
let row = []
for (var i = 0; i < 28; i++){
    row = [];
    for (var j = 0; j < 28; j++) {
        row.push({
            x1: i*10,
            y1: j*10,
            x2: i*10+10,
            y2: j*10+10,
            color: "black"        
        })
    }
    quadrants.push(row)
}
ctx.beginPath();
ctx.rect(0, 0, 280, 280)
ctx.fillStyle = "black";
ctx.fill()
//resize();
let drawing = true
// last known position
var pos = { x: 0, y: 0 };

//window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// resize canvas
/*
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}*/

function draw(e) {
    if (drawing == false) {return;}
    //ctx.stroke();
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = 20;
  ctx.lineCap = 'square';
  ctx.strokeStyle = 'white';

  if (pos.x <=279 && pos.y <=279){
    ctx.moveTo(pos.x, pos.y)
    setPosition(e);
    
    for (var j = 0; j < 28; j++) {
        for (var k = 0; k < 28; k++) {
            if (pos.x >= quadrants[j][k].x1 && pos.x <= quadrants[j][k].x2 && pos.y >= quadrants[j][k].y1 && pos.y <= quadrants[j][k].y2) {
                quadrants[j][k].color = "white";
                quadrants[j+1][k].color = "white"
                quadrants[j-1][k].color = "white"
                quadrants[j][k+1].color = "white";
                quadrants[j][k-1].color = "white"
            }
        }
    }
    }; // from
 // to
  ctx.stroke(); // draw it!
  for (var y = 0; y < 28; y++) {
      for (var x = 0; x < 28; x++) {
      ctx.beginPath()
      ctx.rect(quadrants[y][x].x1, quadrants[y][x].y1, quadrants[y][x].x2, quadrants[y][x].y2)
      ctx.lineWidth = 0.01;
      ctx.strokeStyle = "red";
      ctx.fillStyle = quadrants[y][x].color
      ctx.fill()
      ctx.stroke();          
      }
  }
}
onkeydown = function (e) {
    if (drawing == false) {return;}
    console. log('generating data...'); console. log(e);
    drawing = false
    for (var y = 0; y < 28; y++) {
        finalData = finalData + "["
        for (var x = 0; x < 28; x++) {
            if (quadrants[x][y].color == "white") {
                finalData = finalData+"255,"
            } else {finalData = finalData+"0,"}
        }
        finalData = finalData+"]"
        if (y<27) {finalData = finalData+","}
        }
    finalData = finalData + "]"
    console.log(finalData)
};