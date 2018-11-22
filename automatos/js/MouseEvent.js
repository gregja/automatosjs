class MouseEvent extends Event {

  constructor(type, bubbles, cancelable){
    this.type = type;
    this.cancelable = cancelable;
    this.bubbles = bubbles;
  }

  fromNativeMouseEvent (event,bubbles,cancelable,x,y){
    var type = "";
    var msevent = null;

    switch( event.type ){
      case "click": type = MouseEvent.CLICK; break;
      case "mousemove": type = MouseEvent.MOUSE_MOVE; break;
      case "mouseup": type = MouseEvent.MOUSE_UP; break;
      case "mousedown": type = MouseEvent.MOUSE_DOWN; break;
    }

    msevent = new MouseEvent(type,bubbles,cancelable);
    msevent.stageX = x;
    msevent.stageY = y;
    return msevent;
  }

}

// Constantes associées à la la classe MouseEvent
MouseEvent.CLICK         = "click";
MouseEvent.ROLL_OVER     = "rollOver";
MouseEvent.ROLL_OUT      = "rollOut";
MouseEvent.MOUSE_MOVE    = "mouseMove";
MouseEvent.MOUSE_DOWN    = "mouseUp";
MouseEvent.MOUSE_UP      = "mouseDown";
