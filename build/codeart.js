/**
 * Concoct!
 */

function PGraphics(canvas) {
  var ctx = canvas.getContext('2d');

  var CAN_FILL = true;
  var CAN_STROKE = true;

  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;
  
  var SHAPE_MODE = 0;
  var SHAPE_VERTEX_COUNT = 0;
  var CURRENT_SHAPE = [];

  var pg = {};


  // set default colors
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';

pg.arc = function(x,y,w,h,start,stop) {

  ctx.beginPath();
  if (Math.abs(start - stop) != Math.PI * 2) {
    ctx.moveTo(x,y);
    ctx.ellipse(x,y,w/2,h/2, 0, start, stop);
    ctx.lineTo(x,y);
  } else {
    ctx.ellipse(x,y,w/2,h/2, 0, start, stop);
  }
  if (CAN_STROKE) {
    ctx.stroke();
  }
  if (CAN_FILL) {
    ctx.fill();
  }
};





 pg.background = function (r) {

    var g = r;
    var b = r;

    if (arguments.length == 3) {
      g = arguments[1];
      b = arguments[2];
    }
 
    var c = ctx.fillStyle;
    ctx.fillStyle = 'rgb(' + r +',' + g + ',' + b + ')';
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    ctx.fillStyle = c;
  };

  pg.beginDraw = function() {

  };
pg.beginShape = function(MODE) {
  SHAPE_VERTEX_COUNT = 0;
  SHAPE_MODE = MODE;
  CURRENT_SHAPE = [];
  ctx.beginPath();
};
  pg.bezier = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x2,y2,x3,y3,x4,y4);

    if (CAN_FILL) {
      ctx.fill();
    }
    if (CAN_STROKE) {
      ctx.stroke();
    } 
  };
  pg.createGraphics = function(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    //document.body.appendChild(canvas);
    var pg = PGraphics(canvas);
    return pg;
  };

