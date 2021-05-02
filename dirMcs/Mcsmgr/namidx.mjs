/**
 * DOING:
 *   1) it removes and adds the-name-Urls of namidxjson-files in namidx.txt
 *   from dirNamidx/dirLag/namidx.X.json-files.
 *   2) it creates the-file 'sftp.json' that contains the-changed files we have to upload.
 *   3) it computes the-number of names.
 *   4) it computes the-number of concepts.
 * INPUT: namidx.txt
 * OUTPUT: dirLang/nameidx.lagLangX.json
 * RUN: node namidx
 *
 * PROBLEM:
 * - on lagAGGR, store all files in one dir dirEll eg
 * - to compute the-number of concepts, we must set new DIRS at cptqnt.root.json. 
 *
 * modified: {2021-05-02} .mjs
 * modified: {2021-04-04} lagAGGR
 * modified: {2021-04-03} oSetFileUp
 * modified: {2021-03-25} * lagEngl, lagElln,
 * modified: {2021-01-04} * McsSngo
 * modified: {2020-10-19} * Mcs. for section and paragraph-Mcs
 * modified: {2020-10-18} McsP.
 * modified: {2019-12-11} cptqnt.root.json
 * modified: {2019-09-05} lagKmo
 * modified: {2018-10-25} cptqnt.json
 * modified: {2018-10-16} * Mcs.
 * modified: {2018-09-22}
 * created: {2017-06-01}
 */

import moFs from 'fs';
import mfReadlines from 'n-readlines'; // npm install n-readlines

var
  //moFs = require('fs'),
  //mfReadlines = require('n-readlines')
  bExtra = false,
  oNextln,
  //files to upload, namidx, html, json
  //we use a-set, because we add same files and want unique.
  oSetFileUp = new Set, 
  aFileMcsInComments = moFs.readFileSync('namidx.txt').toString().split('\n'),
  //array with names of filMcsName.html to remove|add
  aFileMcsIn = [],
  aLag = [], //array of languages ['lagAGGR'] or ['lagElln','lagEngl',...]
  aLagAGGR = ['lagSngo','lagEngl','lagElln'],
  //aLagAGGR = ['lagSngo','lagAlb','lagBel','lagBos','lagBul','lagCes','lagDan','lagDeu','lagElln','lagEngl','lagEst',
  //  'lagFin','lagFra','lagHrv','lagHun','lagIta','lagLav','lagLit','lagMlt','lagMol','lagNld','lagNor',
  //  'lagPol','lagPor','lagRom','lagRus','lagSlk','lagSlv','lagSrp','lagSpa','lagSwe','lagTur','lagUkr',
  //  'lagArb','lagHin','lagJpn','lagZho'
  //],
  //[['lagEngl01ei','A',1111]} with quantity of names
  aNamidxRootSum = JSON.parse(moFs.readFileSync('dirNamidx/namidx.lagRoot.json')),
  //array with the-file-Mcs and the-quantity of Mcs they include
  //[ 'dirTchInf/filMcsLagMcsh.last.html', 51 ]
  aMcsFileQnt = [],
  oFileNijRoot_Letter = {},
  //hold the-names of namidxjson-files and the related capital-letters
  //we want the-names of files to be only english.
  //{lagEngl01ei:'A'}
  oNamidxRootLtr = {},
  //{lagEngl01ei:222} the-quantities of names of namidxjson-files
  oNamidxQntnam = {},
  sLn,
  n

// if run with arguments, skip namidx.txt
// node namidx dirLag/filMcsName.html lagSngo
if (process.argv[2]) {
  aFileMcsIn = [process.argv[2]]
  if (process.argv[3]) {
    aLag = [process.argv[3]]
  } else {
    aLag = ['lagEngl']
  }
} else {
  /**
   * a) find Mcs-files to remove|add its names and put paths in aFileMcsIn.
   * b) find languages to work-with.
   */
  for (n = 0; n < aFileMcsInComments.length; n++) {
    sLn = aFileMcsInComments[n]

    // remove comments and empty-lines
    if (!sLn.startsWith('//') && sLn.length !== 0) {
      if (sLn.startsWith('lag')) {
        aLag.push(sLn.substring(0,7))
        //aLag = ['lagAGGR'] or ['lagElln','lagEngl',...]
      } else if (sLn.startsWith('bExtra')) {
        bExtra = true
      } else {
        aFileMcsIn.push(sLn)
      }
    }
  }
}

