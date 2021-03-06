function Matrix2D(a, b, c, d, tx, ty){
  this.initialize(a, b, c, d, tx, ty);
}

// static public properties:

/**
 * An identity matrix, representing a null transformation.
 * @property identity
 * @static
 * @type Matrix2D
 * @readonly
 **/
Matrix2D.prototype.identity = null;// set at bottom of class definition.

/**
 * Multiplier for converting degrees to radians. Used internally by Matrix2D.
 * @property DEG_TO_RAD
 * @static
 * @final
 * @type Number
 * @readonly
 **/
Matrix2D.DEG_TO_RAD = Math.PI/180;

// public properties:
/**
 * Position (0, 0) in a 3x3 affine transformation matrix.
 * @property a
 * @type Number
 **/
Matrix2D.prototype.a = 1;

/**
 * Position (0, 1) in a 3x3 affine transformation matrix.
 * @property b
 * @type Number
 **/
Matrix2D.prototype.b = 0;

/**
 * Position (1, 0) in a 3x3 affine transformation matrix.
 * @property c
 * @type Number
 **/
Matrix2D.prototype.c = 0;

/**
 * Position (1, 1) in a 3x3 affine transformation matrix.
 * @property d
 * @type Number
 **/
Matrix2D.prototype.d = 1;

/**
 * Position (2, 0) in a 3x3 affine transformation matrix.
 * @property tx
 * @type Number
 **/
Matrix2D.prototype.tx = 0;

/**
 * Position (2, 1) in a 3x3 affine transformation matrix.
 * @property ty
 * @type Number
 **/
Matrix2D.prototype.ty = 0;



// constructor:
/**
 * Initialization method. Can also be used to reinitialize the instance.
 * @method initialize
 * @param {Number} [a=1] Specifies the a property for the new matrix.
 * @param {Number} [b=0] Specifies the b property for the new matrix.
 * @param {Number} [c=0] Specifies the c property for the new matrix.
 * @param {Number} [d=1] Specifies the d property for the new matrix.
 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
 * @return {Matrix2D} This instance. Useful for chaining method calls.
*/
Matrix2D.prototype.initialize = function(a, b, c, d, tx, ty) {
  this.a = (a == null) ? 1 : a;
  this.b = b || 0;
  this.c = c || 0;
  this.d = (d == null) ? 1 : d;
  this.tx = tx || 0;
  this.ty = ty || 0;
  return this;
};

