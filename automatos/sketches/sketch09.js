//p5.disableFriendlyErrors = true;
"use strict";


var Stage = new StageContainer({stageWidth: 960, stageHeight:500, fps:60});

var context2d = null;

var displayList1 = new DisplayList({name:'list1'});

var obj1 = null;

function setup() {
  "use strict";
  createCanvas(Stage.stageWidth, Stage.stageHeight);
  frameRate(Stage.fps);

  context2d = this.drawingContext;

  // Objet 1
  let item1 = {};
  item1.name = 'obj_1';
  //  item1.children = new DisplayList({name:'list_c1'});
  item1.color = 'blue';
  item1.trf = {};
  item1.trf.xtrans = 10;
  item1.trf.ytrans = 10;
  item1.oef = {};
  // item1.oef.rotation = .5;
  item1.color = 'rgba(10, 50, 20, .8)';
  item1.vectors = [];
  item1.vectors.push({x:0, y:0});
  item1.vectors.push({x:10, y:10});

  item1.dataset = {};
  item1.dataset.begin = 100;
  item1.dataset.finish = 420;
  item1.dataset.change = item1.dataset.finish - item1.dataset.begin;
  item1.dataset.duration = 60;
  item1.dataset.time = 0;
  
  obj1 = new canvasRect(item1);

  obj1.onEachFrame = function() {
    let calcpos = MathFX.easeInOutQuad(this.dataset.time++, this.dataset.begin, 
                                          this.dataset.change, this.dataset.duration);
    this.setTranslation(calcpos, 10);
      console.log(calcpos);
      if (this.dataset.time > this.dataset.duration) {
        console.log('delete');
        delete this.onEachFrame;
      }
  } 

  
  displayList1.addChild(obj1);

  Stage.addChild(displayList1);

}

function draw() {

  background(240);


/*    let calcpos = MathFX.easeInOutQuad(obj1.dataset.time++, obj1.dataset.begin, 
                                          obj1.dataset.change, obj1.dataset.duration);
    obj1.setTranslation(calcpos, 10);
      console.log(calcpos);
      if (obj1.dataset.time > obj1.dataset.duration) {
        console.log('delete');
        delete obj1.onEachFrame;
      }*/
  
  
  Stage.draw(context2d);

  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
  
  if (frameCount > 570) {
    console.log('draw function stopped')
    noLoop();  
  }
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
