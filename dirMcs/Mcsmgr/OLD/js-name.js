/**
 * Remove|Add the-names of files in name.txt on namidx.X.json
 *
 * Input: name.txt
 * Output: nameidx.X.json
 * run: node --harmony name.js
 *
 * modified: {2017-07-02}
 * created: {2017-06-01}
 */

var
  moFs = require('fs'),
  mfReadlines = require('n-readlines'), // npm install n-readlines
  oNextln,
  aFilesHmlInComments = moFs.readFileSync('name.txt').toString().split('\n'),
  aFilesHmlIn = [],
  //read namidx.0
  aNam0 = JSON.parse(moFs.readFileSync('namidx.0.json')),
  //object to hold the-names of namidx-files and the corresponding symbols
  //we want the-names of files to be only english.
  oIdxNam = {
    engA:'A', engB:'B', engC:'C', engD:'D', engE:'E', engF:'F',
    engG:'G', engH:'H', engI:'I', engJ:'J', engK:'K', engL:'L',
    engM:'M', engN:'N', engO:'O', engP:'P', engQ:'Q', engR:'R',
    engS:'S', engT:'T', engU:'U', engV:'V', engW:'W', engX:'X',
    engY:'Y', engZ:'Z',
    /* greek letters
    ellAl-ALPHA, ellBe-BETA, ellGa-GAMMA, ellDe-DELTA, ellEp-EPSILON,
    ellZe-ZETA, ellEt-ETA, ellTh-THETA, ellIo-IOTA, ellKa-KAPPA,
    ellLa-LAMDA, ellMu-MU, ellNu-NU, ellXi-XI, ellOn-OMICRON, ellPi-PI,
    ellRh-RHO, ellSi-SIGMA, ellTa-TAU, ellUp-UPSILON, ellPh-PHI,
    ellCh-CHI, ellPs-PSI, ellOm-OMEGA */
    ellAl:'Α', ellBe:'Β', ellGa:'Γ', ellDe:'Δ', ellEp:'Ε', ellZe:'Ζ',
    ellEt:'Η', ellTh:'Θ', ellIo:'Ι', ellKa:'Κ', ellLa:'Λ', ellMu:'Μ',
    ellNu:'Ν', ellXi:'Ξ', ellOn:'Ο', ellPi:'Π', ellRh:'Ρ', ellSi:'Σ',
    ellTa:'Τ', ellUp:'Υ', ellPh:'Φ', ellCh:'Χ', ellPs:'Ψ', ellOm:'Ω',
    ZZZ:'ZZZ'
  },
  //object to hold the-arrays with the-names-urls
  //after reading filMcsName.html files.
  oIdxAnu = {
    aengA:[], aengB:[], aengC:[], aengD:[], aengE:[], aengF:[],
    aengG:[], aengH:[], aengI:[], aengJ:[], aengK:[], aengL:[],
    aengM:[], aengN:[], aengO:[], aengP:[], aengQ:[], aengR:[],
    aengS:[], aengT:[], aengU:[], aengV:[], aengW:[], aengX:[],
    aengY:[], aengZ:[],
    aellAl:[], aellBe:[], aellGa:[], aellDe:[], aellEp:[], aellZe:[],
    aellEt:[], aellTh:[], aellIo:[], aellKa:[], aellLa:[], aellMu:[],
    aellNu:[], aellXi:[], aellOn:[], aellPi:[], aellRh:[], aellSi:[],
    aellTa:[], aellUp:[], aellPh:[], aellCh:[], aellPs:[], aellOm:[],
    aZZZ:[],
   };

/**
 * FIRST, find the-mcs-files to remove|add its names.
 * Put paths in aFilesHmlIn.
 */
for (var n = 0; n < aFilesHmlInComments.length; n++) {
  var
    sLn = aFilesHmlInComments[n];

  // remove comments and empty-lines
  if (!sLn.startsWith('//') && sLn.length !== 0) {
    aFilesHmlIn.push(sLn);
  }
}

/**
 * SECOND, for EACH FILE in aFilesHmlIn,
 * REMOVE the-names linked to this file, from all namidx-files.
 */