/**
 * DOING: creates object {namidxjson: index} from [[namidxjson,idx,quantity]]
 * INPUT: aIn = [['lagEngl01ei','A',1234]]
 * OUTPUT: oFileNijRoot_Letter = {lagEngl01ei:'A'}
 */
function fCreateOFileNij_Index(aIn) {
  var oOut = {}
  for (var n = 0; n < aIn.length; n++) {
    if (!aIn[n][1].startsWith(';')) {
      oOut[aIn[n][0]] = aIn[n][1]
    }
  }
  return oOut
}
oFileNijRoot_Letter = fCreateOFileNij_Index(aNamidxRootSum)

//find the-array of languages to work with
if (aLag[0] === 'lagAGGR') {
  aLag = aLagAGGR
}

if (aFileMcsIn.length > 0) {
  //first file we want to upload
  oSetFileUp.add('dirNamidx/namidx.lagRoot.json');
  //also we want the-file with the-quantity of concepts.
  oSetFileUp.add('Mcsqnt.root.json');
}

/**
 * for EACH FILE in aFileMcsIn,
 * for EACH LANGUAGE
 * REMOVE the-names linked to this file, for ALL namidxjson-files
 * READ the-file and store temporarilly its name-Urls
 * ADD name-Urls in namidxjson-files
 */