pg.ellipse = function(x,y,w,h) {
  if (pg.__CURRENT_ELLIPSEMODE == enums.CORNER) {
    ctx.beginPath();
    ctx.ellipse(x,y,w/2,h/2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
  else if (pg.__CURRENT_ELLIPSEMODE == enums.RADIUS) {
    ctx.beginPath();
    ctx.ellipse(x - w,y - h, w * 2, h * 2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
  else if (pg.__CURRENT_ELLIPSEMODE == enums.CENTER) {
    ctx.beginPath();
    ctx.ellipse(x - w / 2,y - h / 2, w, h, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
  else if (pg.__CURRENT_ELLIPSEMODE == enums.CORNERS) {
    ctx.beginPath();
    ctx.ellipse(x, y, w - x, h - y, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }
};

pg.__CURRENT_ELLIPSEMODE = enums.CORNER;


pg.ellipseMode = function(mode) {
  pg.__CURRENT_ELLIPSEMODE = mode;
}

  pg.endDraw = function() {

  };


pg.endShape = function(shouldClose) {
  if (CURRENT_SHAPE.length == 0) {
    return;
  }
  
  // standart rendering mode LINES 2
  if (!SHAPE_MODE || SHAPE_MODE === 2) {
    
    ctx.moveTo(CURRENT_SHAPE[0][0], CURRENT_SHAPE[0][1]);
    for (var i = 1; i < CURRENT_SHAPE.length; ++i) {
      ctx.lineTo(CURRENT_SHAPE[i][0], CURRENT_SHAPE[i][1]);
    }
    if (shouldClose) {
      ctx.lineTo(CURRENT_SHAPE[0][0], CURRENT_SHAPE[0][1]);
    }

   
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  }

  // POINTS : 1
  if (SHAPE_MODE === 1) {
    
    for (var i = 1; i < CURRENT_SHAPE.length; ++i) {
      pg.point(CURRENT_SHAPE[0][0], CURRENT_SHAPE[0][1]);
    }
  
  }

  // TRIANGLES       : '3'
  //TRIANGLE_FAN    : '4'
  
  // TRIANGLE_STRIP  : '5'
  if (SHAPE_MODE === 5) {
    for (var i = 0; i + 2 < CURRENT_SHAPE.length; i++) {
      ctx.moveTo(CURRENT_SHAPE[i][0], CURRENT_SHAPE[i][1]);
      ctx.lineTo(CURRENT_SHAPE[i + 1][0], CURRENT_SHAPE[i + 1][1]);
      ctx.lineTo(CURRENT_SHAPE[i + 2][0], CURRENT_SHAPE[i + 2][1]);
      ctx.lineTo(CURRENT_SHAPE[i][0], CURRENT_SHAPE[i][1]);
    }
    if (CAN_FILL) {
      ctx.fill();
    }
    if (CAN_STROKE) {
      ctx.stroke();
    }

  }
};
pg.fill = function(r) {
    CAN_FILL = true;
    r = r | 0;
    
    var g = r;
    var b = r;
    var a = 1.0;

    if (r > 255) {
      b = r & 0x0000ff;
      g = r & 0x00ff00;
      r = r & 0xff0000;
    }

    if (arguments.length == 2) {
      a = 1/ 255 * arguments[1];
    }
    if (arguments.length == 3) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
    }
    if (arguments.length == 4) {
      g = arguments[1] | 0;
      b = arguments[2] | 0;
      a = 1 / 255 * arguments[3];
    }
    var color = 'rgba(' + r +',' + g + ',' + b + ', ' + a + ')';
    ctx.fillStyle = color;
  };
  pg.getCanvas = function() {
    return canvas;
  };
  pg.height = function() {
  
    return HEIGHT;
  };

 pg.image= function(pg, x, y) {
    ctx.drawImage(pg.getCanvas(), x, y);
  };
pg.line = function(x,y,x2,y2) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x2, y2);
  if (CAN_STROKE) {
    ctx.stroke();
  }
  if (CAN_FILL) {
    ctx.fill();
  }
};
/**
  load pixels
*/

pg.loadPixels = function() {
 // pg.pixels = 

 var pxl = ctx.getImageData(0,0,WIDTH, HEIGHT);
 var pxlData = pxl.data;

 for (var i = 0; i < pxlData.length; i += 4) {
    pg.pixels[i / 4] = {
      r : pxlData[i],
      g : pxlData[i + 1],
      b : pxlData[i + 2],
      a : pxlData[i + 4]
    };
 } 

};
  pg.noFill = function () {
   
    CAN_FILL = false;
  };
 pg.noSmooth = function() {
    ctx.imageSmoothingEnabled = false;
  };

  pg.noStroke = function () {
 
    CAN_STROKE = false;
  };
/**
*/

pg.pixels = [];
  pg.point = function (x, y) {
  
    if (CAN_FILL) {
      ctx.fillRect(x, y, 1, 1);
    }
    if (CAN_STROKE) {
      ctx.strokeRect(x, y, 1, 1);
    }
  };

pg.___styleStack = [];

pg.pushStyle = function() {
  pg.___styleStack.push({
    stroke : ctx.strokeStyle,
    fill : ctx.fillStyle,
    lineWidth : ctx.lineWidth,
    lineCap : ctx.lineCap
  })
}

pg.popStyle = function() {
  if (!pg.___styleStack.length) {
    return;
  }

  var style = pg.___styleStack.pop();
  ctx.strokeStyle = style.stroke;
  ctx.fillStyle = style.fill;
  ctx.lineWidth = style.lineWidth;
  ctx.lineCap = style.lineCap;
}
pg.quad = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x4,y4);
    ctx.lineTo(x1,y1);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };


pg.rect = function(x,y,w,h) {
  if (pg.__CURRENT_RECTMODE == enums.CORNER) {
    if (CAN_STROKE) {
      ctx.strokeRect(x,y,w,h);
    }
    if (CAN_FILL) {
      ctx.fillRect(x,y,w,h);
    }
  }
  else if (pg.__CURRENT_RECTMODE == enums.CORNERS) {
    if (CAN_STROKE) {
      ctx.strokeRect(x, y, w-x, h-y);
    }
    if (CAN_FILL) {
      ctx.fillRect(x, y, w - x, h - y);
    }
  } 
  else if (pg.__CURRENT_RECTMODE == enums.CENTER) {
    if (CAN_STROKE) {
      ctx.strokeRect(x - w / 2, y - h / 2, w , h);
    }
    if (CAN_FILL) {
      ctx.fillRect(x - w / 2, y - h / 2, w , h);
    }
  } 
  else if (pg.__CURRENT_RECTMODE == enums.RADIUS) {
    if (CAN_STROKE) {
      ctx.strokeRect(x - w , y - h,w * 2 , h * 2);
    }
    if (CAN_FILL) {
      ctx.fillRect(x - w , y - h,w * 2 , h * 2);
    }
  } 
};

pg.__CURRENT_RECTMODE = enums.CORNER;

pg.rectMode = function(mode) {
  pg.__CURRENT_RECTMODE = mode;
}

  pg.rotate = function(angle) {
    ctx.rotate(angle);
  };
/**
  Define size of canvas

  size(width, height)
  size(FULL_SCREEN)
*/

pg.size = function (w, h) {

  if (arguments.length === 1 && arguments[0] == enums.FULL_SCREEN) {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
  }

  canvas.width = w;
  canvas.height = h;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  WIDTH = w;
  HEIGHT = h;

  // set default colors
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#000';
};
pg.stroke = function(r) {
  CAN_STROKE = true;
  r = r | 0;
  
  var g = r;
  var b = r;
  var a = 1.0;

  if (r > 255) {
    b = r & 0x0000ff;
    g = r & 0x00ff00;
    r = r & 0xff0000;
  }

  if (arguments.length == 2) {
    a = 1/ 255 * arguments[1];
  }
  if (arguments.length == 3) {
    g = arguments[1] | 0;
    b = arguments[2] | 0;
  }
  if (arguments.length == 4) {
    g = arguments[1] | 0;
    b = arguments[2] | 0;
    a = 1 / 255 * arguments[3];
  }
  var color = 'rgba(' + r +',' + g + ',' + b + ', ' + a + ')';

  ctx.strokeStyle = color;

};
/*
  SQUARE          : '9',
  ROUND           : '10',
  PROJECT         : '11',
*/

pg.strokeCap = function(type) {

  if (type === 9) {
   ctx.lineCap = 'round';   
  }
  if (type === 10) {
   ctx.lineCap = 'butt';   
  }
  if (type === 11) {
   ctx.lineCap = 'square';   
  }
};
pg.strokeWeight = function(w) {
  ctx.lineWidth = w;   
};



pg.text = function(text, x, y) {
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; ++i) {
    if (CAN_STROKE) {
      ctx.strokeText(lines[i],x,y + i * 20);
    }
    if (CAN_FILL) {
      ctx.fillText(lines[i],x,y + i * 20);
    }
  }
}
  pg.translate = function(x, y) {
    ctx.translate(x, y);
  };
pg.triangle = function (x1, y1, x2, y2, x3, y3) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x3,y3);
  ctx.lineTo(x1,y1);
  if (CAN_STROKE) {
    ctx.stroke();
  }
  if (CAN_FILL) {
    ctx.fill();
  }
};
pg.updatePixels = function() {
  if (pg.pixels.length) {
    var pxl = ctx.getImageData(0,0,WIDTH, HEIGHT);
    var pxlData = pxl.data;
    for (var i = 0; i < pg.pixels.length; i++) {
      var p = pg.pixels[i];
      pxlData[i * 4] = p.r | 0;
      pxlData[i * 4 + 1] = p.g | 0;
      pxlData[i * 4 + 2] = p.b | 0;
      pxlData[i * 4 + 3] = p.a | 0;
    } 

    pxl.data = pxlData;
    ctx.putImageData(pxl,0, 0);
  }
}
  pg.vertex = function(x, y) {
    CURRENT_SHAPE.push([x, y]);
  }
  pg.width = function() {
     
    return WIDTH;
  };

  pg._save = function() {
    ctx.save();

  };

  pg._restore = function() {
    ctx.restore();
  };
  
  return pg;
}
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

  this.get = function(index) {
    return list[index];
  }

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
/**
 * Convert some processing code to codeArt :)
 * @type {Object}
 */
