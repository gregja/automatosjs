//p5.disableFriendlyErrors = true;
"use strict";

var selected = null;
var dragged = false;
var zoom_start = 1;
var zoom_min = .1;
var zoom_max = 4;

var onMousePressed = function (event) {
  var x = mouseX;
  var y = mouseY;
  // on déselectionne l'objet sélectionné précédemment
  if (selected != null && selected.selected) {
    selected.selected = false;
    selected.zoom = 1;
  }
  // recherche de l'objet sélectionné maintenant
  selected = Stage._getMouseObjectUnder(x, y, Stage);
  if (selected == null) {
    console.log('raté !!! ', x, y);
  } else {
    selected.selected = true;
    selected.touched = true;
    console.log('object selected => ', selected.name, x, y);
    selected.zoom = zoom_start;
  }
  return false;
}

var onMouseReleased = function (event) {
  if (selected != null && selected.touched) {
    console.log(selected.name + ' released');
    selected.touched = false;
  }
  return false;
}


var Stage = new StageContainer({stageWidth: 960, stageHeight:500, fps:20});

Stage.addEventListener(EventContainer.P5MPRESSED, null, onMousePressed);
Stage.addEventListener(EventContainer.P5MRELEASED, null, onMouseReleased);
//Stage.addEventListener(EventContainer.P5MWHEEL, null, onMouseWheel);

var onAdded = function (event)
{
  console.log(EventContainer.type);
}

var onDropped = function (event)
{
  console.log(EventContainer.type);
}

var context2d = null;

var displayList1 = new DisplayList({name:'list1'});

function setup() {
  createCanvas(Stage.stageWidth, Stage.stageHeight);
  frameRate(Stage.fps);

  context2d = this.drawingContext;

  // Objet 1
  let item1 = {};
  item1.name = 'obj_1';
//  item1.children = new DisplayList({name:'list_c1'});
  item1.color = 'blue';
  item1.trf = {};
  item1.trf.xtrans = 100;
  item1.trf.ytrans = 100;
  item1.oef = {};
 // item1.oef.rotation = .5;
  item1.color = 'rgba(10, 50, 20, .8)';
  item1.vectors = [];
  item1.vectors.push({x:0, y:0});
  item1.vectors.push({x:100, y:50});

  let obj1 = new canvasRect(item1);

  displayList1.addChild(obj1);

  // Objet 1
  let item2 = {};
  item2.name = 'obj_2';
  //  item1.children = new DisplayList({name:'list_c1'});
  item2.color = 'blue';
  item2.trf = {};
  item2.trf.xtrans = 200;
  item2.trf.ytrans = 150;
  item2.oef = {};
  item2.oef.rotation = .5;
  item2.color = 'rgba(10, 50, 20, .8)';
  item2.vectors = [];
  item2.vectors.push({x:0, y:0});
  item2.vectors.push({x:100, y:50});

  let obj2 = new canvasRect(item2);

  displayList1.addChild(obj2);

  Stage.addChild(displayList1);

}

function draw() {

  background(240);

  if (dragged && selected) {
    console.log('dragged / draw => '+selected.name);
    let x = mouseX;
    let y = mouseY;
    selected.setTranslation(x, y);
  }
  
  Stage.draw(context2d);

  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function mousePressed() {
  dragged = true;
  console.log('mouse pressed');
  var event =  new EventContainer(EventContainer.P5MPRESSED, true, true);
  Stage.dispatchEvent(event);
  return false;
}

function mouseReleased() {
  dragged = false;
  console.log('mouse released');
  var event =  new EventContainer(EventContainer.P5MRELEASED, true, true);
  Stage.dispatchEvent(event);
  return false;
}


function mouseWheel(event) {
  event.stopPropagation();
  console.log('mouse wheel => '+event.delta);
  if (selected != null) {
    selected.zoom = selected.zoom + (event.delta / 100);
    if (selected.zoom < zoom_min) {
      selected.zoom = zoom_min;
    }
    if (selected.zoom > zoom_max) {
      selected.zoom = zoom_max;
    }
    console.log(selected.zoom);
    selected.trf.xscale = selected.zoom;
    selected.trf.yscale = selected.zoom;
    selected.zoom = zoom_start;
  }
  return false;
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