for (n = 0; n < aFileMcsIn.length; n++) {
  var
    nMcsqnt = 0,
    sFileMcs = aFileMcsIn[n] //the-Mcs-file we want to work

  //add the-file to upload-list
  oSetFileUp.add(sFileMcs)
  //if sFileMcs ../index.html dirNamidx/abbreviation.html do nothing nnn
  if (!sFileMcs.startsWith('../')
      && !sFileMcs.startsWith("dirNamidx/")
      && !sFileMcs.startsWith("Mcs000")
     ) {
    oSetFileUp.add(sFileMcs.substring(0, sFileMcs.lastIndexOf('/')) + '/Mcsqnt.json')
  }

  //for EACH language
  for (var nL = 0; nL < aLag.length; nL++) {
    var
      aNU, // array with a-name and its-Url
      sChar,
      //object to hold the-Αrrays with the-Νame-Urls
      //after reading filMcsName.html files.
      //{lagEngl01ei:[['name','Url']]}
      oFileNij_NamUrl = {}

    //REMOVE name-Urls
    fRemoveNamUrl(oFileNijRoot_Letter, sFileMcs, aLag[nL])

    // remove name-Urls and for the-extra-files in this lag
    if (bExtra) {
      var aNamidxExtr = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' +aLag[nL].substring(3)
        +'/namidx.' +aLag[nL] +'Extra.json')),
        oSetExtra_files = new Set(),
        aExtra_files,
        n

      for (n = 0; n < aNamidxExtr.length; n++) {
        oSetExtra_files.add(aNamidxExtr[n][1].substring(0, aNamidxExtr[n][1].indexOf('#')))
      }
      aExtra_files = Array.from(oSetExtra_files)
      //console.log(aExtra_files)
      for (n = 0; n <aExtra_files.length; n++) {
        fRemoveNamUrl(oFileNijRoot_Letter, aExtra_files[n], aLag[nL])
      }  
    }

    //READ Mcs-file and ADD its name-Urls on oFileNij_NamUrl{lagEngl01ei:[[name,Url]]}
    var
      bMcsSection = true,
      sUrl, //The-url of the-name, is the-url of the-section-element is in.
      sUrlP, //The-url of a-paragraph. it may-contain a-paragraph-Mcs.
      sUrlPPrev, //the-sUrl of previous-paragraph
      oReadlines = new mfReadlines(sFileMcs)

    while (oNextln = oReadlines.next()) {
      sLn = oNextln.toString()

      //process the-section and Mcs-name lines
      if (sLn.indexOf('<section id="') >= 0) {
        //first get the-id of the-section
        //names are-stored inside a-section and <p>name::
        sUrl = sLn.substring(sLn.indexOf('"')+1,sLn.lastIndexOf('"'))
        sUrl = aFileMcsIn[n] + '#' + sUrl
      } else if (sLn.indexOf('<p id="') >= 0) {
        bMcsSection = false;
        sUrlPPrev = sUrlP
        sUrlP = sLn.substring(sLn.indexOf('"')+1,sLn.lastIndexOf('">'))
        sUrlP = aFileMcsIn[n] + '#' + sUrlP
        if (sLn.indexOf('>name::') >= 0) {
          if (aLag[nL] === 'lagEngl') {
            nMcsqnt = nMcsqnt + 1
          }
          bMcsSection = true;
        }
      } else {
        if (aLag[nL] === 'lagElln') {
          if (sLn.startsWith('    <br>* ενν.')
           || sLn.startsWith('    <br>* McsElln.')
           || sLn.startsWith('    <br> &nbsp; &nbsp;* ενν.') //σύνταγμα.2008 ειδική περίπτωση!
           || sLn.startsWith('    <br> &nbsp; &nbsp; &nbsp; &nbsp;* ενν.')) {
            if (sLn.indexOf('* ενν.') > 0) {
              aNU = [sLn.substring(sLn.indexOf('* ενν.')+6, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(sLn.indexOf('* ενν.')+6).toUpperCase() //char at ενν.X
            } else  {
              aNU = [sLn.substring(18, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(18).toUpperCase() //char at McsLang.X
            }
            //GREEK INDEX CHANGES
            if (sChar === 'Ά') {sChar = 'Α'}
            if (sChar === 'Έ') {sChar = 'Ε'}
            if (sChar === 'Ό') {sChar = 'Ο'}
            if (sChar === 'Ώ') {sChar = 'Ω'}
            if (sChar === 'Ί') {sChar = 'Ι'}
            if (sChar === 'Ή') {sChar = 'Η'}
            if (sChar === 'Ύ') {sChar = 'Υ'}
            fStoreNULetter(aNU, sChar, aLag[nL])
          }
        } else {
          if (sLn.startsWith('    <br>* Mcs'+aLag[nL].substring(3)+'.')) {
            if (bMcsSection) {
              aNU = [sLn.substring(18, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(18).toUpperCase() //char at McsLang.X
              fStoreNULetter(aNU, sChar, aLag[nL])
            } else {
              aNU = [sLn.substring(18, sLn.indexOf(',')), sUrlP]
              sChar = sLn.charAt(18).toUpperCase() //char at McsLang.X
              fStoreNULetter(aNU, sChar, aLag[nL])
              //if previous-id different for current
              //we have a-new-paragraph-cpt
              //because in one paragraph we can-have many Mcs.
              if (sUrlPPrev !== sUrlP) {
                if (aLag[nL] === 'lagEngl') {
                  nMcsqnt = nMcsqnt + 1
                }
              }
              sUrlPPrev = sUrlP
            }
          }
        }
      }
    }

    if (bExtra) {
      //ADD extra name-Urls on oFileNij_NamUrl for current language
      var aNamidxExtr = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' +aLag[nL].substring(3)
        +'/namidx.' +aLag[nL] +'Extra.json'))
      for (var nE = 0; nE < aNamidxExtr.length; nE++) {
        sChar = aNamidxExtr[nE][0].substring(0,1).toUpperCase()
        fStoreNULetter(aNamidxExtr[nE], sChar, aLag[nL])
      }
    }

    //WRITE arrays in oFileNij_NamUrl ({lagEngl01ei:[[name,Url]]})
    //in namidxjson-files
    for (var sNmix in oFileNij_NamUrl) {
      //console.log(aLag[nL]+", "+sNmix)
      var
        aNew = oFileNij_NamUrl[sNmix], //the-array with name-Urls
        //the-name of the existing file with names-urls
        sNamidxjsonFullExist = 'dirNamidx/dirLag' +aLag[nL].substring(3) +'/namidx.' +sNmix +'.json',
        sMeta

      oSetFileUp.add(sNamidxjsonFullExist)
      aNew.sort(fCompare)

      //if namidxjson-file exists, put new names and write
      if (moFs.existsSync(sNamidxjsonFullExist)) {
        var
          aEx = JSON.parse(moFs.readFileSync(sNamidxjsonFullExist))

        sMeta = aEx.shift() // [";namidx",";char..char.2"
        //add on existed-names the new names,
        for (var nN = 0; nN < aNew.length; nN++) {
          aEx.push(aNew[nN])
        }
        aEx = fRemoveArrayDupl(aEx) //remove duplicates
        aEx.sort(fCompare)
        oNamidxQntnam[sNmix] = aEx.length
        aEx.unshift(sMeta)
        fWriteJsonQntDate(sNamidxjsonFullExist, aEx)
      } else {
        oNamidxQntnam[sNmix] = aNew.length
        aNew.unshift(sMeta)
        //if namidxjson-file does not exist, write new-array of names.
        fWriteJsonQntDate(sNamidxjsonFullExist, aNew)
      }
    }
  }

  //update Mcsqnt.json
  //only on Mcs-files measure Mcs
  if (sFileMcs.indexOf('filMcs') >= 0
     || sFileMcs.indexOf('Mcs') >= 0 
     || sFileMcs.indexOf('Hitp') >= 0 )  {
    aMcsFileQnt.push([sFileMcs, nMcsqnt])
  }
}

/**
 * DOING: REMOVES name-Urls from namidxjson-files(Filenij) per language
 * INPUT:
 *   - oFilenijIndexIn: object {lagElln01alfa: 'Α'} from which the-names will-be-removed
 *   - sFilRmvIn: the-Mcsfile whose names will-be-removed
 *   - sLagIn: the-lag whose names will-be-removed
 */
function fRemoveNamUrl(oFilenijIndexIn, sFilRmvIn, sLagIn) {
  //oFilenijIndexIn = { lagElln00: 'LetterNo', lagElln01alfa: 'Α', ... lagSngo25u: 'U' }
  //sFilRmvIn = dirLag/filMcsLhmn.last.html
  //sLagIn = lagElln
  //for ALL namidxjson-files remove names with Url sFilRmvIn
  //TODO: IF we have a-file for each Mcs-file[a]
  // with ALL the-namidx-json-files in which it[a] is-used
  // THEN we can-iterate ONLY in these files. {2018-07-23}
  for (var sFileNijShort in oFilenijIndexIn) {
    //ALL namidxjson-files in sLagIn
    if (sFileNijShort.startsWith(sLagIn)) { //sFileNijShort: lagEngl01ei, sLagIn: lagEngl
      var
        aNamDif = [],
        sFileNijFull = 'dirNamidx/dirLag' + sLagIn.substring(3) +
                  '/namidx.' + sFileNijShort + '.json',
        sUrl

      if (moFs.existsSync(sFileNijFull)) {
        var
          //read existing namidx.X
          aNamExist,
          bRemoved = false

        try {
          aNamExist = JSON.parse(moFs.readFileSync(sFileNijFull))
        } catch(e) {
          console.log('>> json problem:' + sFileNijFull)
        }
          
        //IF namidx is reference (endsWith('_0.json'))
        //read it, make oFilenijIndexIn, and remove names
        if (sFileNijFull.endsWith('_0.json')) {
          var oIN = fCreateOFileNij_Index(aNamExist)
          fRemoveNamUrl(oIN, sFilRmvIn, sLagIn)
        } else {
          //ELSE remove names
          //create new array with names NOT in sFilRmvIn
          // first put on new array meta-info: [";lagElln06zita",";Ζ..Η",1,"2019-09-04"]
          aNamDif.push(aNamExist[0])
          for (var nE = 1; nE < aNamExist.length; nE++) {
            //the-url of a-name
            sUrl = aNamExist[nE][1]
            //add on aNamDif the-names without the-file to remove
            if (!sUrl.startsWith(sFilRmvIn)) {
              aNamDif.push(aNamExist[nE])
            } else if (sUrl.startsWith(sFilRmvIn)) {
              bRemoved = true
              oSetFileUp.add(sFileNijFull)
              if (sFileNijFull.indexOf('_') > 0) {
                // IF removed child, add and parent-reference
                oSetFileUp.add(sFileNijFull.substring(0, sFileNijFull.lastIndexOf('_')) +'_0.json')
              }
            }
          }
          //store namidx length
          if (bRemoved) {
            oNamidxQntnam[sFileNijShort] = aNamDif.length - 1
            // sFileNijShort changed, store it
            fWriteJsonQntDate(sFileNijFull, aNamDif)
          }
        }
      }
    }
  }
}

/**
 * DOING: store one name-Url in oFileNij_NamUrl
 *   using first capital-letter of name
 */
function fStoreNULetter(aNUIn, sLtrIn, sLagIn) {
  var sNif // name of namidxjson-file

  // choose lag-letter or rest
  if (Object.values(oFileNijRoot_Letter).includes(sLtrIn)) {
    //find namidxjson-file for sLtrIn
    sNif = fObjvalRKey(oFileNijRoot_Letter, sLtrIn, sLagIn)
    fStoreNULetter_root_or_child(sNif)
  } else {
    //if sLtrIn is REST-char
    sNif = sLagIn + '00'
    fStoreNULetter_root_or_child(sNif)
  }

  // choose root or child
  function fStoreNULetter_root_or_child(sNifIn) {
    //console.log(sNifIn+', '+aNUIn[0])
    if (!sNifIn.endsWith('_0')) {
      // namidx is not a-reference
      if (oFileNij_NamUrl[sNifIn]) {
        oFileNij_NamUrl[sNifIn].push(aNUIn)
      } else {
        oFileNij_NamUrl[sNifIn] = []
        oFileNij_NamUrl[sNifIn].push(aNUIn)
      }
    } else {
      //lagNam03si_0 is a-reference
      var aNi = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' + sLagIn.substring(3)
        +'/namidx.' +sNifIn +'.json'))
      fStoreNUCodepoint(aNi, aNUIn, sLagIn)
    }
  }
}

