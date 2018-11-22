class ballradiant extends Sprite {

  draw (context){
    context.save();
    var grd = context.createRadialGradient(0, 0, 0, 0, 0, this.coords.width);
    grd.addColorStop(0,"red");
    grd.addColorStop(1,"white");
    context.fillStyle = grd;

    context.beginPath();
    context.arc(this.coords.xmin, this.coords.ymin, this.coords.width, this.coords.height, TWO_PI, true);
    context.closePath();
    context.fill();
    context.restore();
  }

};


class simpleBall extends Sprite {

  draw (context) {
    context.beginPath();
    context.arc(this.coords.xcenter, this.coords.ycenter, this.coords.width,0,2*Math.PI);
    context.stroke();
  }

};



class p5Ball extends Sprite {

  draw (context) {
    context.save();
    ellipseMode(CORNER);
    var grd = context.createRadialGradient(0, 0, 0, 0, 0, this.coords.width);
    grd.addColorStop(0,"red");
    grd.addColorStop(1,"white");
    context.fillStyle = grd;
    ellipse(this.coords.xmin, this.coords.ymin, this.coords.width, this.coords.height);
    context.restore();
  }

};



class p5Rect extends Sprite {

  draw (context) {
    context.save();
    let rgba = this.color ;
    let c = color(rgba);
    stroke(c);
    fill(c);
    rect(this.coords.xmin, this.coords.ymin, this.coords.width, this.coords.height);
    context.restore();
  }

};

class canvasRect extends Sprite {

  draw (context){
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.coords.xmin, this.coords.ymin, this.coords.width, this.coords.height);
    context.restore();
  }

};

