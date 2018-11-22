// inspired by an Actionscript code of Glenn Rhodes
// published in the book "Flash Math Creativity, 2nd edition" (FriendsofED 2004)

// améliore les perfs :
//  https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#use-native-js-in-bottlenecks
p5.disableFriendlyErrors = true;
"use strict";

var onMyClick = function (event) {
  console.log('clic/ onMyClick');
  let x = mouseX;
  let y = mouseY;

  // console.log (Stage._getMouseObjectUnder(mouseX, mouseY, EventContainer.target));
  let touched = Stage._getMouseObjectUnder(x, y, Stage);
  if (touched == null) {
    console.log('raté !!! ', x, y);
  } else {
    console.log('touché !!!', touched.name, x, y);
  }
}

var Stage = new StageContainer({stageWidth: 700, stageHeight:400, fps:60});
Stage.addEventListener(EventContainer.P5CLICKED, null, onMyClick);


var onAdded = function (event){
  console.log(EventContainer.type);
}

var onDropped = function (event){
  console.log(EventContainer.type);
}

var context2d = null;

var rects = [];
rects.push({x:10, y:50, width:10, height:20});
rects.push({x:50, y:90, width:20, height:10});
rects.push({x:90, y:100, width:40, height:20});
rects.push({x:70, y:130, width:60, height:20});
rects.push({x:140, y:140, width:60, height:20});
rects.push({x:170, y:180, width:60, height:20});
rects.push({x:250, y:130, width:60, height:20});
rects.push({x:300, y:240, width:60, height:20});
rects.push({x:10, y:240, width:60, height:60});

const searchCollisions = function(x, y, width, height) {
  var nb_collisions = 0;
  let x0 = x;
  let x3 = x+width;
  let y0 = y;
  let y3 = y+height;

  let i = rects.length;
  while (i--) {
    let item = rects[i];
    let x1 = item.x;
    let x2 = item.x + item.width;
    let y1 = item.y;
    let y2 = item.y + item.height;

    let check = x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
    if (!check) {
      nb_collisions++;
    }
  }
  return nb_collisions;
}

var displayList1 = new DisplayList({name:'list1'});

var parms_verticale = {x:0, y:0, width:1, height:Stage.stageHeight};
var barre_verticale = null;

var com_exterieur = null;

function setup() {
  createCanvas(Stage.stageWidth, Stage.stageHeight);
  frameRate(Stage.fps);

  context2d = this.drawingContext;

  rects.forEach((rect, idx) => {
    let item = {};
    item.name = 'obj_'+(idx+1);
    item.trf = {};
    item.trf.xtrans = rect.x/2; 
    item.trf.ytrans = rect.y/2; 
    // item.oef = {};
    // item.oef.rotation = 1;
    item.color = "blue"; // 'rgb(0,0,255)';
    item.vectors = [];
    item.vectors.push({x:0, y:0});
    item.vectors.push({x:rect.width, y:rect.height});

    // avec p5Rect, le premier sprite a la bonne couleurs, les autres sont blanc... bug P5 ???
    // avec canvasRect, tous les sprites ont la bonne couleur... ouf !!
    displayList1.addChild(new canvasRect(item));  
  });
  
  let vert = {};
  vert.name = 'verti';
  vert.color = "rgb(255,0,0)";
  vert.vectors = [];
  vert.vectors.push({x:0, y:0});
  vert.vectors.push({x:1, y:Stage.stageHeight});
  barre_verticale = new canvasRect(vert); 
  
  displayList1.addChild(barre_verticale);
  
  Stage.addChild(displayList1);

  // création d'une zone de communication à l'intérieur du DOM
  var canvas_ptr = document.getElementById('defaultCanvas0')
  if (canvas_ptr) {
    let parent = canvas_ptr.parentNode;
    com_exterieur = document.createElement('div');
    parent.appendChild(com_exterieur);
  }
}

function draw() {

  background(200);

  let bar_coords = barre_verticale.coords;
  bar_coords.xmin = mouseX;
  
  Stage.draw(context2d);


  let nb_collisions = searchCollisions(bar_coords.xmin, bar_coords.ymin, bar_coords.width, bar_coords.height);
  com_exterieur.innerHTML = 'Nombre de collisions : '+ nb_collisions;
  
  // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance
  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function mouseClicked() {
  console.log('clicked');
  var event =  new EventContainer(EventContainer.P5CLICKED, true, true);
  Stage.dispatchEvent(event);

}

function keyPressed() {
  // console.log(keyCode);
  var tmpkey = key.toLowerCase();
  if (tmpkey == 'x') {
    console.log('STOP');
    console.log(displayList1.getChildren4Debug());
    noLoop();
  }
}