/**
 * DOING: stores one name-Url in temporary array of namidxjson-files
 *   using Unicode-code-points order
 * aNamidxIn: [['lagEngl03si_2_1', 'name', 1234]]
 * aNUIn: ['name','Url']
 */
function fStoreNUCodepoint(aNamidxIn, aNUIn, sLagIn) {
  //aNamidxIn[0] = [ ';lagEngl03si_0', 'C..D', 444, '2018-07-22' ]
  //console.log(aNUIn[0]+':   '+aNamidxIn[0])
  for (var n = 2; n < aNamidxIn.length; n++) {
    //console.log(aNUIn[0]+':   '+aNamidxIn[n])
    if (aNUIn[0] < aNamidxIn[n][1].split('..')[0]) {
      //if name-aNUIn < name-aNamidxIn
      //add name-Url in PREVIOUS index-file
      //console.log(aNUIn[0]+', '+aNamidxIn[n])
      //if namidxjson-file is not a-reference, store name-Url
      if (!aNamidxIn[n-1][0].endsWith('_0')) {
        //store
        if (oFileNij_NamUrl[aNamidxIn[n-1][0]]) {
          oFileNij_NamUrl[aNamidxIn[n-1][0]].push(aNUIn)
        } else {
          oFileNij_NamUrl[aNamidxIn[n-1][0]] = []
          oFileNij_NamUrl[aNamidxIn[n-1][0]].push(aNUIn)
        }
      } else {
        //namidxjson-file is a-reference
        var aNi = JSON.parse(moFs.readFileSync('dirNamidx/' +'dirLag' + sLagIn.substring(3)
            +'/namidx.' +aNamidxIn[n-1][0] +'.json'))
        fStoreNUCodepoint(aNi, aNUIn, sLagIn)
      }
      break
    } else if (aNUIn[0] >= aNamidxIn[n][1].split('..')[0] &&
               aNUIn[0] < aNamidxIn[n][1].split('..')[1].toLowerCase() && //capital-next-letter or small between
               n === aNamidxIn.length - 1) {
      //console.log(aNUIn[0]+', '+aNamidxIn[n])
      if (!aNamidxIn[n][0].endsWith('_0')) {
        if (oFileNij_NamUrl[aNamidxIn[n][0]]) {
          oFileNij_NamUrl[aNamidxIn[n][0]].push(aNUIn)
        } else {
          oFileNij_NamUrl[aNamidxIn[n][0]] = []
          oFileNij_NamUrl[aNamidxIn[n][0]].push(aNUIn)
        }
      } else {
        //namidxjson-file is a-reference
        var aNi = JSON.parse(moFs.readFileSync('dirNamidx/' +'dirLag' + sLagIn.substring(3)
            +'/namidx.' +aNamidxIn[n][0] +'.json'))
        fStoreNUCodepoint(aNi, aNUIn, sLagIn)
      }
    }
  }
}

