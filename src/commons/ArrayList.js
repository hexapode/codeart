/**
* Array List Object. HERE for processing backward compatiblity
*/

function ArrayList() {
  var list = [];

  this.add = function(el) {
    if (arguments.length === 1) {
      list.push(el);
    }
    else if (arguments.length === 2) {
      var index = arguments[0];
      var el = arguments[1];

      list = list.slice(0, index).concat(el, list.slice(index));
    }
  };

  this.clear = function() {
    list = [];
  }

  this.clone = function() {
    ;
  }

  this.contains = function(el) {
    if (list.indexOf(el) != -1) {
      return true;
    }
    return false;
  };

  this.ensureCapacity = function(capacity) {
    return true;
  };

  this.indexOf = function(el) {
    return list.indexOf(el);
  };

  this.isEmplty = function() {
    if (list.length === 0) {
      return true;
    }
    return false;
  };

  this.lastIndexOf = function(el) {
    return list.lastIndexOf(el);
  };

  this.remove = function(index) {
    if (typeof(index) !== 'number' ) {
      for (var i = 0; i < list.length; ++i) {
        if (list[i] === index) {
          list.splice(i, 1);
          return;
        }
      }
    }
    else {
     list.splice(index, 1);
    }
  };

  this.removeRange = function(fromIndex, toIndex) {
    list.splice(fromIndex, toIndex - fromIndex);
  }

  this.set = function(index, el) {
    list[index] = el;
  };

  this.size = function() {
    return list.length;
  }

  this.toArray = function() {
    return list.slice(0);
  };

  this.trimToSize = function() {

  };
}