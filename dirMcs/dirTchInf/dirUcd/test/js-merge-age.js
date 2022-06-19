/**
 * U+001B3.;LATIN-CAPITAL-LETTER-Y-WITH-HOOK ·* a glyph variant with hook at the left also occurs · block = Latin-Extended-B · generic = Non-European and historic Latin
 * U+001B3;v1-1.1993-06;
 *
 * merge age-lines into char
 *
 * Input: Unicode-DerivedAge.txt
 * Output: Unicode-age.txt
 *
 * modified: {2018-06-17}
 * created: {2018-06-17}
 */

var
  moFs = require('fs'),
  sFileIn= 'filMcsUcd3.html',
  sFileOut= 'filMcsUcd4.html',
  sOut = '',
  aLines = moFs.readFileSync('filMcsUcd3.html').toString().split('\n');

/**
 * for each line
 */
for (var n = 0; n < aLines.length; n++) {
  var sLn = aLines[n];

  if (sLn.indexOf('.;') === 7) {
    //found char
    var sLn2 = aLines[n+1];

    if (sLn2.indexOf(';v') === 7) {
      sOut = sOut + sLn +'· age = ' +sLn2.split(';v')[1] +'\n';
      n = n+1
    } else {
      //char, block
      sOut = sOut + sLn + '\n';
    }
  } else if (sLn.indexOf(';v') === 7) {
    n=n+1
    console.log(sLn)
  } else {
    //block-line, add
    sOut = sOut + sLn + '\n';
  }
}

moFs.writeFileSync('filMcsUcd4.html', sOut);