/**
 * Remove duplicates of an-array [["a","b"],["a","c"],["a","b"],["c","d"]]
 */
function fRemoveArrayDupl(aIn) {
  var
    aHelp = [],
    aOut = [],
    sElt

  for (var n = 0; n < aIn.length; n++) {
    sElt = aIn[n].join('JJ')
    if (!aHelp.includes(sElt)) {
      aHelp.push(sElt)
      aOut.push(aIn[n])
    }
  }
  return aOut
}

/**
 * DOING: creates json-file from array.
 *   Each element in the-array is another array
 *   with name and url elements.
 *   on the-first element updates the-quantity of names and the-date.
 * INPUT:
 *   - sFilIn the-namidx-json-file we want to create
 *   - aIn the-array of the-name-Url-arrays to include,
 */
function fWriteJsonQntDate(sFilIn, aIn) {
  var
    s

  // aIn[0] = [";lagEngl01ei",";A..B",419,"2018-08-04"],
  if (aIn.length === 1) {
    s = '[\n  ["' + aIn[0][0] + '","' + aIn[0][1] + '",0,"' + fDateYMD() + '"]\n'
  } else {
    s = '[\n  ["' + aIn[0][0] + '","' + aIn[0][1] + '",' +
      (aIn.length-1) + ',"' + fDateYMD() + '"],\n'
    for (var n = 1; n < aIn.length-1; n++) {
      s = s +'  ["' + aIn[n][0] + '","' + aIn[n][1] + '"],\n'
    }
    //last element no-comma at the-end
    s = s + '  ["' + aIn[aIn.length-1][0] + '","' + aIn[aIn.length-1][1] + '"]\n'
  }

  s = s + ']'
  moFs.writeFileSync(sFilIn, s)
}

