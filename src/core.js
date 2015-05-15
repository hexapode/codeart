

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

    '___SetLoop',
    '___SetMousePressed',
    '___SetMouseReleased',
    'noLoop',
    'loop',
    'redraw',
    'mouseX',
    'mouseY',
    'frameCount',
    

    source += 'var setup; var draw; var mousePressed; if(setup) {setup()} if (mousePressed) {___SetMousePressed(mousePressed)}  if (mouseReleased) {___SetMouseReleased(mouseReleased)} if (draw) {___SetLoop(draw)}');

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