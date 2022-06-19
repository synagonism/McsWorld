/**
 * expands lines of block1..blockn;version
 * to block1;version ... blockn;version
 *
 * Input: Unicode-DerivedAge.txt
 * Output: Unicode-age.txt
 *
 * modified: {2018-06-12}
 * created: {2018-06-12}
 */

var
  moFs = require('fs'),
  mfReadlines = require('n-readlines'), // npm install n-readlines
  sOut = '',
  aLines = moFs.readFileSync('Unicode-DerivedAge.txt').toString().split('\n');

/**
 * for each line expand if range.
 */
for (var n = 0; n < aLines.length; n++) {
  var sLn = aLines[n];

  if (sLn.indexOf('..') == -1) {
    sOut = sOut + sLn + '\n';
  } else {
    sOut = sOut + fExpand_range(sLn);
  }
}

function fExpand_range(sLn) {
  var sR='', //return
    sV, //version
    sBF, //blockFirst
    sBL, //blockLast
    nBF, //number-decimal
    nBL,
    a = sLn.split(';'),
    a2;
  sV = a[1];
  a2 = a[0].split('..')
  sBF = a2[0]
  sBL = a2[1]
  nBF = parseInt(sBF.substring(2), 16) //hti
  nBL = parseInt(sBL.substring(2), 16)

  for (var nB = nBF; nB <= nBL; nB++) {
    var n =nB.toString(16).toUpperCase(), n2=n.length;
    if (n2==4){n="0"+n}
    else if (n2==3){n="00"+n}
    else if (n2==2){n="000"+n}
    else if (n2==1){n="0000"+n}
    sR = sR + 'U+' +n  +';' +sV +';\n'
  }
  return sR;
}

moFs.writeFileSync('Unicode-age.txt', sOut);