function fDateYMD() {
  var
    oD, sY, sM, sD
  oD = new Date()
  sY = oD.getFullYear().toString()
  sM = (oD.getMonth() + 1).toString()
  if (sM.length === 1) {
    sM = '0' + sM
  }
  sD = oD.getDate().toString()
  if (sD.length === 1) {
    sD = '0' + sD
  }
  return sY + '-' + sM + '-' + sD
}

/**
 * DOING: create json from array of arrays ONLY, not extra info
 */
function fWriteJsonArray(sFilIn, aIn) {
  var
    s

  //aIn length more than 1
  s = '[\n'
  for (var n = 0; n < aIn.length-1; n++) {
    s = s +'  ' + JSON.stringify(aIn[n]) + ',\n'
  }
  s = s + '  ' + JSON.stringify(aIn[aIn.length-1]) + '\n'
  s = s + ']'
  moFs.writeFileSync(sFilIn, s)
}

/**
 * Compares elements of arrays
 * Used in: aNew.sort(fCompare)
 * to sort arrays of arrays.
 */
function fCompare(aA, aB) {
  return aA[0] > aB[0] ? 1 : -1
}

/**
 * finds key of object given value and key attribute
 * INPUT:
 *   oIn = the-object with keys root-index-files and values the-letters they contain {lagEngl01ei:'A'}
 *   sLtrIn = the-letter for which we want to find its index-file
 *   sLagIn = the-language of the-letter (same letter, different languages)
 */
function fObjvalRKey(oIn, sLtrIn, sLagIn) {
  var sOut =''

  for (var k in oIn) {
    if (oIn[k] === sLtrIn && k.indexOf(sLagIn) === 0) {
      sOut = k
      break
    }
  }
  return sOut
}

/**
 * DOING: it computes quantities of names
 */