// public methods:
/**
 * Concatenates the specified matrix properties with this matrix. All parameters are required.
 * @method prepend
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.prepend = function(a, b, c, d, tx, ty) {
  var tx1 = this.tx;
  if (a != 1 || b != 0 || c != 0 || d != 1) {
    var a1 = this.a;
    var c1 = this.c;
    this.a  = a1*a+this.b*c;
    this.b  = a1*b+this.b*d;
    this.c  = c1*a+this.d*c;
    this.d  = c1*b+this.d*d;
  }
  this.tx = tx1*a+this.ty*c+tx;
  this.ty = tx1*b+this.ty*d+ty;
  return this;
};

/**
 * Appends the specified matrix properties with this matrix. All parameters are required.
 * @method append
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.append = function(a, b, c, d, tx, ty) {
  var a1 = this.a;
  var b1 = this.b;
  var c1 = this.c;
  var d1 = this.d;

  this.a  = a*a1+b*c1;
  this.b  = a*b1+b*d1;
  this.c  = c*a1+d*c1;
  this.d  = c*b1+d*d1;
  this.tx = tx*a1+ty*c1+this.tx;
  this.ty = tx*b1+ty*d1+this.ty;
  return this;
};

/**
 * Prepends the specified matrix with this matrix.
 * @method prependMatrix
 * @param {Matrix2D} matrix
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.prependMatrix = function(matrix) {
  this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
  return this;
};

/**
 * Appends the specified matrix with this matrix.
 * @method appendMatrix
 * @param {Matrix2D} matrix
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.appendMatrix = function(matrix) {
  this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
  return this;
};

/**
 * Generates matrix properties from the specified display object transform properties, and prepends them with this matrix.
 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
 * mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
 * @method prependTransform
 * @param {Number} x
 * @param {Number} y
 * @param {Number} scaleX
 * @param {Number} scaleY
 * @param {Number} rotation
 * @param {Number} skewX
 * @param {Number} skewY
 * @param {Number} regX Optional.
 * @param {Number} regY Optional.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.prependTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
  if (rotation%360) {
    var r = rotation*Matrix2D.DEG_TO_RAD;
    var cos = Math.cos(r);
    var sin = Math.sin(r);
  } else {
    cos = 1;
    sin = 0;
  }

  if (regX || regY) {
    // append the registration offset:
    this.tx -= regX; this.ty -= regY;
  }
  if (skewX || skewY) {
    // TODO: can this be combined into a single prepend operation?
    skewX *= Matrix2D.DEG_TO_RAD;
    skewY *= Matrix2D.DEG_TO_RAD;
    this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
    this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
  } else {
    this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
  }
  return this;
};

/**
 * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
 * For example, you can use this to generate a matrix from a display object: var mtx = new Matrix2D();
 * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
 * @method appendTransform
 * @param {Number} x
 * @param {Number} y
 * @param {Number} scaleX
 * @param {Number} scaleY
 * @param {Number} rotation
 * @param {Number} skewX
 * @param {Number} skewY
 * @param {Number} regX Optional.
 * @param {Number} regY Optional.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.appendTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {

  if (rotation%360) {
    var r = rotation*Matrix2D.DEG_TO_RAD;
    var cos = Math.cos(r);
    var sin = Math.sin(r);
  } else {
    cos = 1;
    sin = 0;
  }

  if (skewX || skewY) {
    // TODO: can this be combined into a single append?
    skewX *= Matrix2D.DEG_TO_RAD;
    skewY *= Matrix2D.DEG_TO_RAD;
    this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
    this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
  } else {
    this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
  }

  if (regX || regY) {
    // prepend the registration offset:
    this.tx -= regX*this.a+regY*this.c;
    this.ty -= regX*this.b+regY*this.d;
  }
  return this;
};

/**
 * Applies a rotation transformation to the matrix.
 * @method rotate
 * @param {Number} angle The angle in radians. To use degrees, multiply by <code>Math.PI/180</code>.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.rotate = function(angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);

  var a1 = this.a;
  var c1 = this.c;
  var tx1 = this.tx;

  this.a = a1*cos-this.b*sin;
  this.b = a1*sin+this.b*cos;
  this.c = c1*cos-this.d*sin;
  this.d = c1*sin+this.d*cos;
  this.tx = tx1*cos-this.ty*sin;
  this.ty = tx1*sin+this.ty*cos;
  return this;
};

/**
 * Applies a skew transformation to the matrix.
 * @method skew
 * @param {Number} skewX The amount to skew horizontally in degrees.
 * @param {Number} skewY The amount to skew vertically in degrees.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
*/
Matrix2D.prototype.skew = function(skewX, skewY) {
  skewX = skewX*Matrix2D.DEG_TO_RAD;
  skewY = skewY*Matrix2D.DEG_TO_RAD;
  this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
  return this;
};

