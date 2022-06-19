/**
 * Remove|Add the-names of files in name.txt on namidx.X.json
 *
 * Input: name.txt
 * Output: nameidx.X.json
 * run: node name.js
 *
 * modified: {2017-06-12}
 * created: {2017-06-01}
 */

var
  moFs = require('fs'),
  mfReadlines = require('n-readlines'), // npm install n-readlines
  oNextln,
  aFilesHmlInComments = moFs.readFileSync('name.txt').toString().split('\n'),
  aFilesHmlIn = [],
  //array to hold the-names of arrays of namidx-files
  aIdx = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M', /* inlinecom */
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ZZZ',
    /* greek letters */
    'Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ',
    'Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'
  ],
  //object to hold the-arrays with the-names of concepts.
  oIdx = {
    aA:[], aB:[], aC:[], aD:[], aE:[], aF:[], aG:[], aH:[],
    aI:[], aJ:[], aK:[], aL:[], aM:[], aN:[], aO:[], aP:[],
    aQ:[], aR:[], aS:[], aT:[], aU:[], aV:[], aW:[], aX:[],
    aY:[], aZ:[], aZZZ:[],
    aΑ:[], aΒ:[], aΓ:[], aΔ:[], aΕ:[], aΖ:[], aΗ:[], aΘ:[],
    aΙ:[], aΚ:[], aΛ:[], aΜ:[], aΝ:[], aΞ:[], aΟ:[], aΠ:[],
    aΡ:[], aΣ:[], aΤ:[], aΥ:[], aΦ:[], aΧ:[], aΨ:[], aΩ:[]
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
 * SECOND, for each file in aFilesHmlIn,
 * REMOVE the-names linked to aFilesHmlIn, from all namidx-files.
 * Add names in namidx.0.json.
 */
for (var n = 0; n < aFilesHmlIn.length; n++) {
  var
    sFilRmv = aFilesHmlIn[n];

  //For each namidx-file
  for (var nI = 0; nI < aIdx.length; nI++) {
    var
      sFilIdx = 'namidx.' + aIdx[nI] + '.json',
      sUrl;
    if (moFs.existsSync(sFilIdx)) {
      var
        aNamDif = [],
        aNam0 = JSON.parse(moFs.readFileSync('namidx.0.json'));
        //read existing sc-names
console.log(sFilIdx)
        aEx = JSON.parse(moFs.readFileSync(sFilIdx));
      //create new array with names NOT in file remove
      //do not read the first line which contains meta info
      for (var nE = 0; nE < aEx.length; nE++) {
        //the-url of a-name
        sUrl = aEx[nE][1];
        //add on aNamDif the-names without the-file to remove
        if (!aEx[nE][0].startsWith(';') && !sUrl.startsWith(sFilRmv)) {
          aNamDif.push(aEx[nE]);
        }
      }
      //Read namidx.0.json and ADD names related to file-removed
      //namidx.0.json contains EXTRA names NOT inside the-file to remove
      for (var nN0 = 0; nN0 < aNam0.length; nN0++) {
        //the-url of a-name
        sUrl = aNam0[nN0][1];
        //add on aNamDif the-names with url the-file to remove
        if (sUrl.startsWith(sFilRmv)) {
          aNamDif.push(aNam0[nN0]);
        }
      }
      //IF aNamDif has names, create the-index.file
      //IF aNamDif has no-names, delete the-index-file
      if (aNamDif.length > 0) {
        fWriteJsonSync(sFilIdx, aNamDif, aIdx[nI], false);
      } else {
        moFs.unlinkSync(sFilIdx);
      }
    }
  }
}


/**
 * THIRD, For each file in aFilesHmlIn
 * read the-file and add its new-names on oIdx[aIdx].
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
    if (sLnOrg.indexOf('section id="') > 0) {
      //first get the-id of the-section
      //names are-stored inside a-section
      sUrl = sLnOrg.substring(sLnOrg.indexOf('"')+1,sLnOrg.lastIndexOf('"'));
      sUrl = aFilesHmlIn[n] + '#' + sUrl;
    } else if (sLnLc.startsWith('    <br>* cpt.')
            || sLnLc.startsWith('    <br>* ενν.')) {
      //store names in arrays
      //Get the-14-char of line
      //if aIdx includes 14char
      //else put in oIdx['aZZZ']
      var
        sChar = sLnLc.charAt(14).toUpperCase(), //char at cpt.X
        a = [sLnOrg.substring(14, sLnOrg.indexOf(',')), sUrl];
      //GREEK INDEX CHANGES
      if (sChar === 'Ά') {sChar = 'Α';}
      if (sChar === 'Έ') {sChar = 'Ε';}
      if (sChar === 'Ό') {sChar = 'Ο';}
      if (sChar === 'Ώ') {sChar = 'Ω';}
      if (sChar === 'Ί') {sChar = 'Ι';}
      if (sChar === 'Ή') {sChar = 'Η';}
      if (sChar === 'Ύ') {sChar = 'Υ';}
      if (aIdx.includes(sChar)) {
        oIdx['a'+sChar].push(a);
      } else {
        oIdx['aZZZ'].push(a);
      }
    }
  }
}

/**
 * FORTH, write the-non-empty-arrays in oIdx in namidx-files.
 */
for (var n = 0; n < aIdx.length; n++) {
  var
    sNew = 'a' + aIdx[n], //the-name of the-array with mcs-names
    aNew = oIdx[sNew], //the-array with mcs-names
    sFil = 'namidx.' + aIdx[n] + '.json'; //the-name of the-file with mcs-names
  //if array is-not empty, write it
  if (aNew.length > 0) {
    aNew.sort(fCompare);
    //if namidx-file exists, put new names and write
    //if namidx-file does not exist, write new-array of names.
    if (moFs.existsSync(sFil)) {
      var
        aEx = JSON.parse(moFs.readFileSync(sFil));
      for (var nN = 0; nN < aNew.length; nN++) {
        aEx.push(aNew[nN]); //add on existed-names the new names,
      }
      aEx = fArrayRemoveDupl(aEx); //remove duplicates
      aEx.sort(fCompare);
      fWriteJsonSync(sFil, aEx, aIdx[n], true);
    } else {
      fWriteJsonSync(sFil, aNew, aIdx[n], true);
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
    sElt = aIn[n].join('|');
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
 */
function fWriteJsonSync(sFilIn, aIn, sNamIn, bNamIn) {
  var s;
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
 *
 */
function fCompare(aA, aB) {
  return aA[0] > aB[0] ? 1 : -1;
}