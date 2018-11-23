
class Sprite extends EventDispatcher {

  constructor(args={}) {
    super();
    this.init(args);
  }

  init(args={}){
    //var args = this.secureParams(xargs);
    this.type = 'displayObject';
    this.name = args.name || args.NAME || '*nope';
    this.parent = args.parent || args.PARENT || null;
    this.shape = args.shape || args.SHAPE || '*nope';
    this.objtype = args.objtype || args.OBJTYPE || 'canvas' ; // "canvas" or "p5"
    this.mouseEnabled = true;

    this.vectors = args.vectors || args.VECTORS || [];
    this.children = args.children || args.CHILDREN || null;

    // effets de transformation initiaux (effectués une seule fois)
    this.trf = args.trf || args.TRF || {};  // paramètres de transformation (translate, scale, rotation, skew, pivot)
    this.checkTRF();  // harmonisation des paramètres de transformation

    // effets de transformation permanents ("oef" = "on each frame")
    this.oef = args.oef || args.OEF || {};  // paramètres de transformation

    this.coords = this.getSurfaceFromVectors(this.vectors);

    this.alpha = args.alpha || args.ALPHA || 1;  // TODO : non géré (à traiter)
    this.color = args.color || args.COLOR || 'rgba(255, 255, 255, 1)';

    // définition des directions
    this.direction = args.direction || args.DIRECTION || this.getXYDefaults();

    // définition de la vélocité
    this.velocity = args.velocity || args.VELOCITY || this.getXYDefaults();

    this.visible = args.visible || args.VISIBLE || true;

    this._matrix = new Matrix2D();
    this._concatenedMatrix = null;
    this.update();

  }

  secureParams(param) {
      return JSON.parse(JSON.stringify(param));
  }

  getXYDefaults(defX=0, defY=0) {
    return {x:defX, y:defY};
  }

  /**
  * Normalisation des paramètres de transformation
  */
  checkTRF () {
    let checks = ['trans', 'scale', 'skew', 'pivot'];
    let defaults = [0, 1, 0, 0]; // scale toujours à 1 par défaut
    let trf = this.trf;
    checks.forEach((check, index) => {
      let key = 'x'+check;
      if (!trf.hasOwnProperty(key)) {
        trf[key] = defaults[index];
      }
      key = 'y'+check;
      if (!trf.hasOwnProperty(key)) {
        trf[key] = defaults[index];
      }
    });
    // rotation traitée à part car une seule valeur (angle)
    if (!trf.hasOwnProperty('rotation')) {
      trf.rotation = 0;
    }
  }

  /**
  * Normalisation des coordonnées de l'objet à partir des vecteurs reçus
  */
  getSurfaceFromVectors(vectors) {
    let min = 999999;
    let max = -1;
    let xmin = null;
    let ymin = null;
    let xmax = null;
    let ymax = null;

    // déterminer les arêtes les plus à gauche et à droite
    // permet de calculer dynamiquement largeur et hauteur
    vectors.forEach((item)=>{
      let current = item.x + item.y;
      if (current < min) {
        min = current;
        xmin = item.x;
        ymin = item.y;
      }
      if (current > max) {
        max = current;
        xmax = item.x;
        ymax = item.y;
      }
    });

    // détermination du périmètre maximal à partir des vecteurs transmis
    let coords = {xmin:xmin, ymin:ymin, xmax:xmax, ymax:ymax};
    coords.width = Math.floor(coords.xmax - coords.xmin);
    coords.height = Math.floor(coords.ymax - coords.ymin);
    coords.xcenter = Math.floor(coords.width / 2);
    coords.ycenter = Math.floor(coords.height / 2);
    coords.xradius = Math.floor(coords.width - coords.xcenter);
    coords.yradius = Math.floor(coords.height - coords.ycenter);
    return coords;
  }

  getDatas() {
    let item = {};
    item.name = this.name;
    item.shape = this.shape;
    item.objtype = this.objtype;
    item.trf = this.trf;
    item.oef = this.oef;
    item.coords = this.coords;

    // TODO : à compléter
    //  item.parent = this.parent;
    //  item.vectors = this.vectors;
    //  item.chilren = this.children.length;

    item.alpha = this.alpha;
    item.color = this.color;

    item.direction = this.direction;
    item.velocity = this.velocity;

    return item;
  }

  render ( context, flagUpdate=true ){

    if( this.visible == false ) {
      return;
    }

    // application sur this.trf des transformations permanentes
    let oef = this.oef;
    let trf = this.trf;
    let oef_keys = Object.keys(oef);
    if (oef_keys) {
      oef_keys.forEach(key => {
        trf[key] = oef[key];
      })
    }

    if (flagUpdate) {
      this.update();
    }

    var mat = this._matrix;

    context.save();
    context.globalAlpha = this.alpha;

    // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/transform
    context.transform(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);

    this.draw(context);

    if (this.children != null) {
      this.children.draw(context);
    }

    context.restore();

    // transformations appliquées une seule fois
    trf.xtrans = 0;
    trf.ytrans = 0;
    trf.xscale = 1;
    trf.yscale = 1;
    trf.rotation = 0;
    trf.xskew = 0;
    trf.yskew = 0;
    trf.xpivot = 0;
    trf.ypivot = 0;
  };

  //Méthode update, qui nous permet d'actualiser la propriété this._matrix de la classe DisplayObject;
  update (){
    let trf = this.trf;
    this._matrix.appendTransform(
      trf.xtrans,
      trf.ytrans,
      trf.xscale,
      trf.yscale,
      trf.rotation,
      trf.xskew,
      trf.yskew,
      trf.xpivot,
      trf.ypivot
    );
  }

  /**
     * Method to oveerride in each child
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
  draw( context ){
    // dessin d'un rectangle rouge (pour test)
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.coords.xmin, this.coords.ymin, this.coords.width, this.coords.height);
    context.rect(this.coords.xmin, this.coords.ymin, this.coords.width, this.coords.height);
    context.fill();
    console.warn('fonction "draw" de la classe "Sprite" non "overridée" dans la classe fille');
  }

  getConcatenedMatrix (){
    var current = this;
    var mat = new Matrix2D();

    while( current != null ){
      if (current.update) {
        current.update();

        mat.prependMatrix(current._matrix );
      }
      current = current.parent;
    }

    this._concatenedMatrix = mat;
    return mat;
  }

  getPoint(x, y) {
    return {x, y};
  }

  localToGlobal (x,y){
    var matrix = this.getConcatenedMatrix();
    var pt = matrix.transformPoint(x,y);
    return this.getPoint(pt.x,pt.y);
  }

  globalToLocal (x,y){
    var matrix = this.getConcatenedMatrix().clone().invert();
    var pt = matrix.transformPoint(x,y);
    return this.getPoint(pt.x,pt.y);
  }

  hitTestPoint (x,y){
    var localCoords = this.globalToLocal(x,y);
    var coords = this.coords;

    if( localCoords.x < coords.xmin || localCoords.x > coords.xmax
       || localCoords.y < coords.ymin || localCoords.y > coords.ymax ) {
      return false;
    } else {
      return true;
    }
  }

  /*  hitTestShape (sprite){
    var localCoords1 = this.globalToLocal(x,y);
    // TODO : check algorithm
    if( localCoords.x < sprite.x || localCoords.x > sprite.width || localCoords.y < sprite.y || localCoords.y > sprite.height ) {
      return false;
    } else {
      return true;
    }
  } */
}
