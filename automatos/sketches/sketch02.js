// améliore les perfs :
//  https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#use-native-js-in-bottlenecks
//p5.disableFriendlyErrors = true;
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

var Stage = new StageContainer({stageWidth: 960, stageHeight:500, fps:60});
Stage.addEventListener(EventContainer.P5CLICKED, null, onMyClick);


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
var displayList2 = new DisplayList({name:'list2'});


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
  item.oef.rotation = 1 ;
  item.color = 'rgb(25, 50, 22)';
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:20, y:80});

  var obj1 = new p5Rect(item); 
  obj1.addEventListener(EventContainer.ADDED, null, onAdded);
  obj1.addEventListener(EventContainer.P5CLICKED, null, onMyClick);


  // Objet 2
  item = {};
  item.name = 'obj2a';
  item.trf = {};
  item.trf.xtrans = 400; 
  item.trf.ytrans = 100; 
  item.oef = {};
  // item.oef.xskew = 15;
  //item.oef.yskew = 2;
  //item.oef.rotation = 3;
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:20, y:100});

  var obj2a = new p5Rect(item); 
  obj2a.addEventListener(EventContainer.ADDED, null, onAdded);
  //obj2a.addEventListener(EventContainer.P5CLICKED, null, onMyClick);


  item = {};
  item.name = 'obj2b';
  item.trf = {};
  item.trf.xtrans = 440; // 275+Math.cos(2*params.ang)*200;
  item.trf.ytrans = 110; // 200+Math.sin(3.2*params.ang)*170;
  item.oef = {};
  //  item.oef.xskew = 15;
  //  item.oef.yskew = 2;
  item.oef.rotation = 3;
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:20, y:100});

  var obj2b = new p5Rect(item); //  new ballradiant(item);
  obj2b.addEventListener(EventContainer.ADDED, null, onAdded);
  //obj2b.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  // Objet 3
  item = {};
  item.name = 'obj3';
  item.trf = {};
  item.trf.xtrans = 300; // 275+Math.cos(2*params.ang)*200;
  item.trf.ytrans = 400; // 200+Math.sin(3.2*params.ang)*170;
  item.oef = {};
  //  item.oef.xpivot = -3;
  //  item.oef.ypivot = -9;
  //  item.oef.rotation = int(random(0, 10));
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:30, y:50});

  item.color = colors[int(random(0, colors.length))];

  var obj3 = new ballradiant(item);
  obj3.addEventListener(EventContainer.ADDED, null, onAdded);
  //obj3.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  // Objet 4
  item = {};
  item.name = 'obj4';
  item.trf = {};
  item.trf.xtrans = 275+Math.cos(2*params.ang);
  item.trf.ytrans = 200+Math.sin(3.2*params.ang)*170;
  item.oef = {};
  //  item.oef.xpivot = 3;
  //  item.oef.ypivot = 5;
  //  item.oef.xscale = 1.001;
  //  item.oef.yscale = 1.001;
  //  item.oef.rotation = 3;
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
  item.trf.ytrans = 400; 
  item.oef = {};
  //  item.oef.xpivot = 3;
  //  item.oef.ypivot = 5;
  //  item.oef.rotation = int(random(0, 10));
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:30, y:50});

  item.color = colors[int(random(0, colors.length))];

  var obj5 = new ballradiant(item);
  obj5.addEventListener(EventContainer.ADDED, null, onAdded);


  displayList1.addChild(obj1); 
  displayList1.addChild(obj2a);
  displayList1.addChild(obj2b);
  displayList1.addChild(obj3);
  displayList1.addChild(obj4);
  displayList1.addChild(obj5); 

  Stage.addChild(displayList1);
  
  
  // List 2 Objet 1
  item = {};
  item.name = 'l1objl1';
  item.trf = {};
  item.trf.xtrans = 100; 
  item.trf.ytrans = 100; 
  item.oef = {};
    item.oef.xpivot = 3;
    item.oef.ypivot = 5;
    item.oef.rotation = int(random(0, 10));
  item.vectors = [];
  item.vectors.push({x:0, y:0});
  item.vectors.push({x:30, y:50});

//  item.color = colors[int(random(0, colors.length))];

  var l1objl1 = new p5Ball(item);
  l1objl1.addEventListener(EventContainer.ADDED, null, onAdded);
  //obj5.addEventListener(EventContainer.P5CLICKED, null, onMyClick);

  displayList2.addChild(l1objl1); 

  
  Stage.addChild(displayList2);


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
