/**
 * creates SPECIFICS on blocks.
 *
 * modified: {2018-06-16}
 * created: {2018-06-13}
 */

var
  moFs = require('fs'),
  sFileIn = 'filMcsUcd.html',
  sFileOut = 'filMcsUcd2.html',
  sOut = '',
  aLines = moFs.readFileSync(sFileIn).toString().split('\n'),
  nBlock=-1,  //index of block
  sBlock,
  sSpc= '',    //specific to add on char
  sSpcAll= ' ::@specific', //aggregate specifics to add on block
  sChar;


/**
 * for each line decide.
 */
for (var n = 0; n < aLines.length; n++) { //aLines.length;
  var sLn = aLines[n];

  if (sLn.indexOf('..U+') === 7) {
    //found block
    //add sSpcAll to previous block
    if (nBlock!==-1 || n===aLines.length-5) {
      aLines[nBlock] = aLines[nBlock] +sSpcAll;
      sSpcAll=' ::@specific';
    }
    //set new block
    sBlock= sLn.split(' ::@')[0].substring(17);
    nBlock= n;
  } else if (sLn.indexOf('@\t\t') === 0) {
    //specific found
    if (sLn.indexOf(' :@+\t\t') !== -1) {
      var a= sLn.split(' :@+\t\t')
      sSpc= a[0].substring(3);
      sSpcAll = sSpcAll +' * '+sSpc +': ' +a[1];
    } else {
      sSpc= sLn.substring(3);
      sSpcAll = sSpcAll +' * '+sSpc
    }
    aLines[n]= '' //remove spec
  } else if (sLn.indexOf('.;') === 7) {
    //char found
    sChar= sLn.split('.;')[0];
    //add block and generic to char
    aLines[n]= aLines[n] +' · block = ' +sBlock
      +' · generic = ' +sSpc;
    //add char to sSpcAll
    sSpcAll = sSpcAll +' ** '+sChar;
  }
}

for (var n = 0; n < aLines.length; n++) { //aLines.length
  sOut= sOut + aLines[n] +'\n'
}
moFs.writeFileSync(sFileOut, sOut);

