class StageContainer extends DisplayList {

  constructor(args={}){
    super();
    this.init(args);
  }

  init(args) {
    this.stageWidth = args.stageWidth || 100;
    this.stageHeight = args.stageHeight || 100;
    this.backgroundColor = args.backgroundColor || "white"; 
    this.mouseX = args.x || this.stageWidth / 2;
    this.mouseY = args.y || this.stageHeight / 2;
    this.fps = args.fps || 60;
  }

  setMouseCoords(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  }

  setMouseEvent(event) {
    // TODO à approfondir (event transmis par P5 ?)
    this.mouseEvent = event;
  }

  _mouseHandler (event)
  {
    var bounds = this._canvas.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    var activeChild = this._getMouseObjectUnder(x,y,this);
    var mouseEvent = null;
    var i = 0;
    this.mouseX = x;
    this.mouseY = y;
    if( event.type == "mousemove" && this._lastActiveChild != activeChild )
    {
      if( activeChild != null )
      {
        mouseEvent = MouseEvent.fromNativeMouseEvent(event,true,true,x,y);
        mouseEvent.type = MouseEvent.ROLL_OVER;
        activeChild.dispatchEvent(mouseEvent);
      }
      if( this._lastActiveChild != null )
      {
        mouseEvent = MouseEvent.fromNativeMouseEvent(event,true,true,x,y);
        mouseEvent.type = MouseEvent.ROLL_OUT;
        this._lastActiveChild.dispatchEvent(mouseEvent);
      }
    }
    else
    {
      if( activeChild != null )
      {
        mouseEvent = MouseEvent.fromNativeMouseEvent(event,true,true,x,y);
        activeChild.dispatchEvent(mouseEvent);
      }
    }
    this._lastActiveChild = activeChild;
  }

  _p5mouseHandler (eventType, x, y)
  {
    this.mouseX = x;
    this.mouseY = y;
    if( eventType == "mousemove" && this._lastActiveChild != activeChild )
    {
      if( activeChild != null )
      {
        mouseEvent = MouseEvent.fromNativeMouseEvent(event,true,true,x,y);
        mouseEvent.type = MouseEvent.ROLL_OVER;
        activeChild.dispatchEvent(mouseEvent);
      }
      if( this._lastActiveChild != null )
      {
        mouseEvent = MouseEvent.fromNativeMouseEvent(event,true,true,x,y);
        mouseEvent.type = MouseEvent.ROLL_OUT;
        this._lastActiveChild.dispatchEvent(mouseEvent);
      }
    }
    else
    {
      if( activeChild != null )
      {
        mouseEvent = MouseEvent.fromNativeMouseEvent(event,true,true,x,y);
        activeChild.dispatchEvent(mouseEvent);
      }
    }
    this._lastActiveChild = activeChild;
  }

  _getMouseObjectUnder (x,y,container) {
    var under = null;
    var children = container.children;
    var i = children.length;
    var child = null;
    while( --i > -1 ) {
      let child = children[i];
      if( child.children ) {
        under = this._getMouseObjectUnder(x,y,child);
        if( under != null )
          return under;
      } else {
        if( child.type == "displayObject" && child.mouseEnabled == true &&  child.hitTestPoint(x,y) == true )  {
          return child;
        }
      }
    }
    return null;
  }


}