/**
 * Applies a scale transformation to the matrix.
 * @method scale
 * @param {Number} x The amount to scale horizontally
 * @param {Number} y The amount to scale vertically
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.scale = function(x, y) {
  this.a *= x;
  this.d *= y;
  this.c *= x;
  this.b *= y;
  this.tx *= x;
  this.ty *= y;
  return this;
};

/**
 * Translates the matrix on the x and y axes.
 * @method translate
 * @param {Number} x
 * @param {Number} y
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.translate = function(x, y) {
  this.tx += x;
  this.ty += y;
  return this;
};

/**
 * Sets the properties of the matrix to those of an identity matrix (one that applies a null transformation).
 * @method identity
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.identity = function() {
  this.a = this.d = 1;
  this.b = this.c = this.tx = this.ty = 0;
  return this;
};

/**
 * Inverts the matrix, causing it to perform the opposite transformation.
 * @method invert
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.invert = function() {
  var a1 = this.a;
  var b1 = this.b;
  var c1 = this.c;
  var d1 = this.d;
  var tx1 = this.tx;
  var n = a1*d1-b1*c1;

  this.a = d1/n;
  this.b = -b1/n;
  this.c = -c1/n;
  this.d = a1/n;
  this.tx = (c1*this.ty-d1*tx1)/n;
  this.ty = -(a1*this.ty-b1*tx1)/n;
  return this;
};

/**
 * Returns true if the matrix is an identity matrix.
 * @method
isIdentity
 * @return {Boolean}
 **/
Matrix2D.prototype.isIdentity = function() {
  return this.tx == 0 && this.ty == 0 && this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1;
};

/**
 * Transforms a point according to this matrix.
 * @method transformPoint
 * @param {Number} x The x component of the point to transform.
 * @param {Number} y The y component of the point to transform.
 * @param {Point | Object} [pt] An object to copy the result into. If omitted a generic object with x/y properties will be returned.
 * @return {Point} This matrix. Useful for chaining method calls.
 **/
Matrix2D.prototype.transformPoint = function(x, y, pt) {
  pt = pt||{};
  pt.x = x*this.a+y*this.c+this.tx;
  pt.y = x*this.b+y*this.d+this.ty;
  return pt;
};

/**
 * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that this these values
 * may not match the transform properties you used to generate the matrix, though they will produce the same visual
 * results.
 * @method decompose
 * @param {Object} target The object to apply the transform properties to. If null, then a new object will be returned.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
*/
Matrix2D.prototype.decompose = function(target) {

  if (target == null) { target = {}; }
  target.x = this.tx;
  target.y = this.ty;
  target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
  target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);

  var skewX = Math.atan2(-this.c, this.d);
  var skewY = Math.atan2(this.b, this.a);

  if (skewX == skewY) {
    target.rotation = skewY/Matrix2D.DEG_TO_RAD;
    if (this.a < 0 && this.d >= 0) {
      target.rotation += (target.rotation <= 0) ? 180 : -180;
    }
    target.skewX = target.skewY = 0;
  } else {
    target.skewX = skewX/Matrix2D.DEG_TO_RAD;
    target.skewY = skewY/Matrix2D.DEG_TO_RAD;
  }
  return target;
};

/**
 * Reinitializes all matrix properties to those specified.
 * @method reinitialize
 * @param {Number} [a=1] Specifies the a property for the new matrix.
 * @param {Number} [b=0] Specifies the b property for the new matrix.
 * @param {Number} [c=0] Specifies the c property for the new matrix.
 * @param {Number} [d=1] Specifies the d property for the new matrix.
 * @param {Number} [tx=0] Specifies the tx property for the new matrix.
 * @param {Number} [ty=0] Specifies the ty property for the new matrix.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
*/
Matrix2D.prototype.reinitialize = function(a, b, c, d, tx, ty) {
  this.initialize(a,b,c,d,tx,ty);
  return this;
};

/**
 * Copies all properties from the specified matrix to this matrix.
 * @method copy
 * @param {Matrix2D} matrix The matrix to copy properties from.
 * @return {Matrix2D} This matrix. Useful for chaining method calls.
*/
Matrix2D.prototype.copy = function(matrix) {
  return this.reinitialize(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
};

/**
 * Returns a clone of the Matrix2D instance.
 * @method clone
 * @return {Matrix2D} a clone of the Matrix2D instance.
 **/
Matrix2D.prototype.clone = function() {
  return (new Matrix2D()).copy(this);
};

/**
 * Returns a string representation of this object.
 * @method toString
 * @return {String} a string representation of the instance.
 **/
Matrix2D.prototype.toString = function() {
  return "[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]";
};

Matrix2D.identity = new Matrix2D();