var enums = {
  LEFT            : '0',
  RIGHT           : '2',

  TRIANGLES       : '3',
  TRIANGLE_FAN    : '4',
  TRIANGLE_STRIP  : '5',
  QUADS           : '6',
  QUAD_STRIP      : '7',
  CLOSE           : '8',
  SQUARE          : '9',
  ROUND           : '10',
  PROJECT         : '11',
  CENTER          : '12',
  CORNER          : '13',
  CORNERS         : '14',
  RADIUS          : '15',
  P2D             : '16',
  P3D             : '17',
  POINTS          : '18',
  LINES           : '19',


  FULL_SCREEN     : '20'
}


function PCompiler (src) {
    var TOKENS = [ ',' , ';', ' ', '\t', '+', '!', '(', ')', '#', '\\', '/', '-', '%', '^', '&', '*', '=', '[', ']', '\'', '\"', '{', '}'];
    var source = '';
    var word = '';
    var TYPES = ['void', 'float', 'int', 'PGraphics', 'boolean', 'String'];
    var TOKENS_SPACE = [ ' ' , '\n', '\r', '\t'];
    var CLASS_TYPES  = [];


    /*
      ########  ##     ## ##    ## ########     ######   #######  ########  ######## 
      ##     ## ##     ## ##   ##  ##          ##    ## ##     ## ##     ## ##       
      ##     ## ##     ## ##  ##   ##          ##       ##     ## ##     ## ##       
      ########  ##     ## #####    ######      ##       ##     ## ##     ## ######   
      ##        ##     ## ##  ##   ##          ##       ##     ## ##     ## ##       
      ##        ##     ## ##   ##  ##          ##    ## ##     ## ##     ## ##       
      ##         #######  ##    ## ########     ######   #######  ########  ######## 
                                    
    */
    function handleComments() {
      
    }

    function handleClass() {

      while (src.indexOf('class') !== -1) {

        var className = getNextWord(src, src.indexOf('class') + 5);
     
        var startClass = src.indexOf('class');
        var signatureEnd = getSignature(src, startClass);
        var blockEnd = getNextBlockEnd(src, signatureEnd);


        var pre = src.substr(0, startClass);

        var signature = src.substr(startClass, signatureEnd - startClass);
        var block = src.substr(signatureEnd, blockEnd - signatureEnd);
        var post = src.substr(blockEnd);

        // find and destroy constructor

        var constructorRegExp = new RegExp(className + '[\\s\\r\\t\\n]*\\([^\\)]*\\)[\\s\\r\\t\\n]*\\{' , 'g');

        var constructStr = block.match(constructorRegExp);
        

        block = block.replace(constructStr[0], 'function ' + constructStr[0].replace(className, '____constructor'));
    
        var fullArg = constructStr[0].replace(className, '').replace('{', '');
        // add Call to constructor
        block += '____constructor' + fullArg + ';';
        

        // replaceBlock function by this.functionName = function() {
        // var functionName = this.functionName();
        console.log(block);
        var blockSource = '';
        var stackDeep = 1;

        var internFn = [];

        for (var i = 0; i < block.length; ++i) {
          if (block[i] === '{') {
            stackDeep++;
          }
          if (block[i] === '}') {
            stackDeep--;
          }
          if (TOKENS.indexOf(block[i]) !== -1 || block.charCodeAt(i) < 33) {
  
            if (TYPES.indexOf(word) !== -1) {
              var next = getNextWordToken(block, i);

              // detect function
              if (next === '(' && hasTokenBeforeNextWord(block, i) && stackDeep === 1) {
                var fnName = getNextWord(block, i);
                

                if (TYPES.indexOf(fnName) === -1) {
                  internFn.push(fnName);
                  word = 'function';
                }
              }
            }

            if (CLASS_TYPES.indexOf(word) !== -1) {
              var next = getNextNonSpaceCharacter(block, i);

              if (TOKENS.indexOf(next) === -1) {
                word = 'var ';
              }
            }
            blockSource += word + block[i];
            word = '';
          }
          else {  
            word += block[i];
          }
        }

        // replace function calls!
        for (var i = 0; i < internFn.length; ++i) {
          blockSource += 'this.' + internFn[i] + ' = ' + internFn[i] + ';';
        }
        block = blockSource;

        // update Module signature

        signature = signature.replace('{', fullArg + '{');

        // find all new ClassName[];

        var tabAssignRegexp = new RegExp('new[\\s\\r\\n\\t]*' +  className +'[\\s\\r\\n\\t]*\\[[^\\]]*]', 'g');

        // find all className Declarations

        src = pre + signature + block + post;
        src = src.replace(tabAssignRegexp, '[ ]');

        CLASS_TYPES.push(className);


        src = src.replace('class', 'function');
      }
    }

    function handleArray() {
      // TODO : a small subroutine ot clean [];
      // [] can be array declaration in C, but may sometime be valid JS;
      while (src.indexOf('[]') !== -1) {
        var i = src.indexOf('[]');
        var token = getNextWordToken(src, i + 2);
        if (token === '=') {
          src = replaceAt(src, src.indexOf('{', i + 2), '[');
          src = replaceAt(src, src.indexOf('}', i + 2), ']');
        }
        token = getPrevWordToken(src, i - 1);
        // in js [] may be valid in after a = or ,
  

        if (token !== '=' && token !== ',') {
          src = src.replace('[]', '');
        }
        else {
           src = src.replace('[]', '[ ]');
        }
      } 
    }

    function getSignature(src, index) {
      while (index < src.length && src[index] !== '{') {
        index++;
      }

      return index + 1;
    }


    // We map the depth of current indes :O)
    var TMP_DEPTH_MAP = [];

    function getNextBlockEnd(src, index) {
      var stackSize = 1;
      TMP_DEPTH_MAP = [];
      while (stackSize > 0 && ++index < src.length ) {
        if ( src[index] == '{') {
          stackSize++;
        }
        if ( src[index] == '}') {
          stackSize--;
        }
        TMP_DEPTH_MAP.push(stackSize);
      }

      return index;
    }

    function getNextWord(src, index) {
      var i = 0;
      // pass alll spaces
      while (i < src.length && TOKENS_SPACE.indexOf(src[index + i]) != -1) {
        ++i;
      }
      while (i < src.length && TOKENS.indexOf(src[index + i]) == -1) {
        ++i;
      }
      var word = src.substr(index, i);
      return word.trim();
    }

    function replaceAt(txt, index, character) {
      return txt.substr(0, index) + character + txt.substr(index+character.length); 
    }

    function getNextWordToken(src, index) {
      for (var i = index; i < src.length; ++i) {
        if (TOKENS.indexOf(src[i]) !== -1 && TOKENS_SPACE.indexOf(src[i]) === -1) {
          return src[i];
        }
      }
      return ' ';
    }

    function getNextWordTokenNotComma(src, index) {
      for (var i = index; i < src.length; ++i) {
        if (TOKENS.indexOf(src[i]) !== -1 && TOKENS_SPACE.indexOf(src[i]) === -1) {
          if (src[i] !== ',') {
            return src[i];
          }
        }
      }
      return ' ';
    }

    function getNextNonSpaceCharacter(src,index) {
      for (var i = index; i < src.length; ++i) {
        if (TOKENS_SPACE.indexOf(src[i]) === -1) {
          return src[i];
        }
      }
      return ' ';
    };

    function getPrevWordToken(src,index) {
      for (var i = index; i >= 0; --i) {
        if (TOKENS.indexOf(src[i]) !== -1 && TOKENS_SPACE.indexOf(src[i]) === -1) {
          return src[i];
        }
      }
      return ' ';
    }

    function hasTokenBeforeNextWord(src, index) {
      var hasWord = false;
      for (var i = index; i < src.length; ++i) {

        if (TOKENS.indexOf(src[i]) !== -1 && TOKENS_SPACE.indexOf(src[i]) === -1) {
          return hasWord;
        }
        if (TOKENS_SPACE.indexOf(src[i]) === -1) {
          hasWord = true;
        }
      }
      return hasWord;
    }

    var NUMINC = 1;
    function handleForIn() {
      /*
        something like :
       for (Module mod : mods)
       become 
       for (var __iN = 0, mod = null; __iN < mods.length && mod = mods[__iN]; ++__iN)
      */
      var forInRegExp = new RegExp(/for[\s\r\t\n]*\([^:^;^\)]*:[^\)^;]*\)/g);
      var forInCapRegExp = new RegExp(/for[\s\r\t\n]*\(([^:]*):([^\)]*)\)/g);

      var forins = src.match(forInRegExp);

      for (var i = 0;forins && i < forins.length; ++i) {
        var str =  forins[i];

        var capture = forInCapRegExp.exec(str);

        var varName = capture[1].trim().split(' ')[1];
        var arrayName = capture[2].trim();
        var iteratorName = '__iterator' + (NUMINC++);
        src = src.replace(str, "for (var " 
          + iteratorName 
          + " = 0, "
          + varName
          + " = " 
          + arrayName
          + "["
          + 0
          + "];"
          + iteratorName
          + " < "
          + arrayName
          + ".length"
          + "; "
          + varName
          + " = " 
          + arrayName
          + "[++"
          + iteratorName 
          + "]"
          + ")");
      }
    }

    function handleArrayList() {
      src = src.replace(/ArrayList[\s]*<[\w]*>/g, 'ArrayList');
      CLASS_TYPES.push("ArrayList");
    }

    function handleCommonClass() {
      CLASS_TYPES.push("PVector");
    };

    function handleClassCast() {
      for (var i = 0; i < CLASS_TYPES.length; ++i) {
        var castRG = new RegExp('\\([\\s]*'+ CLASS_TYPES[i] + '[\\s]*\\)', 'g');
        src = src.replace(castRG, ' ');
      }
      var castRG = new RegExp('\\([\\s]*int[\\s]*\\)', 'g');
      src = src.replace(castRG, ' 0 | ');

      for (var i = 0; i < TYPES.length; ++i) {
        var castRG = new RegExp('\\([\\s]*'+ TYPES[i] + '[\\s]*\\)', 'g');
        src = src.replace(castRG, ' ');
      }
    }

    src = src.replace(/&amp;/g, '&');

    handleArrayList();
    handleCommonClass();
    handleComments();
    handleClass();
    handleArray();
    handleForIn();

    handleClassCast();



    for (var i = 0; i < src.length; ++i) {
      if (TOKENS.indexOf(src[i]) !== -1 || src.charCodeAt(i) < 33) {


        if (word === 'width') {
          word = 'width()';
        }
        if (word === 'height') {
          word = 'height()';
        }

        if (word === 'mouseButton') {
          word = 'mouseButton()';
        }

        if (word === 'mouseX') {
          word = 'mouseX()';
        }
        if (word === 'mouseY') {
          word = 'mouseY()';
        }
        if (word === 'frameCount') {
          word = 'frameCount()';
        }

        if (word === 'cos') {
          word = 'Math.cos';
        }
        if (word === 'sin') {
          word = 'Math.sin';
        }
        if (word === 'abs') {
          word = 'Math.abs';
        }
        if (word === 'ceil') {
          word = 'Math.ceil';
        }
        if (word === 'floor') {
          word = 'Math.floor';
        }
        if (word === 'acos') {
          word = 'Math.acos';
        }
        if (word === 'asin') {
          word = 'Math.asin';
        }
        if (word === 'tan') {
          word = 'Math.tan';
        }
        if (word === 'atan') {
          word = 'Math.atan';
        }
        if (word === 'atan2') {
          word = 'Math.atan2';
        }
        if (word === 'sqrt') {
          word = 'Math.sqrt';
        }
        if (word === 'random') {
          word = 'Math.random';
        }

        if (word === 'println') {
          word = 'console.log';
        }

        if (TYPES.indexOf(word) !== -1) {
          var next = getNextWordToken(src, i);

          // detect function
          if (next === '(' && hasTokenBeforeNextWord(src, i)) {

            word = 'function ';
          }
          // detect cast
          else if (next === '(') {
            if (word === 'int') {
              word = '0|'
            }
            else {
              word = '';
            }
          }
          else if (next === ')') {
            word = '';
          }
          else if (next === ',') {
            if (getNextWordTokenNotComma(src, i) !== ')') {
              word = 'var ';
            }
            else {
              word = '';
            }
          }
          else if (word === 'class') {
             word = 'class ';
          }
          else {
            word = 'var ';
          }
        }

        if (CLASS_TYPES.indexOf(word) !== -1) {
          var next = getNextNonSpaceCharacter(src, i);

          if (TOKENS.indexOf(next) === -1) {
            word = 'var ';
          }
        }

        if (enums[word]) {
          word = enums[word];
        }
        source += word + src[i];
        word = '';
      }
      else {
        word += src[i];
      }
    }

  
    console.log(source);

    return source;
  }


