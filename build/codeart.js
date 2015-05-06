/**
 * Concoct!
 */

function PGraphics(canvas) {
  var ctx = canvas.getContext('2d');
  // set default colors
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000';
  var CAN_FILL = true;
  var CAN_STROKE = true;

  var HEIGHT = canvas.height;
  var WIDTH = canvas.width;
  
  var SHAPE_MODE = 0;
  var SHAPE_VERTEX_COUNT = 0;
  var CURRENT_SHAPE = [];

  var pg = {};

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

    ctx.beginPath();
    ctx.ellipse(x,y,w/2,h/2, 0, 0, Math.PI * 2);
    if (CAN_STROKE) {
      ctx.stroke();
    }
    if (CAN_FILL) {
      ctx.fill();
    }
  };

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
  pg.noFill = function () {
   
    CAN_FILL = false;
  };
 pg.noSmooth = function() {
    ctx.imageSmoothingEnabled = false;
  };

  pg.noStroke = function () {
 
    CAN_STROKE = false;
  };
  pg.point = function (x, y) {
  
    if (CAN_FILL) {
      ctx.fillRect(x, y, 1, 1);
    }
    if (CAN_STROKE) {
      ctx.strokeRect(x, y, 1, 1);
    }
  };
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
   
    if (CAN_STROKE) {
      ctx.strokeRect(x,y,w,h);
    }
    if (CAN_FILL) {
      ctx.fillRect(x,y,w,h);
    }
  };

  pg.rotate = function(angle) {
    ctx.rotate(angle);
  };


pg.size = function (w, h) {
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  WIDTH = w;
  HEIGHT = h;
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
  pg.vertex = function(x, y) {
    CURRENT_SHAPE.push([x, y]);
  }
  pg.width = function() {
     
    return WIDTH;
  };

  pg._save = function() {
    ctx.save();
    // set default colors
  //  ctx.fillStyle = '#fff';
 //   ctx.strokeStyle = '#000';
  };

  pg._restore = function() {
    ctx.restore();
  };

  
  return pg;
}
/**
 * Convert some processing code to codeArt :)
 * @type {Object}
 */
var enums = {
  POINTS          : '1',
  LINES           : '2',
  TRIANGLES       : '3',
  TRIANGLE_FAN    : '4',
  TRIANGLE_STRIP  : '5',
  QUADS           : '6',
  QUAD_STRIP      : '7',
  CLOSE           : '8',

  SQUARE          : '9',
  ROUND           : '10',
  PROJECT         : '11',

}


function PCompiler (src) {
    var TOKENS = [ ',' , ';', ' ', '\t', '+', '!', '(', ')', '#', '\\', '/', '-', '%', '^', '&', '*', '=', '[', ']', '\'', '\"', '{', '}'];
    var source = '';
    var word = '';
    var TYPES = ['void', 'float', 'int', 'PGraphics', 'boolean', 'class'];
    var TOKENS_SPACE = [ ' ' , '\n', '\r', '\t'];

    function handleClass() {
      while (src.indexOf('class') !== -1) { 
        getNextWord(src, src.indexOf('class') + 5);
        src = src.replace('class', '');
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
      console.log(word);
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
    
    handleClass();
    handleArray()

    for (var i = 0; i < src.length; ++i) {
      if (TOKENS.indexOf(src[i]) !== -1 || src.charCodeAt(i) < 33) {


        if (word === 'width') {
          word = 'width()';
        }
        if (word === 'height') {
          word = 'height()';
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

        if (TYPES.indexOf(word) !== -1) {
          var next = getNextWordToken(src, i);
        //  console.log(word, next);

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
          else if (next === ')' || next === ',') {
            word = '';
          }
          else if (word === 'class') {
             word = 'class ';
          }
          else {
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

  canvas.addEventListener('mousemove', function(e) {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
    console.log(MOUSE.x, MOUSE.y);
  });


  canvas.addEventListener('mousedown', function(e) {
    for (var i = 0; i < ON_MOUSE_PRESSED.length; ++i) {
      ON_MOUSE_PRESSED[i](e.clientX, e.clientY);
    }
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
  });


  function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
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
    
    'pushMatrix',
    'popMatrix',

    'beginShape',
    'endShape',
    'vertex',

    'strokeWeight',
    'strokeCap',


    'rotate',

    'map',
    'frameRate',
    'radians',
    'dist',

    '___SetLoop',
    '___SetMousePressed',
    'noLoop',
    'loop',
    'redraw',
    'mouseX',
    'mouseY',
    'frameCount',
    

    source += 'var setup; var draw; var mousePressed; if(setup) {setup()} if (mousePressed) {___SetMousePressed(mousePressed)} if (draw) {___SetLoop(draw)}');

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


    mainPG._save,
    mainPG._restore,

    mainPG.beginShape,
    mainPG.endShape,
    mainPG.vertex,
    
    mainPG.strokeWeight,
    mainPG.strokeCap,

    mainPG.rotate,

    map,
    frameRate,
    radians,
    dist,

    ___SetLoop,
    ___SetMousePressed,
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

  
  for (var i = 0; i < canvasList.length; i++) {
    if (canvasList[i].getAttribute("codeart")) {
      new CodeArt(canvasList[i]);
    }
  }
}