function fComputeQntName() {
  //oNamidxQntnam={lagEngl00: 1101,lagEngl01ei: 419,lagEngl03si_1: 1038,lagEngl03si_2_1: 6959}
  //the-set of namidxjson-files we computed
  var oSetNamidxComputed = new Set()

  for (var sFileNij in oNamidxQntnam) {
    //console.log('>>> compute: '+sFileNij)
    var sNamidxRef //the-reference-file lagEngl03si_2_0

    // if namidx is a-child, we find its reference-parent
    if (sFileNij.indexOf('_') > 0) {
      // lagEngl03si_1 >> lagEngl03si_0
      sNamidxRef = sFileNij.substring(0, sFileNij.lastIndexOf('_')) +'_0'
    }

    if (sFileNij.indexOf('_') === -1 && !oSetNamidxComputed.has('lagRoot')) {
      //a namidx.lagRoot.json element
      oSetNamidxComputed.add('lagRoot')
      fUpdate_from_oNamidxQ('dirNamidx/namidx.lagRoot.json')
    } else if (sFileNij.indexOf('_') > 0 && !oSetNamidxComputed.has(sNamidxRef)) {
      //sNamidxRef=lagEngl03si_2_0
      oSetNamidxComputed.add(sNamidxRef)
      fUpdate_from_oNamidxQ('dirNamidx/dirLag' + sFileNij.substring(3,7)
        + '/namidx.' + sNamidxRef + '.json')
    }
  }

  //update quantities in a-reference-namidxjson-file
  //and computes new sums
  function fUpdate_from_oNamidxQ(sNamidxRefIn) {
    //read array of namidx of file
    //iterate over array and update oNamidxQntnam items
    //store new file
    //[";lagEngl03si_2_0",";char",129181,"2018-07-29","codepoint order"],
    //["lagEngl03si_2_1","char",6959],
    var
      aNi = JSON.parse(moFs.readFileSync(sNamidxRefIn)),
      n,
      nSum = 0

    if (sNamidxRefIn.indexOf('.lagRoot.json') === -1) {
      //console.log("update: " +sNamidxRefIn)
      for (n = 1; n < aNi.length; n++) {
        //aNi=[["lagEngl03si_2_1","char",1000]]
        //oNamidxQntnam= [lagEngl03si_2_1:1000]]
        //if oNamidxQntnam contains info of aNi[n]
        if (!aNi[n][1].startsWith(';')) {
          //don't compute lag-sums twice ["lagEngl",";English",145191],
          if (oNamidxQntnam[aNi[n][0]]) {
            aNi[n][2] = oNamidxQntnam[aNi[n][0]]
            nSum = nSum + aNi[n][2]
            oSetNamidxComputed.add(aNi[n][0])
          } else {
            nSum = nSum + aNi[n][2]
          }
        }
      }
      aNi[0][2] = nSum
      aNi[0][3] = fDateYMD()
      fWriteJsonArray(sNamidxRefIn, aNi)
      fUpdate_from_child(sNamidxRefIn, nSum)
    } else {
      // lagRoot file
      var
        nLag = 1, // first lang index
        nSumAGGR = 0

      // [";lagAGGR",";letter",0,"2018-09-11","per letter"],
      // ["lagElln",";Greek",1848],
      for (n = 2; n < aNi.length; n++) {
        //["lagElln01alfa","Α",258],
        if (new RegExp('^lag....$').test(aNi[n][0])) {
          //on new lag reset nSum
          nSumAGGR = nSumAGGR + nSum
          aNi[nLag][2] = nSum
          nSum = 0
          nLag = n
        } else if (oNamidxQntnam[aNi[n][0]] >= 0) {
          aNi[n][2] = oNamidxQntnam[aNi[n][0]]
          nSum = nSum + aNi[n][2]
          oSetNamidxComputed.add(aNi[n][0])
        } else if (!oNamidxQntnam[aNi[n][0]]) {
          nSum = nSum + aNi[n][2]
        }
      }
      nSumAGGR = nSumAGGR + nSum
      aNi[nLag][2] = nSum
      aNi[0][2] = nSumAGGR
      aNi[0][3] = fDateYMD()
      fWriteJsonArray(sNamidxRefIn, aNi)
    }
  }

  //update sum in parent files
  function fUpdate_from_child(sChld_pathIn, nChld_sumIn) {
    //double
    var
      sPrnt_path,
      aPrnt_nmix,
      n,
      nPrnt_sum = 0,
      sChld_path_only = sChld_pathIn.substring(0, sChld_pathIn.lastIndexOf('_')),
      sChld_nmix = sChld_pathIn.substring(sChld_pathIn.indexOf('namidx.')+7, sChld_pathIn.lastIndexOf('.'))

    if (sChld_path_only.indexOf('_') > 0) {
      // parent is NOT the-root-reference
      sPrnt_path = sChld_path_only.substring(0, sChld_path_only.lastIndexOf('_')) + '_0.json'
      //console.log('update-child: ' +sPrnt_path +', ' +nChld_sumIn)
      aPrnt_nmix = JSON.parse(moFs.readFileSync(sPrnt_path))
      for (n = 1; n < aPrnt_nmix.length; n++) {
        //["lagEngl03si_0","C",130313],
        if (aPrnt_nmix[n][0] === sChld_nmix) {
          nPrnt_sum = nPrnt_sum + nChld_sumIn
          aPrnt_nmix[n][2] = nChld_sumIn
        } else {
          nPrnt_sum = nPrnt_sum + aPrnt_nmix[n][2]
        }
      }
      aPrnt_nmix[0][2] = nPrnt_sum //all sum
      aPrnt_nmix[0][3] = fDateYMD()
      fWriteJsonArray(sPrnt_path, aPrnt_nmix)
      fUpdate_from_child(sPrnt_path, nPrnt_sum)
    } else {
      // parent is the-root-reference
      //console.log('update-child: root, ' +nChld_sumIn)
      var
        nAllSum = 0,
        nLagSum = 0, // sum of lag
        nLagIdx = 1 // index of lag

      sPrnt_path = 'dirNamidx/namidx.lagRoot.json'
      aPrnt_nmix = JSON.parse(moFs.readFileSync(sPrnt_path))
      for (n = 2; n < aPrnt_nmix.length; n++) {
        if (!aPrnt_nmix[n][0].startsWith(';')) {
          if (new RegExp('^lag....$').test(aPrnt_nmix[n][0])) {
            nAllSum = nAllSum + nLagSum
            aPrnt_nmix[nLagIdx][2] = nLagSum
            nLagSum = 0
            nLagIdx = n
          } else if (aPrnt_nmix[n][0] === sChld_nmix) {
            nLagSum = nLagSum + nChld_sumIn
            aPrnt_nmix[n][2] = nChld_sumIn
          } else if (aPrnt_nmix[n][0] !== sChld_nmix) {
            nLagSum = nLagSum + aPrnt_nmix[n][2]
          }
        }
      }
      nAllSum = nAllSum + nLagSum
      aPrnt_nmix[nLagIdx][2] = nLagSum
      aPrnt_nmix[0][2] = nAllSum
      aPrnt_nmix[0][3] = fDateYMD()
      fWriteJsonArray(sPrnt_path, aPrnt_nmix)
    }
  }
}

