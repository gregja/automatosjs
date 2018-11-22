class EventDispatcher {

  constructor() {
    this.parent = null;
    this._listeners = null;
  }

  addEventListener ( type, scope, callback, useCapture ){
    this._listeners = this._listeners || [];
    var obj = {};
    obj.type = type;
    obj.scope = scope;
    obj.callback = callback;
    obj.useCapture = useCapture;
    this._listeners.push(obj);
  }

  hasEventListener (type){
    if( this._listeners == null ) {
      return false;
    }

    var obj = {};
    var listeners = this._listeners;
    var i = listeners.length;
    while( --i > -1 ) {
      obj = listeners[i];
      if( obj.type == type ) {
        return true;
      }
    }
  }

  dispatchEvent ( event ){
    this._listeners = this._listeners || [];
    var listeners = this._listeners;
    var obj = {};
    var i = listeners.length;

    if( event.target == null ) {
      event.target = this;
    }

    event.currentTarget = this;

    while( --i > -1 ){
      obj = listeners[i];

      if( obj.type == event.type ){
        if( event.target != this && obj.useCapture == false ){
          continue;
        }

        obj.callback.apply( obj.scope, [event] );
      }
    }

    if( event.bubbles == true && this.parent != null && this.parent.dispatchEvent ){
      this.parent.dispatchEvent(event);
    }
  }

  removeEventListener ( type, scope, callback, useCapture ){
    var listener = this.getEventListener(type);
    var listeners = this._listeners;

    while( listener != null ){
      var obj = {};
      var i = listeners.length;
      var arr = [];

      while( --i > -1 ){
        obj = listeners[i];
        if( obj.type != listener.type || obj.scope != scope || obj.callback != callback || obj.useCapture != useCapture ) {
          return arr.push(obj);
        }
      }

      listeners = arr;
      listener = this.getEventListener(type);
    }
  }

}
