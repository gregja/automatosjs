// inspired by an Actionscript code of Glenn Rhodes
// published in the book "Flash Math Creativity, 2nd edition" (FriendsofED 2004)

// améliore les perfs :
//  https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#use-native-js-in-bottlenecks
//p5.disableFriendlyErrors = true;
"use strict";
var Stage = new StageContainer({stageWidth: 960, stageHeight:500, fps:60});

var onClicked = function (event) {
  console.log('clic/ onClicked');
  console.log(mouseX, mouseY);
  console.log(event) ;
}

var onMyClick = function (event) {
  console.log('clic/ onMyClick');
  console.log(event);
}

var onAdded = function (event)
{
  console.log(EventContainer.type);
}

var onDropped = function (event)
{
  console.log(EventContainer.type);
}


var context2d = null;

var params = {};
params.dx = 4;
params.dy = 4;
params.dr = 1;
params.rotation = 0;
params.ang = 0;

var colors = ['red', 'yellow', 'blue', 'brown', 'purple', 'maroon', 'black', 'silver'];

var displayList1 = new DisplayList({name:'list1'});


function setup() {

  createCanvas(Stage.stageWidth, Stage.stageHeight);
  frameRate(Stage.fps);

  context2d = this.drawingContext;

  var item = {};

  // Objet 1
  item = {};
  item.name = 'obj1';
  item.trf = {};
  item.trf.xtrans = 200; 
  item.trf.ytrans = 100; 
  item.oef = {};
  item.oef.xpivot = 2;
  item.oef.rotation = 1 ; // int(random(0, 180));
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:10, y:50});

  var obj1 = new p5Rect(item); 
  obj1.addEventListener(EventContainer.ADDED, null, onAdded);
  obj1.addEventListener(EventContainer.P5CLICKED, null, onMyClick);


  // Objet 2
  item = {};
  item.name = 'obj2a';
  item.trf = {};
  item.trf.xtrans = 300; 
  item.trf.ytrans = 100; 
  item.oef = {};
  item.oef.xskew = 15;
  item.oef.yskew = 2;
  item.oef.rotation = 3;
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:20, y:100});

  var obj2a = new p5Rect(item); 
  obj2a.addEventListener(EventContainer.ADDED, null, onAdded);
  obj2a.addEventListener(EventContainer.P5CLICKED, null, onMyClick);


  item = {};
  item.name = 'obj2b';
  item.trf = {};
  item.trf.xtrans = 440; 
  item.trf.ytrans = 110; 
  item.oef = {};
  item.oef.xskew = 15;
  item.oef.yskew = 2;
  item.oef.rotation = 3;
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:20, y:100});

  var obj2b = new p5Rect(item); 
  obj2b.addEventListener(EventContainer.ADDED, null, onAdded);
  obj2b.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  // Objet 3
  item = {};
  item.name = 'obj3';
  item.trf = {};
  item.trf.xtrans = 300; 
  item.trf.ytrans = 400;
  item.oef = {};
  item.oef.xpivot = -3;
  item.oef.ypivot = -9;
  item.oef.rotation = int(random(0, 10));
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:30, y:50});

  item.color = colors[int(random(0, colors.length))];

  var obj3 = new ballradiant(item);
  obj3.addEventListener(EventContainer.ADDED, null, onAdded);
  obj3.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  // Objet 4
  item = {};
  item.name = 'obj4';
  item.trf = {};
  item.trf.xtrans = 275+Math.cos(2*params.ang);
  item.trf.ytrans = 200+Math.sin(3.2*params.ang)*170;
  item.oef = {};
  item.oef.xpivot = 3;
  item.oef.ypivot = 5;
  item.oef.xscale = 1.001;
  item.oef.yscale = 1.001;
  item.oef.rotation = 3;
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:30, y:50});

  var obj4 = new ballradiant(item);
  obj4.addEventListener(EventContainer.ADDED, null, onAdded);  
  obj4.addEventListener(EventContainer.REMOVED, null, onAdded);
  obj4.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  // Objet 5
  item = {};
  item.name = 'obj5';
  item.trf = {};
  item.trf.xtrans = 200; 
  item.trf.ytrans = 150; 
  item.oef = {};
  item.oef.xpivot = 3;
  item.oef.ypivot = 5;
  item.oef.rotation = int(random(0, 10));
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:30, y:50});

  item.color = colors[int(random(0, colors.length))];

  var obj5 = new ballradiant(item);
  obj5.addEventListener(EventContainer.ADDED, null, onAdded);
  obj5.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  displayList1.addChild(obj1);
  displayList1.addChild(obj2a);
  displayList1.addChild(obj2b);
  displayList1.addChild(obj3);
  displayList1.addChild(obj4);
  displayList1.addChild(obj5);

  Stage.addChild(displayList1);


}

function draw() {

  background(128);


  if (frameCount > 1000) {

    let obj4 = displayList1.getChildByName('obj4');
    if (obj4) {
      if (obj4.trf.xscale < 1) {
        obj4.trf.xscale += .0001;
        obj4.trf.yscale += .0001;
      } else {
        obj4.parent.removeChild(obj4);
      }
    }

  }

  Stage.draw(context2d);

  // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance
  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}


function mouseClicked() {
  let evt = new EventContainer(EventContainer.P5CLICKED, true, true);
  Stage.dispatchEvent( evt );
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
