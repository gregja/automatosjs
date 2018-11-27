class DisplayList extends EventDispatcher {

  constructor(args={}) {
    super();
    this.type = 'displayList';
    this.name = args.name || args.NAME || '*nope';
    this.parent = args.parent || args.PARENT || null;
    this.children = new Array();
  }

  clearList() {
    this.children = new Array();
  }

  addChild (child){
    if( child.parent ){
      child.parent.removeChild(child);
    }

    child.parent = this;
    this.children.push(child);
    child.dispatchEvent( new EventContainer(Event.ADDED, true, true) );
  }

  getChildAt (index){
    if (this.children[index]) {
      return this.children[index];
    } else {
      return false;
    }
  }

  getChildByName (name){
    var children = this.children;
    var i = children.length;

    while( --i > -1 ){
      if( children[i].name == name ) {
        return children[i];
      }
    }

    return null;
  }

  addChildAt (child, index){
    var children = this.children;
    var tab1 = this.children.slice(0, index);
    var tab2 = this.children.slice(index);
    this.children = tab1.concat([child]).concat(tab2);

    child.parent = this;
    child.dispatchEvent( new EventContainer(Event.ADDED, true, true) );
  }

  removeChildAt (index){
    var child = this.children[index];
    if( child ) {
      child.parent = null;
    }
    this.children.splice(index,1);
    child.dispatchEvent( new EventContainer(Event.REMOVED, true, true) );
  }

  removeChild (child){
    var index = this.children.indexOf(child);

    if( index > -1 ) {
      this.children.splice(index,1);
    }

    child.parent = null;
    child.dispatchEvent( new EventContainer(Event.REMOVED, true, true) );
  }

  getChildren4Debug() {
    var children = this.children;
    var output = [];
    for(let i=0, max= children.length; i < max; i++ ){
      output.push(children[i].getDatas());
    }
    return output;
  }

  getLength() {
    return this.children.length;
  }

  draw ( context ){
    var children = this.children;
    var child = null;

    for(let i=0, max= children.length; i < max; i++ ){
      child = children[i];
      if (child.render) {
        child.render(context, true);
      } else {
        child.draw(context, true);
      }
    }
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
