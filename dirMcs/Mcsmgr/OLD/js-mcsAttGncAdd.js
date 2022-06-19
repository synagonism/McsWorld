/**
 * Add generic-attribute in current concept.
 *
 * Input: Ask for current-concept's path.
 * Output: filMcs.html file.
 * run: node js-mcsAttGncAdd.js
 *
 * version.0-1-0.2017-10-11,
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
