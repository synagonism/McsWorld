/**
 * finds the-blocks of
 *
 * Input: filMcsUcd.html
 * Output: Unicode-block.txt
 *
 * modified: {2018-06-15}
 * created: {2018-06-15}
 */

var
  moFs = require('fs'),
  sOut = '',
  aLines = moFs.readFileSync('filMcsUcd.html').toString().split('\n');

/**
 * for each line expand if range.
 */
for (var n = 0; n < aLines.length; n++) {
  var sLn = aLines[n];

  if (sLn.indexOf('..U') === 7) {
    //found block
    var a;
    if (sLn.indexOf('::@') !==-1) {
      a=sLn.split('::@')
      sOut = sOut + a[0] + '\n';
    } else {
      sOut = sOut + sLn + '\n';
    }
  }
}

moFs.writeFileSync('Unicode-block.txt', sOut);

