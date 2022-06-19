/**
 * Remove|Add the-names of files in name.txt on namidx.X.json
 *
 * Input: name.txt
 * Output: nameidx.X.json
 * run: node name.js
 *
 * modified: {2017-06-08}
 * created: {2017-06-01}
 */

var
  moFs = require('fs'),
  aFilesIn = [],
  //array to hold the-names of arrays of namidx-files
  aIdx = ['A','B','C','D','E','F','G','H','I','J','K','L',
    'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ZZZ'],
  //object to hold the-arrays with the-names of concepts.
  oIdx = {
    aA:[], aB:[], aC:[], aD:[], aE:[], aF:[], aG:[], aH:[],
    aI:[], aJ:[], aK:[], aL:[], aM:[], aN:[], aO:[], aP:[],
    aQ:[], aR:[], aS:[], aT:[], aU:[], aV:[], aW:[], aX:[],
    aY:[], aZ:[], aZZZ:[]
  },
  aIdxEll = ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ',
    'Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'],
  n = 0;



/**
 * Read ALL namidx.X.json files.
 * For each, log its lenth and add to sum.
 * Log sum.
 */
for (var nI = 0; nI < aIdx.length; nI++) {
  var
    nL,
    aEx,
    sFilIdx = './namidx.' + aIdx[nI] + '.json',
    sNam = 'a' + aIdx[nI];
  if (moFs.existsSync(sFilIdx)) {
    aEx = JSON.parse(moFs.readFileSync(sFilIdx));
    nL = aEx.length-1;
    console.log(sNam + ': ' + nL);
    n = n + nL;
  }
}

console.log('SUM: ' + n);

/*
{2017-06-10}
aA: 38
aB: 1250
aC: 131
aD: 98
aE: 644
aF: 20
aG: 16
aH: 236
aI: 10
aJ: 18
aK: 2
aL: 1517
aM: 142
aN: 138
aO: 14
aP: 50
aQ: 4
aR: 25
aS: 56
aT: 42
aU: 7
aV: 7
aW: 25
aX: 25
aZ: 6
aZZZ: 2
SUM: 4523
*/
