// inspired by an Actionscript code of Glenn Rhodes
// published in the book "Flash Math Creativity, 2nd edition" (FriendsofED 2004)

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


var onAdded = function (event){
  console.log(EventContainer.type);
}

var onDropped = function (event){
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

  for (let j=0, jmax=300; j<jmax ; j+=20) {
    for (let i=0, imax=300; i<imax ; i+=20) {
      // Objet 2
      let item = {};
      item.name = 'obj_'+j+'_'+i;
      item.trf = {};
      item.trf.xtrans = 100+i; 
      item.trf.ytrans = 10+j; 
      item.oef = {};
    // item.oef.xskew = 15;
    // item.oef.yskew = 20;
      item.oef.rotation = 2;
      item.vectors = [];
      item.vectors.push({x:0, y:0});
      item.vectors.push({x:20, y:100});

      let obj = new p5Rect(item); //  new ballradiant(item);
      displayList1.addChild(obj);
    }
  }
  Stage.addChild(displayList1);


}

function draw() {

  background(128);

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
