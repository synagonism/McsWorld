/**
 * Find different concepts with same-names.
 *
 * Input:
 * Output: nameSame.html
 * run: node nameSame.js
 *
 * modified: {2017-06-04}
 * created: {2017-06-01}
 */

var
  moFs = require('fs'),
  //array to hold the-names of namidx.X.json index-files
  aIdx = ['A','B','C','D','E','F','G','H','I','J','K','L',
    'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'ZZZ'],
  aIdxEll = ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ',
    'Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'],
  aFound = [];

/**
 * For each index-file,
 * For each name-url,
 */
for (var nI = 0; nI < aIdx.length; nI++) {
  var
    sFilIdx = 'namidx.' + aIdx[nI] + '.json',
    oSeen,
    aNamurl,
    sNam,
    sUrl;

  if (moFs.existsSync(sFilIdx)) {
    var
      aEx = JSON.parse(moFs.readFileSync(sFilIdx)),
      oSeen = {};//empty object for every file

    oSeen[aEx[0][0]] = aEx[0][1];
    //check ALL the-names in one index-file
    for (var nE = 1; nE < aEx.length; nE++) {
      aNamurl = aEx[nE]; //array name-url
      sNam = aEx[nE][0]; //name
      sUrl = aEx[nE][1]; //url

      if(sNam in oSeen) {
        //put old AND new name-url on aFound
        aFound.push([sNam, oSeen[sNam]]);
        aFound.push(aNamurl);
        //delete old member in oSeen
        delete oSeen[sNam];
        //put new member in oSeen
        oSeen[sNam] = sUrl;
      } else {
        oSeen[sNam] = sUrl;
      }
    }
  }
  //finish all index-files, remove duplicates
  fArrayRemoveDupl(aFound);
}

fHtmlCreate(aFound);

function fHtmlCreate(aIn) {
  //create html-file
  var s;
  s = '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <title>Structured-concepts with SAME-NAMES</title>\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '  <h1>Structured-concepts with SAME-NAMES</h1>\n' +
      '  <ol>\n';
  for (var n = 0; n < aIn.length-1; n++) {
    s = s +
      '    <li>' + aIn[n][0] +
      ' <a href="' + aIn[n][1] +
      '">' +
      aIn[n][1] +'</a>\n';
  }
  s = s + '  </ol>\n' +
          '<body>\n' +
          '<html>\n';
  moFs.writeFileSync('nameSame.html', s);
}

/**
 * Remove duplicates of an-array.
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