function CodeArt(canvas) {
 

  var mainPG = PGraphics(canvas);
  
  /**
   * COMPILER
   */
  var source = canvas.innerHTML;

  // [\[\]\ \(\,\t\n\;\)\*\+\-\/\>\<\=\\]
  source = source.replace(/&lt;/g, '<');
  source = source.replace(/&gt;/g, '>');

  source = PCompiler(source);
  
  var FRAME_RATE = 0;
  function frameRate(f) {
    FRAME_RATE = f;
  }

  function map(value, start1, stop1, start2, stop2) {
    var d1 = stop1 - start1;
    var d2 = stop2 - start2;

    var d = value - start1;

    return start2 + d * (d2 / d1);
  }

  function radians(angle) {
    return angle * Math.PI / 180;
  }

  /**
   * Loop logic
   */
  var LOOP = true;
  function noLoop() {
    LOOP = false;
  }
 
  function loop() {
    LOOP = true;
  }

  var loopFn = null;
  function __run() {
    if (!FRAME_RATE) {
      window.requestAnimationFrame(__run);
    }
    else {
      setTimeout(__run, 1000 / FRAME_RATE);
    }
    if (LOOP) {
      FRAMECOUT++;
      mainPG._save();
      loopFn();
      mainPG._restore();
    }
  }

  function ___SetLoop(loop) {
    loopFn = loop;
    loop();
    __run();
  }

  function redraw() {
    loopFn();
  }


  var MOUSE = {
    x : 0,
    y : 0
  };

  var FRAMECOUT = 0;
  function frameCount() {
    return FRAMECOUT;
  }

  function mouseX() {
    return MOUSE.x;
  }

  function mouseY() {
    return MOUSE.y;
  }

  var ON_MOUSE_PRESSED = [];
  function ___SetMousePressed(fn) {
    ON_MOUSE_PRESSED.push(fn);
  }

  var ON_MOUSE_RELEASED = [];
  function ___SetMouseReleased(fn) {
    ON_MOUSE_RELEASED.push(fn);
  }


  var currenButton = 0;

  canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  canvas.addEventListener('mousemove', function(e) {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;

    e.preventDefault();
    e.stopPropagation();

  });


  canvas.addEventListener('mousedown', function(e) {
    currenButton = e.button;
    for (var i = 0; i < ON_MOUSE_PRESSED.length; ++i) {
      ON_MOUSE_PRESSED[i](e.clientX, e.clientY);
    }
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
    e.preventDefault();
    e.stopPropagation();
    return false;
  });


  canvas.addEventListener('mouseup', function(e) {
    currenButton = e.button;
    for (var i = 0; i < ON_MOUSE_RELEASED.length; ++i) {
      ON_MOUSE_RELEASED[i]();
    }

    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;

    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  function mouseButton() {
    return currenButton;
  }

  function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  function random(high) {
    if (arguments.length === 2) {
      var low = arguments[0];
      var high = arguments[1]
      return low + Math.random() * (low - high);
    }
    return Math.random() * high;
  }

  function color() {
     if (arguments.length === 1) {
      return {
        r : arguments[0] | 0,
        g : arguments[0] | 0,
        b : arguments[0] | 0,
        a : 255
      }
    }
    if (arguments.length === 3) {
      return {
        r : arguments[0] | 0,
        g : arguments[1] | 0,
        b : arguments[2] | 0,
        a : 255
      }
    }
  }


  // constants
  source = 'var PI = Math.PI; var TWO_PI = Math.PI * 2;var CLOSE = 1;' + source;


  var fn = new Function(
    'width',
    'height',
    'size',
    'background',
    'noFill',
    'stroke',
    'point',
    'line',
    'rect',
    'noStroke',
    'fill',
    'ellipse',
    'createGraphics',
    'beginDraw',
    'endDraw',
    'image',
    'noSmooth',
    'translate',
    'triangle',
    'arc',
    'quad',
    'bezier',
    'text',

    'loadPixels',
    'updatePixels',
    'pixels',

    'pushStyle',
    'popStyle',
    
    'pushMatrix',
    'popMatrix',

    'beginShape',
    'endShape',
    'vertex',

    'strokeWeight',
    'strokeCap',

    'rectMode',
    'ellipseMode',


    'rotate',

    'mouseButton',

    'map',
    'frameRate',
    'radians',
    'dist',
    'random',
    'color',

    'ArrayList',
    'PVector',

    '___SetLoop',
    '___SetMousePressed',
    '___SetMouseReleased',
    'noLoop',
    'loop',
    'redraw',
    'mouseX',
    'mouseY',
    'frameCount',
    

    source += 'var setup; var draw; var mousePressed; var mouseReleased; if(setup) {setup()} if (mousePressed) {___SetMousePressed(mousePressed)}  if (mouseReleased) {___SetMouseReleased(mouseReleased)} if (draw) {___SetLoop(draw)}');

  fn(
    mainPG.width,
    mainPG.height,
    mainPG.size,
    mainPG.background,
    mainPG.noFill,
    mainPG.stroke,
    mainPG.point,
    mainPG.line,
    mainPG.rect,
    mainPG.noStroke,
    mainPG.fill,
    mainPG.ellipse,
    mainPG.createGraphics,
    mainPG.beginDraw,
    mainPG.endDraw,
    mainPG.image,
    mainPG.noSmooth,
    mainPG.translate,
    mainPG.triangle,
    mainPG.arc,
    mainPG.quad,
    mainPG.bezier,
    mainPG.text,

    mainPG.loadPixels,
    mainPG.updatePixels,
    mainPG.pixels,

    mainPG.pushStyle,
    mainPG.popStyle,

    mainPG._save,
    mainPG._restore,

    mainPG.beginShape,
    mainPG.endShape,
    mainPG.vertex,
    
    mainPG.strokeWeight,
    mainPG.strokeCap,

    mainPG.rectMode,
    mainPG.ellipseMode,

    mainPG.rotate,

    mouseButton,

    map,
    frameRate,
    radians,
    dist,
    random,
    color,

    ArrayList,
    PVector,
    
    ___SetLoop,
    ___SetMousePressed,
    ___SetMouseReleased,
    noLoop,
    loop,
    redraw,
    mouseX,
    mouseY,
    frameCount
  );
}
/*
  Main
 */

function startCodeArt() {
  var canvasList = document.querySelectorAll('canvas');
  console.log(canvasList);
  
  for (var i = 0; i < canvasList.length; i++) {
    if (canvasList[i].getAttribute("codeart")) {
      new CodeArt(canvasList[i]);
    }
  }
}

window.addEventListener('load', startCodeArt);