var s = function( sketch ) {

  "use strict";

  // to improve performances
  //  https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#use-native-js-in-bottlenecks
  p5.disableFriendlyErrors = true;

  var cnv1; // canvas
  var canvas_width = 1200;
  var canvas_height = canvas_width;
  
  function save_picture() {
    var tmp_name = "xxxx" + sketch.frameCount ;       
    // on profite de la fonction saveCanvas fournie par P5
    sketch.saveCanvas(cnv1, tmp_name, 'png');
    // vidage du canvas 
    cnv1.clear();
  }
  
  sketch.setup = function() {
    var target = document.getElementById('canvases');

    cnv1 = sketch.createCanvas(canvas_width, canvas_height);
    cnv1.elt.setAttribute('id', 'canvas1');
    cnv1.elt.setAttribute('style', 'z-index:2;position:absolute;left:0px;top:80px;width:'+canvas_width+'px; height:'+canvas_height+'px;');
    cnv1.elt.setAttribute('width', canvas_width );
    cnv1.elt.setAttribute('height', canvas_height );
    cnv1.parent(canvases);
    cnv1.background(255);

  };

  sketch.draw = function() {
    
  }
  
  sketch.mousePressed = function() {
    if (sketch.mouseX < 0 || sketch.mouseX > canvas_width || 
        sketch.mouseY < 0 || sketch.mouseY > canvas_height) {
      // we are not in the canvas, get out !
      return;
    }

  };

  sketch.keyPressed = function() {
    // console.log(keyCode);
    var tmpkey = sketch.key.toLowerCase();
    if (tmpkey == 'x') {
      noLoop();
    } else {
      if (tmpkey == 's') {
        save_picture();

      }
    }
  }

};

var myp5 = new p5(s);