/**
 * Extension de l'objet Math avec des fonctions empruntées à plusieurs livres, dont :
 *   - "Macromedia FX...",  de Robert Penner
 *   - "Ray Tracing in One Weekend", de Peter Shirley
 * @return {[type]} [description]
 */
var MathFX = (function () {
  "use strict";

  const cos = Math.cos;
  const sin = Math.sin;
  const asin = Math.asin;
  const atan = Math.atan;
  const pow = Math.pow;
  const sqrt = Math.sqrt;
  const abs = Math.abs;
  const S_DEFAULT = 1.70158;
  const PI = Math.PI;
  const TWO_PI = PI * 2;
  const HALF_PI = PI / 2;
  const QUARTER_PI = PI / 4;
  const DEG_TO_RAD = PI / 180;

  const swing = (x, t, b, c, d) => easeOutQuad(x, t, b, c, d),

        easeInQuad = (x, t, b, c, d) => c*(t/=d)*t + b,

        easeOutQuad = (x, t, b, c, d) => -c *(t/=d)*(t-2) + b,

        easeInOutQuad = (x, t, b, c, d) => {
          if ((t/=d/2) < 1) return c/2*t*t + b;
          return -c/2 * ((--t)*(t-2) - 1) + b;
        },

        easeInCubic = (x, t, b, c, d) => c*(t/=d)*t*t + b,

        easeOutCubic = (x, t, b, c, d) => c*((t=t/d-1)*t*t + 1) + b,

        easeInOutCubic = (x, t, b, c, d) => {
          if ((t/=d/2) < 1) return c/2*t*t*t + b;
          return c/2*((t-=2)*t*t + 2) + b;
        },

        easeInQuart = (x, t, b, c, d) => c*(t/=d)*t*t*t + b,

        easeOutQuart = (x, t, b, c, d) => -c * ((t=t/d-1)*t*t*t - 1) + b,

        easeInOutQuart = (x, t, b, c, d) => {
          if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
          return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },

        easeInQuint = (x, t, b, c, d) => c*(t/=d)*t*t*t*t + b,

        easeOutQuint = (x, t, b, c, d) => c*((t=t/d-1)*t*t*t*t + 1) + b,

        easeInOutQuint = (x, t, b, c, d) => {
          if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
          return c/2*((t-=2)*t*t*t*t + 2) + b;
        },

        easeInSine = (x, t, b, c, d) => -c * cos(t/d * HALF_PI) + c + b,

        easeOutSine = (x, t, b, c, d) => c * sin(t/d * HALF_PI) + b,

        easeInOutSine = (x, t, b, c, d) => -c/2 * (cos(PI*t/d) - 1) + b,

        easeInExpo = (x, t, b, c, d) => (t==0) ? b : c * pow(2, 10 * (t/d - 1)) + b,

        easeOutExpo = (x, t, b, c, d) => (t==d) ? b+c : c * (-pow(2, -10 * t/d) + 1) + b,

        easeInOutExpo = (x, t, b, c, d) => {
          if (t==0) return b;
          if (t==d) return b+c;
          if ((t/=d/2) < 1) return c/2 * pow(2, 10 * (t - 1)) + b;
          return c/2 * (-pow(2, -10 * --t) + 2) + b;
        },

        easeInCirc = (x, t, b, c, d) => -c * (sqrt(1 - (t/=d)*t) - 1) + b,

        easeOutCirc = (x, t, b, c, d) => c * sqrt(1 - (t=t/d-1)*t) + b,

        easeInOutCirc = (x, t, b, c, d) => {
          if ((t/=d/2) < 1) return -c/2 * (sqrt(1 - t*t) - 1) + b;
          return c/2 * (sqrt(1 - (t-=2)*t) + 1) + b;
        },

        easeInElastic = (x, t, b, c, d) => {
          var s=S_DEFAULT;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < abs(c)) { a=c; var s=p/4; }
          else var s = p/TWO_PI * asin (c/a);
          return -(a*pow(2,10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )) + b;
        },

        easeOutElastic = (x, t, b, c, d) => {
          var s=S_DEFAULT;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
          if (a < abs(c)) { a=c; var s=p/4; }
          else var s = p/TWO_PI * asin (c/a);
          return a*pow(2,-10*t) * sin( (t*d-s)*TWO_PI/p ) + c + b;
        },

        easeInOutElastic = (x, t, b, c, d) => {
          var s=S_DEFAULT;var p=0;var a=c;
          if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
          if (a < abs(c)) { a=c; var s=p/4; }
          else var s = p/TWO_PI * asin (c/a);
          if (t < 1) return -.5*(a*pow(2,10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )) + b;
          return a*pow(2,-10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )*.5 + c + b;
        },

        easeInBack = (x, t, b, c, d, s) => {
          if (s == undefined) s = S_DEFAULT;
          return c*(t/=d)*t*((s+1)*t - s) + b;
        },

        easeOutBack = (x, t, b, c, d, s) => {
          if (s == undefined) s = S_DEFAULT;
          return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },

        easeInOutBack = (x, t, b, c, d, s) => {
          if (s == undefined) s = S_DEFAULT;
          if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
          return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },

        easeInBounce = (x, t, b, c, d) => c - easeOutBounce (x, d-t, 0, c, d) + b,

        easeOutBounce = (x, t, b, c, d) => {
          if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
          } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
          } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
          } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
          }
        },

        easeInOutBounce = (x, t, b, c, d) => {
          if (t < d/2) return easeInBounce (x, t*2, 0, c, d) * .5 + b;
          return easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        },

        /**
         * Lerp function
         * from the book "Ray Tracing in One Weekend", by Peter Shirley
         * @param  {[type]} s "start value"
         * @param  {[type]} e "end value"
         * @param  {[type]} t "value between 0 and 1"
         * @return {[type]}   [description]
        */
        lerp = (s, e, t) => (1-t)*s+t*e

  // Déclaration des méthodes et propriétés publiques
  return {
    cos: cos,
    sin: sin,
    asin: asin,
    atan: atan,
    pow: pow,
    sqrt: sqrt,
    abs: abs,
    PI: PI,
    TWO_PI: TWO_PI,
    HALF_PI: HALF_PI,
    QUARTER_PI: QUARTER_PI,
    swing: swing,
    easeInQuad: easeInQuad,
    easeOutQuad: easeOutQuad,
    easeInOutQuad: easeInOutQuad,
    easeInCubic: easeInCubic,
    easeOutCubic: easeOutCubic,
    easeInOutCubic: easeInOutCubic,
    easeInQuart: easeInQuart,
    easeOutQuart: easeOutQuart,
    easeInOutQuart: easeInOutQuart,
    easeInQuint: easeInQuint,
    easeOutQuint: easeOutQuint,
    easeInOutQuint: easeInOutQuint,
    easeInSine: easeInSine,
    easeOutSine: easeOutSine,
    easeInOutSine: easeInOutSine,
    easeInExpo: easeInExpo,
    easeOutExpo: easeOutExpo,
    easeInOutExpo: easeInOutExpo,
    easeInCirc: easeInCirc,
    easeOutCirc: easeOutCirc,
    easeInOutCirc: easeInOutCirc,
    easeInElastic: easeInElastic,
    easeOutElastic: easeOutElastic,
    easeInOutElastic: easeInOutElastic,
    easeInBack: easeInBack,
    easeOutBack: easeOutBack,
    easeInOutBack: easeInOutBack,
    easeInBounce: easeInBounce,
    easeOutBounce: easeOutBounce,
    easeInOutBounce: easeInOutBounce,
    lerp: lerp
  };
})();

/*
var test = MathFX.easeInQuad (10, 5, 4, 2, 4);
console.log(test);
*/
