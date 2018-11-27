class EventContainer {

  constructor(type=null, bubbles=false, cancelable=true){
    this.type = type;
    this.cancelable = cancelable;
    this.bubbles = bubbles;

    this.data = null;
    this.target = null;
    this.currentTarget = null;
  }

  stopPropagation (){
    if( this.cancelable == true ) {
      this.bubbles = false;
    }
  }
}

// constantes associées à la classe Event

EventContainer.ADDED               = "added";
EventContainer.ADDED_TO_STAGE      = "addedToStage";
EventContainer.ENTER_FRAME         = "enterFrame";
EventContainer.REMOVED             = "removed";
EventContainer.REMOVED_FROM_STAGE  = "removedFromStage";
EventContainer.P5CLICKED           = "p5clicked";
EventContainer.P5MPRESSED          = "p5mpressed";
EventContainer.P5MRELEASED         = "p5mreleased";
EventContainer.P5MWHEEL            = "p5mwheel";
