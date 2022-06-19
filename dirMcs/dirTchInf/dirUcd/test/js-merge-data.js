/**
 * U+00000.;control.NULL · block = Basic-Latin · generic = C0 controls · age = v1-1.1993-06;
 * U+00000;general_category= otherControl · bidi_class= BN-boundary_neutral · Bidi_Mirrored= N
 *
 * merge UnicodeData-lines into char
 *
 * modified: {2018-06-18}
 * created: {2018-06-17}
 */

var
  moFs = require('fs'),
  sFileIn= 'filMcsUcd15.html',
  sFileOut= 'filMcsUcd15-alpha.html',
  sOut = '',
  aLines = moFs.readFileSync(sFileIn).toString().split('\n');

/**
 * for each line
 */
for (var n = 0; n < aLines.length; n++) {
  var sLn = aLines[n],
    sCh1,
    sCh2;

  if (sLn.indexOf('.;') === 7) {
    //found char
    //read NEXT line
    var sLn2 = aLines[n+1];
    //if data
    if (sLn2.indexOf(';') === 7) {
      //if SAME char!!!
      sCh1= sLn.substring(0,7)
      sCh2= sLn2.substring(0,7)
      if (sCh1 === sCh2) {
        sOut = sOut + sLn +' · ' +sLn2.substring(8) +'\n';
      } else {
        sOut = sOut + sLn + '\n';
        console.log(sLn2)
      }
      n = n+1
    } else {
      //char, block
      sOut = sOut + sLn + '\n';
    }
  } else if (sLn.indexOf(';') === 7) {
    //data-line
    console.log(sLn)
  } else if (sLn.indexOf('..') === 7) {
    //block-line, add
    sOut = sOut + sLn + '\n';
  } else {
    //unknown line
    console.log(sLn)
  }
}

moFs.writeFileSync(sFileOut, sOut);