for (var n = 0; n < aFilesHmlIn.length; n++) {
  var
    sFilRmv = aFilesHmlIn[n]; //the-file we want to remove

  //For each namidx-file
  for (var sK in oIdxNam) {
    var
      aNamDif = [],
      sFilIdx = 'namidx.' + sK + '.json',
      sIdx,
      sNam,
      sUrl;
    if (moFs.existsSync(sFilIdx)) {
      var
        //read existing namidx.X
        aEx = JSON.parse(moFs.readFileSync(sFilIdx));
      sIdx = aEx[0][0].substring(1);
      //create new array with names NOT in sFilRmv
      //do not read the first line which contains meta info
      for (var nE = 0; nE < aEx.length; nE++) {
        //the-url of a-name
        sUrl = aEx[nE][1];
        //add on aNamDif the-names without the-file to remove
        if (!aEx[nE][0].startsWith(';') && !sUrl.startsWith(sFilRmv)) {
          aNamDif.push(aEx[nE]);
        }
      }
      //IF aNamDif has names, create the-index.file
      //IF aNamDif has no-names, delete the-index-file
      if (aNamDif.length > 0) {
        fWriteJsonSync(sFilIdx, aNamDif, oIdxNam[sK], true);
      } else {
        moFs.unlinkSync(sFilIdx);
      }
    }
  }
}


/**
 * THIRD, For each file in aFilesHmlIn
 * read the-file and ADD its new-names on oIdxAnu['a'+oIdxNam.key].
 */
for (var n = 0; n < aFilesHmlIn.length; n++) {
  var
    sLn,
    sLnOrg, //LineOriginal
    sLnLc,  //LineLowercase
    sUrl;   //The-url of the-concept, is the-url of the-section-element is in.

  oReadlines = new mfReadlines(aFilesHmlIn[n]);
  while (oNextln = oReadlines.next()) {
    sLnOrg = oNextln.toString();
    sLnLc = sLnOrg.toLowerCase();

    //process the-section and cpt lines
    if (sLnOrg.indexOf('<section id="') >= 0) {
      //first get the-id of the-section
      //names are-stored inside a-section
      sUrl = sLnOrg.substring(sLnOrg.indexOf('"')+1,sLnOrg.lastIndexOf('"'));
      sUrl = aFilesHmlIn[n] + '#' + sUrl;
    } else if (
         sLnLc.startsWith('    <br>* cpt.')
      || sLnLc.startsWith('    <br>* ενν.')
      || sLnLc.startsWith('    <br> &nbsp; &nbsp;* ενν.')
      || sLnLc.startsWith('    <br> &nbsp; &nbsp; &nbsp; &nbsp;* ενν.')
              ) {
      //store names in arrays
      //Get the-14-char of line
      //if oIdxNam includes 14char
      //else put in oIdxAnu['aZZZ']
      var
        sChar,
        a;
      if (sLnLc.indexOf('* cpt.') > 0) {
        sChar = sLnLc.charAt(sLnLc.indexOf('* cpt.')+6).toUpperCase(), //char at cpt.X
        a = [sLnOrg.substring(sLnLc.indexOf('* cpt.')+6, sLnOrg.indexOf(',')), sUrl];
      } else if (sLnLc.indexOf('* ενν.') > 0) {
        sChar = sLnLc.charAt(sLnLc.indexOf('* ενν.')+6).toUpperCase(), //char at cpt.X
        a = [sLnOrg.substring(sLnLc.indexOf('* ενν.')+6, sLnOrg.indexOf(',')), sUrl];
      }
      //GREEK INDEX CHANGES
      if (sChar === 'Ά') {sChar = 'Α';}
      if (sChar === 'Έ') {sChar = 'Ε';}
      if (sChar === 'Ό') {sChar = 'Ο';}
      if (sChar === 'Ώ') {sChar = 'Ω';}
      if (sChar === 'Ί') {sChar = 'Ι';}
      if (sChar === 'Ή') {sChar = 'Η';}
      if (sChar === 'Ύ') {sChar = 'Υ';}
      if (Object.values(oIdxNam).includes(sChar)) {
        oIdxAnu['a'+fObjvalRKey(oIdxNam, sChar)].push(a);
      } else {
        oIdxAnu['aZZZ'].push(a);
      }
      //Algo with variable-length indexes
      //Find prefix-3letters of text to insert
      //For each index
      //IF prefix < index
      //PUT text in previous index
      //{2017-10-09}
    }
  }
}

