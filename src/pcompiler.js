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