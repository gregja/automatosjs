/**
 * The Assert object provides functions to test JavaScript values against
 * known and expected results. Whenever a comparison (assertion) fails,
 * an error is thrown.
 * Source code largely inspired by the YUI3 and AngularJS frameworks 
 * @namespace Test
 * @module test
 * @class Assert
 * @static
 */
var checkType = (function () {
  "use strict";

  /**
     * Asserts that a value is equal to another. This uses the double equals sign
     * so type coercion may occur.
     * @param {Object} expected The expected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areEqual
     * @static
     */
  function areEqual(expected, actual) {       
    if (expected != actual) {
      return false;
    } 
    return true;
  }

  /**
     * Asserts that a value is not equal to another. This uses the double equals sign
     * so type coercion may occur.
     * @param {Object} unexpected The unexpected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areNotEqual
     * @static
     */
  function areNotEqual(unexpected, actual) {       
    if (unexpected == actual) {
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is not the same as another. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} unexpected The unexpected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areNotSame
     * @static
     */
  function areNotSame(unexpected, actual) {        
    if (unexpected === actual) {
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is the same as another. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} expected The expected value.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method areSame
     * @static
     */
  function areSame(expected, actual) {       
    if (expected !== actual) {
      return false;
    }
    return true;
  }

  //-------------------------------------------------------------------------
  // Boolean Assertion Methods
  //-------------------------------------------------------------------------

  /**
     * Asserts that a value is false. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isFalse
     * @static
     */
  function isFalse(actual) {        
    if (false !== actual) {
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is true. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isTrue
     * @static
     */
  function isTrue(actual) {        
    if (true !== actual) {
      return false;
    }
    return true;
  }

  //-------------------------------------------------------------------------
  // Special Value Assertion Methods
  //-------------------------------------------------------------------------

  /**
     * Asserts that a value is not a number.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNaN
     * @static
     */
  function isNaN(actual){       
    if (!isNaN(actual)){
      return false;
    }
    return true;        
  }

  /**
     * Asserts that a value is not the special NaN value.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotNaN
     * @static
     */
  function isNotNaN(actual){        
    if (isNaN(actual)){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is not null. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotNull
     * @static
     */
  function isNotNull(actual) {       
    if (actual === null) {
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is null. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNull
     * @static
     */
  function isNull(actual) {        
    if (actual !== null) {
      return false;
    }
    return true;
  }
  
  /**
     * Asserts that a value is not undefined. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNotUndefined
     * @static
     */
  function isDefined(actual) {        
    return typeof value !== 'undefined';
  }

  /**
     * Asserts that a value is undefined. This uses the triple equals sign
     * so no type coercion may occur.
     * @param {Object} actual The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isUndefined
     * @static
     */
  function isUndefined(actual) {       
    return typeof value === 'undefined';
  }


  //--------------------------------------------------------------------------
  // Instance Assertion Methods
  //--------------------------------------------------------------------------

  /**
     * Asserts that a value is an array.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isArray
     * @static
     */
  function isArray(actual) {      
    var shouldFail = false;
    if (Array.isArray){
      shouldFail = !Array.isArray(actual);
    } else {
      shouldFail = Object.prototype.toString.call(actual) != "[object Array]";
    }
    if (shouldFail){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is a Boolean.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isBoolean
     * @static
     */
  function isBoolean(actual) {       
    if (typeof actual != "boolean"){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is a function.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isFunction
     * @static
     */
  function isFunction(actual) {       
    if (!(actual instanceof Function)){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is an instance of a particular object. This may return
     * incorrect results when comparing objects from one frame to constructors in
     * another frame. For best results, don't use in a cross-frame manner.
     * @param {Function} expected The function that the object should be an instance of.
     * @param {Object} actual The object to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isInstanceOf
     * @static
     */
  function isInstanceOf(expected, actual) {       
    if (!(actual instanceof expected)){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is of a particular type.
     * @param {String} expectedType The expected type of the variable.
     * @param {Object} actualValue The actual value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isTypeOf
     * @static
     */
  function isTypeOf(expectedType, actualValue){        
    if (typeof actualValue != expectedType){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is a number.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isNumber
     * @static
     */
  function isNumber(actual) {        
    if (typeof actual != "number"){
      return false;
    }
    return true;
  }

  /**
     * Asserts that a value is an object.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isObject
     * @static
     */
  function isObject(actual) {    
    if (!actual || (typeof actual != "object" && typeof actual != "function")){
      return false;
    }
    return true;        
  }

  /**
     * Asserts that a value is a string.
     * @param {Object} actual The value to test.
     * @param {String} message (Optional) The message to display if the assertion fails.
     * @method isString
     * @static
     */
  function isString(actual) {
    if (typeof actual != "string"){
      return false;
    }
    return true;        
  }

  /**
     * Exemple emprunté à AngularJS
     * @param {type} value
     * @return {Boolean}
     */
  function isDate(value) {
    if (toString.call(value) === '[object Date]') {
      return true;
    } else {
      return false;
    }
  }

  // Déclaration des méthodes et propriétés publiques 
  return {
    areEqual:areEqual,
    areNotEqual:areNotEqual,
    areNotSame:areNotSame,
    areSame:areSame,
    isFalse:isFalse,
    isTrue:isTrue,
    isNaN:isNaN,
    isNotNaN:isNotNaN,
    isNull:isNull,        
    isNotNull:isNotNull,
    isDefined:isDefined,
    isUndefined:isUndefined,
    isArray:isArray,
    isBoolean:isBoolean,
    isFunction:isFunction,
    isInstanceOf:isInstanceOf,
    isNumber:isNumber,
    isObject:isObject,
    isString:isString,
    isTypeOf: isTypeOf 
  };
})();
