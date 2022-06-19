/**
 * on U+FFFFF adds /decimal
 *
 * modified: {2018-06-18}
 * created: {2018-06-15}
 */

var
  moFs = require('fs'),
  moUtil = require('js-moUtil.js'),
  sFileIn = 'Unicode-block4.txt',
  sFileOut = 'Unicode-block5.txt',
  sOut = '',
  aLines = moFs.readFileSync(sFileIn).toString().split('\n');

/**
 * for each line decide.
 */
for (var n = 0; n < aLines.length; n++) { //aLines.length;
  sOut=sOut +moUtil.fUcdAddGlyph(aLines[n]) +'\n'
}

moFs.writeFileSync(sFileOut, sOut);
