// améliore les perfs :
//  https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance

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

//var displayList2 = new DisplayList({name:'list2'});
var objs = [];

function setup() {
  createCanvas(Stage.stageWidth, Stage.stageHeight);
  frameRate(Stage.fps);

  context2d = this.drawingContext;

  // Objet 2
  let item1 = {};
  item1.name = 'obj_1';
  item1.children = new DisplayList({name:'list_c1'});
  item1.trf = {};
  item1.trf.xtrans = 200;
  item1.trf.ytrans = 100;
  item1.oef = {};
  item1.oef.rotation = .5;
  item1.color = 'rgba(10, 50, 20, .8)';
  item1.vectors = [];
  item1.vectors.push({x:0, y:0});
  item1.vectors.push({x:20, y:100});

  let obj1 = new canvasRect(item1);

  let item2 = copyObject(item1);
  item2.name = 'obj_2';
  item2.children = new DisplayList({name:'list_c2'});
  item2.color = 'rgba(30, 20, 80, .6)';
  item2.trf.xtrans = 30;
  item2.trf.ytrans = 25;
  item2.oef = {};
  item2.oef.rotation = .1;
  let obj2 = new canvasRect(item2);

  let item3a = copyObject(item2);
  item3a.name = 'obj_3a';
  item3a.children = new DisplayList({name:'list_c3a'});
  item3a.color = 'rgba(70, 20, 40, .5)';
  item3a.trf.xtrans = 30;
  item3a.trf.ytrans = 15;
  //  item3a.oef = {};
  item3a.oef.rotation += .2;
  let obj3a = new canvasRect(item3a);

  let item3b = copyObject(item3a);
  item3b.name = 'obj_3b';
  item3b.children = new DisplayList({name:'list_c3b'});
  item3b.color = 'rgba(20, 40, 60, .5)';
  item3b.trf.xtrans = 60;
  item3b.trf.ytrans = 30;
  //  item3b.oef = {};
  //  item3b.oef.rotation += .3;
  let obj3b = new canvasRect(item3b);

  let item3c = copyObject(item3b);
  item3c.name = 'obj_3c';
  item3c.children = new DisplayList({name:'list_c3c'});
  item3c.color = 'rgba(30, 40, 70, .4)';
  item3c.trf.xtrans = -60;
  item3c.trf.ytrans = -30;
  //  item3c.oef = {};
  item3c.oef.rotation += .4;
  let obj3c = new canvasRect(item3c);

  let item3d = copyObject(item3b);
  item3d.name = 'obj_3d';
  item3d.children = new DisplayList({name:'list_c3c'});
  item3d.color = 'rgba(80, 20, 40, .4)';
  item3d.trf.xtrans = -80;
  item3d.trf.ytrans = -50;
  //  item3c.oef = {};
  item3d.oef.rotation += .6;
  let obj3d = new canvasRect(item3d);

  let item3e = copyObject(item3b);
  item3e.name = 'obj_3e';
  item3e.children = new DisplayList({name:'list_c3c'});
  item3e.color = 'rgba(20, 50, 70, .4)';
  item3e.trf.xtrans = 40;
  item3e.trf.ytrans = -50;
  //  item3c.oef = {};
  item3e.oef.rotation += .9;
  let obj3e = new canvasRect(item3e);


  obj2.children.addChild(obj3a);
  obj2.children.addChild(obj3b);
  obj2.children.addChild(obj3c);
  obj2.children.addChild(obj3d);
  obj2.children.addChild(obj3e);

  obj2.children.addChild(obj3d);

  obj1.children.addChild(obj2);

  displayList1.addChild(obj1);

  for (let j=0, jmax=Stage.stageHeight; j<jmax ; j+=20) {
    for (let i=0, imax=Stage.stageWidth; i<imax ; i+=20) {
      // Objet 2
      let item = {};
      item.name = 'obj_'+j+'_'+i;
      item.color = 'rgba(30, 60, 50, .2)';
      item.trf = {};
      item.trf.xtrans = 10+i;
      item.trf.ytrans = 10+j;
      item.oef = {};
      //     item.oef.xskew = 10;
      //     item.oef.yskew = 20;
      item.oef.rotation = .9;
      item.vectors = [];
      item.vectors.push({x:0, y:0});
      item.vectors.push({x:20, y:100});

      let obj = new canvasRect(item);
      objs.push(obj)
      displayList1.addChild(obj);
    }
  }

  Stage.addChild(displayList1);

}

function draw() {

  background(240);

  Stage.draw(context2d);

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

  if (tmpkey == 'a') {
    for (let j=0, jmax=objs.length; j<jmax ; j+=1) {
      let obj = objs[j];
      obj.oef.xskew = 10;
      obj.oef.yskew = 20;
    }
  }
}
