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
      item1.color = 'grey';
      item1.vectors = [];
      item1.vectors.push({x:0, y:0});
      item1.vectors.push({x:20, y:100});

      let obj1 = new p5Rect(item1);

      let item2 = copyObject(item1);
      item2.name = 'obj_2';
      item2.children = new DisplayList({name:'list_c2'});
      item2.color = 'silver';
      item2.trf.xtrans = 30;
      item2.trf.ytrans = 25;
      item2.oef = {};
      item2.oef.rotation = .1;
      let obj2 = new p5Rect(item2);

      let item3a = copyObject(item2);
      item3a.name = 'obj_3a';
      item3a.children = new DisplayList({name:'list_c3a'});
      item3a.color = 'white';
      item3a.trf.xtrans = 30;
      item3a.trf.ytrans = 15;
    //  item3a.oef = {};
      item3a.oef.rotation += .2;
      let obj3a = new p5Rect(item3a);

      let item3b = copyObject(item3a);
      item3b.name = 'obj_3b';
      item3b.children = new DisplayList({name:'list_c3b'});
      item3b.color = 'white';
      item3b.trf.xtrans = 60;
      item3b.trf.ytrans = 30;
    //  item3b.oef = {};
    //  item3b.oef.rotation += .3;
      let obj3b = new p5Rect(item3b);

      let item3c = copyObject(item3b);
      item3c.name = 'obj_3b';
      item3c.children = new DisplayList({name:'list_c3c'});
      item3c.color = 'blue';
      item3c.trf.xtrans = -60;
      item3c.trf.ytrans = -30;
    //  item3c.oef = {};
      item3c.oef.rotation += .4;
      let obj3c = new p5Rect(item3c);

  console.log(item3a.oef.rotation);
  console.log(item3b.oef.rotation);
  console.log(item3c.oef.rotation);

      obj2.children.addChild(obj3a);
      obj2.children.addChild(obj3b);
      obj2.children.addChild(obj3c);
      obj1.children.addChild(obj2);

      displayList1.addChild(obj1);

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
}
