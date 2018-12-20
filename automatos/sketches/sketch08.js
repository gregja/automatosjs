p5.disableFriendlyErrors = true;
"use strict";

var degree = Math.PI / 180;

var Stage = new StageContainer({stageWidth: 960, stageHeight:500, fps:60});

var context2d = null;

var displayList1 = new DisplayList({name:'list1'});


function setup() {
  "use strict";
  createCanvas(Stage.stageWidth, Stage.stageHeight);
  frameRate(Stage.fps);

  context2d = this.drawingContext;
  
  var center = Stage.stageHeight/2;
  var square_size = 10;
  
  for (let j=0, jmax=center; j<jmax ; j+=square_size) {
    for (let i=0, imax=center; i<imax ; i+=square_size) {

      let item = {};
      item.name = 'obj_'+j+'_'+i;
      item.trf = {};
      item.trf.xtrans = i; 
      item.trf.ytrans = j; 
      item.oef = {};
    //  item.oef.rotation = 10;
    //  item.oef.xskew = 15;
    //  item.oef.yskew = 20;

      item.vectors = [];
      item.vectors.push({x:0-square_size/2, y:0-square_size/2});
      item.vectors.push({x:square_size/2, y:square_size/2});
      item.color = 'black';
      
      item.dataset = {};
      item.dataset.x = i; 
      item.dataset.y = j; 
      
      let obj = new simpleBall(item); //  new ballradiant(item);
      
      obj.onEachFrame = function() {
        var self = this;
        let fps = frameRate()/10;
        let xwave = Math.sin(fps * degree) * item.dataset.x;
        let ywave = Math.sin(fps * degree) * item.dataset.y;
        self.trf.xtrans = xwave ; //self.dataset.x;
        self.trf.ytrans = ywave ; //self.dataset.y;
      } 
     
      displayList1.addChild(obj);
    }
  }
  Stage.addChild(displayList1);
  
}

function draw() {

  background(240);

  Stage.draw(context2d);

  let fps = frameRate();
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
    console.log('STOP at '+frameCount);
   // console.log(displayList1.getChildren4Debug());
    noLoop();
  }

}