fComputeQntName()

//write the-files to upload
var aSftp = Array.from(oSetFileUp)
aSftp.sort()
console.log(aSftp)
fWriteJsonArray('sftp.json', aSftp)

console.log('>>> Mcs-file indexed:')
console.log(aMcsFileQnt)

/**
 * DOING: updates the-quantity of Mcs of ONE Mcs-file[a] in Mcsqnt.json-files AND all wholes of it[a]
 * INPUT: the-name of an-Mcs-file[a] and the-new quantity of Mcs in this[a] file.
 * OUTPUT: the-Mcsqnt-files affected 
 */
function fUpdateQntMcs(sFileMcsIn, nMcsqntIn) {
  var
    aMcsqnt,
    bMcs = false,
    nMcsqntSum = 0,
    sDir = sFileMcsIn.substring(0, sFileMcsIn.lastIndexOf('/')),
    sMcsqnt

  if (sFileMcsIn.startsWith('Mcs000')) {
    sMcsqnt = 'Mcsqnt.root.json'
  } else {
    sMcsqnt = sDir + '/Mcsqnt.json'
  }

  aMcsqnt = JSON.parse(moFs.readFileSync(sMcsqnt))
  for (n = 1; n < aMcsqnt.length; n++) {
    // [";dirDIR",115,"2018-10-06"],
    // ["dirDIR/filMcsNAME.last.html",112],
    // [";dirTchInf/dirUcd",33136,"2021-03-22"],
    // ["dirTchInf/dirUcd/filMcsDirUcd.last.html",0],
    if (aMcsqnt[n][1] === 0) {
      //remove files with 0 Mcs
      aMcsqnt.splice(n, 1)
    } else if (aMcsqnt[n][0] === sFileMcsIn) {
      aMcsqnt[n][1] = nMcsqntIn
      nMcsqntSum = nMcsqntSum + nMcsqntIn
      bMcs = true
    } else {
      nMcsqntSum = nMcsqntSum + aMcsqnt[n][1]
    }
  }
  //if Mcsfile is new, add it
  //we have to remove old!!! or qnt=0
  if (!bMcs) {
    aMcsqnt.push([sFileMcsIn, nMcsqntIn])
    nMcsqntSum = nMcsqntSum + nMcsqntIn
  }
  //on root
  if (sDir === '') {
    aMcsqnt[0] = [';qntAGG', nMcsqntSum, fDateYMD()]
  } else {
    aMcsqnt[0] = [';'+sDir, nMcsqntSum, fDateYMD()]
  }
  aMcsqnt.sort()
  fWriteJsonArray(sMcsqnt, aMcsqnt)

  // update parents
  if (sDir === '') {
    // do nothing, root is ok
  } else if (sDir.indexOf('/') === -1) {
    // parent = root
    fUpdate_root(sDir, nMcsqntSum)
  } else {
    fUpdateQntMcs(sDir, nMcsqntSum)
  }

  // update root file
  function fUpdate_root(sDfIn, nQIn) {
    var
      aMcsqntRt,
      nMcsqntRtSum = 0,
      sMcsqntRt = 'Mcsqnt.root.json'

    aMcsqntRt = JSON.parse(moFs.readFileSync(sMcsqntRt))
    for (n = 1; n < aMcsqntRt.length; n++) {
      // [";qntAGG",179925,"2018-10-05"],
      // ["dirCor",10],
      if (aMcsqntRt[n][0] === sDfIn) {
        aMcsqntRt[n][1] = nQIn
        nMcsqntRtSum = nMcsqntRtSum + nQIn
      } else {
        nMcsqntRtSum = nMcsqntRtSum + aMcsqntRt[n][1]
      }
    }
    aMcsqntRt[0] = [';qntAGG', nMcsqntRtSum, fDateYMD()]
    fWriteJsonArray(sMcsqntRt, aMcsqntRt)
  }
}

/**
 * DOING: update the-quantity of Mcs of ALL Mcs-files.
 */
async function fUpdateALLQntMcs(aIn) {
  for (const item of aIn) {
   await fUpdateQntMcs(item[0], item[1])
  }
}
fUpdateALLQntMcs(aMcsFileQnt)