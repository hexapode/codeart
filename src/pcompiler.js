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
        var className = getNextWord(src, src.indexOf('class') + 5);
        // find and destroy constructor

          var block = getNextBlock(src, src.indexOf('class'));
      
        // find all new ClassName();


        // find all className Declarations


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