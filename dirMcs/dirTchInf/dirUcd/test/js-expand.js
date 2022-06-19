/**
 * 0000..001F;East-Asian-Width= N-Neutral
 * 0020;East-Asian-Width= Na-Narrow
 *
 * expands lines of block1..blockn;version
 * to block1;version ... blockn;version
 *
 * modified: {2018-06-20}
 * created: {2018-06-12}
 */

var
  moFs = require('fs'),
  sFileIn= 'Unicode-alpha.txt',
  sFileOut= 'Unicode-alpha2.txt',
  sOut = '',
  aLines = moFs.readFileSync(sFileIn).toString().split('\n');

/**
 * for each line expand if range.
 */
for (var n = 0; n < aLines.length; n++) {
  var sLn = aLines[n];

  if (sLn.indexOf('..') == -1) {
    var a = sLn.split(';');
    sOut = sOut + fToUcd(a[0]) +';' +a[1] +'\n';
  } else {
    sOut = sOut + fExpand_range(sLn);
  }
}

function fExpand_range(sLn) {
  var sR='', //return
    sD, //data
    sBF, //blockFirst
    sBL, //blockLast
    nBF, //number-decimal
    nBL,
    a = sLn.split(';'),
    a2;
  sD = a[1];
  a2 = a[0].split('..')
  sBF = a2[0]
  sBL = a2[1]
  nBF = parseInt(sBF, 16) //hti
  nBL = parseInt(sBL, 16)

  for (var nB = nBF; nB <= nBL; nB++) {
    var n =nB.toString(16).toUpperCase();
    sR = sR + fToUcd(n)  +';' +sD +'\n'
  }
  return sR;
}

//input: A0F
//outut: U+00A0F
function fToUcd(sIn) {
	var n2=sIn.length;
	if (n2==5){sIn="U+" +sIn}
	else if (n2==4){sIn="U+0" +sIn}
	else if (n2==3){sIn="U+00" +sIn}
	else if (n2==2){sIn="U+000" +sIn}
	else if (n2==1){sIn="U+0000" +sIn}
  return sIn;
}

moFs.writeFileSync(sFileOut, sOut);