/**
 * FORTH, write the-non-empty-arrays in oIdxAnu in namidx-files.
 */
for (var sK in oIdxNam) {
  var
    sNew = 'a' + sK, //the-name of the-array with names-urls
    aNew = oIdxAnu[sNew], //the-array with names-urls
    sFil = 'namidx.' + sK + '.json'; //the-name of the-file with names-urls
  //ADD and namidx.0
  //Read namidx.0.json and ADD names related to index
  //Thus, all the-names in namidx.0 will stored in namidx.X-files.
  //namidx.0.json contains EXTRA names NOT inside the-file to remove
  for (var n = 0; n < aNam0.length; n++) {
    //the-name and the-url of a-line
    sNam = aNam0[n][0];
    sUrl = aNam0[n][1];
    //add on aNamDif the-names with url the-file to remove
    //IF NOT already in
    if (sNam.startsWith(oIdxNam[sK])) {
      aNew.push(aNam0[n]);
    }
  }

  //if array is-not empty, write it
  if (aNew.length > 0) {
    aNew.sort(fCompare);
    //if namidx-file exists, put new names and write
    //if namidx-file does not exist, write new-array of names.
    if (moFs.existsSync(sFil)) {
      var
        aEx = JSON.parse(moFs.readFileSync(sFil));
      aEx.shift(); //remove ;X because on sort ';' after '1'
      for (var nN = 0; nN < aNew.length; nN++) {
        aEx.push(aNew[nN]); //add on existed-names the new names,
      }
      aEx = fArrayRemoveDupl(aEx); //remove duplicates
      aEx.sort(fCompare);
      fWriteJsonSync(sFil, aEx, oIdxNam[sK], true);
    } else {
      fWriteJsonSync(sFil, aNew, oIdxNam[sK], true);
    }
  }
}

/**
 * Remove duplicates of an-array [["a","b"],["a","c"],["a","b"],["c","d"]]
 */
function fArrayRemoveDupl(aIn) {
  var
    aHelp = [],
    aOut = [],
    sElt;

  for(var n = 0; n < aIn.length; n++) {
    sElt = aIn[n].join('JJ');
    if(!aHelp.includes(sElt)) {
      aHelp.push(sElt);
      aOut.push(aIn[n]);
    }
  }
  return aOut;
}

/**
 * Create json-file from array.
 * Each element in the-array is another array
 * with name and url elements.
 * @param sNamIn The-name of the-index in natural-language-capital.
 * @param bNamIn to write or not the-natural-language-index-name.
 */
function fWriteJsonSync(sFilIn, aIn, sNamIn, bNamIn) {
  var
    s;
  function fDateYMD() {
    var
      oD, sY, sM, sD;
    oD = new Date();
    sY = oD.getFullYear().toString();
    sM = (oD.getMonth() + 1).toString();
    if (sM.length == 1) {
      sM = "0" + sM;
    }
    sD = oD.getDate().toString();
    if (sD.length == 1) {
      sD = "0" + sD;
    }
    return sY + "-" + sM + "-" + sD;
  }
  if (bNamIn) {
    s = '[\n  [";' + sNamIn + '","' + fDateYMD() + '"],\n';
  } else {
    s = '[\n';
  }
  for (var n = 0; n < aIn.length-1; n++) {
    s = s +'  ["' + aIn[n][0] + '","' + aIn[n][1] + '"],\n';
  }
  s = s + '  ["' + aIn[aIn.length-1][0] + '","' + aIn[aIn.length-1][1] + '"]\n';
  s = s + ']';
  moFs.writeFileSync(sFilIn, s);
}

/**
 * Compares elements of arrays
 * Used in: aNew.sort(fCompare)
 * to sort arrays of arrays.
 */
function fCompare(aA, aB) {
  return aA[0] > aB[0] ? 1 : -1;
}

/**
 * Find key of object given value
 */
function fObjvalRKey(oIn, valIn) {
  return Object.keys(oIn).find(
    function(key){
      return oIn[key] === valIn
    }
  );
}