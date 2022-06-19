/**
 * Add an-attribute in current-concept.
 *
 * Input: Ask for current-concept's path.
 * Output: Current-concept with the-attribute.
 * run: node js-mcsAttAdd.js
 *
 * ALGO:
 * 1. Ask for current-concept (path).
 * 2. Ask for specific or not attribute.
 * 3. IF SPECIFIC:
 * 3.1 Ask for new or not (generalize one from specific)
 * 3.2 IF new:
 * 3.2.1 Ask for Generic or not.
 * 3.2.1.1 IF Generic:
 * 3.2.1.1.1 Find generic-cpt and its attrs.
 * 3.2.1.2 IF GenericNo:
 * 3.2.1.2.1 Find position to add.
 * 3.3 IF old:
 * 3.3.1 Ask for specific to generalize att.

 * 4. IF SPECIFIC.NO:
 * 4.1 Ask for generic or not:
 * 4.2 IF generic:
 * 4.2.1 Find generic-cpt and its attrs.
 * 4.3 IF genericNO:
 * 4.3.1 Find position and add.
 * version.0-1-0.2017-10-15,
 */



var
  moFs = require('fs'),
  moUtil = require('./js-moUtil.js'),
  moMcsUtil = require('./js-mcsMoUtil.js'),
  //Directory of the-concept (dirCor or else)
  //BASE-DIR = dirMiwMcs
  sDir = 'dirCor/',
  //Name of the-mcs
  sN = 'ModelConceptStructured',
  //Short-name eg DLgr-net
  sNs = 'Mcs',
  //Short-Short-name without '-', on file-name
  sNss = sNs.replace(/-/g, ''),
  //Concept path
  sPath = sDir + sNss,
  //Name for IDs eg DLgr
  sNid = 'Mcs',
  s; //output concept.


function fAsk(sQuestionIn, fCallbackIn) {
  var
    oStdin = process.stdin,
    oStdout = process.stdout;

  oStdin.resume();
  oStdout.write(`${sQuestionIn}: `);

  oStdin.once('data', function(sDataIn) {
    sDataIn = sDataIn.toString().trim();

    if (!sDataIn || sDataIn === '') {
      oStdout.write('Please enter some data bro... \n');
      fAsk(sQuestionIn, fCallbackIn);
    }
    else {
      fCallbackIn(sDataIn);
    }
  })
}


fAsk('what is the-path of current-concept?', function(sPathIn) {
  var
    sAtt;
  sPath = moMcsUtil.fMcsFindGnrRs(sPathIn);
  sAtt = moMcsUtil.fAttSpcRsOl(sPath);
  fAsk(sAtt, function() {
    process.exit();
  });
});

//moFs.writeFileSync(sDir + 'filMcs' + sNss + '.html', s);
