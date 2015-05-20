function PVector() {
  this.x = 0;
  this.y = 0;
  this.z = 0;

  function init(args) {
    if (args.length === 1) {
      var obj = args[0];
      if (obj.x === undefined) {
        this.x = obj[0];
        this.y = obj[1];
        if (obj.length > 2) {
          this.z = obj[2];
        }
      }
      else {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
      }
    }

    if (args.length === 2) {
      this.x = args[0];
      this.y = args[1];
    }

    if (args.length === 3) {
      this.x = args[0];
      this.y = args[1];
      this.z = args[2];
    }
  }
 
  init.bind(this)(arguments);

  this.set = function() {
    init.bind(this)(arguments);
  };

  this.get = function() {
    return new PVector(this);
  };

  this.mag = function() {
     return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  };

  this.magSq = function() {
     return this.x * this.x + this.y * this.y + this.z * this.z;
  };

  this.add = function() {
    if (arguments.length === 1) {
      var v = arguments[0];
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    }
    if (arguments.length === 2) {
      this.x += arguments[0];
      this.y += arguments[1];
    }
    if (arguments.length === 3) {
      this.x += arguments[0];
      this.y += arguments[1];
      this.z += arguments[2];
    }
  }

  this.array = function() {
    return [this.x, this.y, this.z];
  }
}

PVector.random2D = function() {
  if (arguments.length) {
    var target = arguments[0];
    target.x = Math.random() * 2 - 1;
    target.y = Math.random() * 2 - 1;
    return target;
  }
  else {
    return new PVector(Math.random() * 2 - 1, Math.random() * 2 - 1);
  }
}

PVector.random3D = function() {
  if (arguments.length) {
    var target = arguments[0];
    target.x = Math.random() * 2 - 1;
    target.y = Math.random() * 2 - 1;
    target.z = Math.random() * 2 - 1;
    return target;
  }
  else {
    return new PVector(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
  }
}

PVector.fromAngle = function(angle) {
  var target = null;
  if (arguments.length === 2) {
    target = arguments[1];
  }
  else {
    target = new PVector();
  }
  // todo CHECK TRIGONOMETRY
  target.x = Math.cos(angle);
  target.y = Math.sin(angle);
  return target;
}

PVector.add = function(v1, v2) {
  if (arguments.length === 2) {
    return new PVector(v1.x + v2.x, v1.y + v2.y, v1.z + v1.z);
  }
  else if (arguments.length === 3) {
    var target = arguments[2];
    target.x = v1.x + v2.x;
    target.y = v1.y + v2.y;
    target.z = v1.z + v1.z;
  }
}