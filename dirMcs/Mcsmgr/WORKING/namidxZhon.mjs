/**
 * DOING:
 *   1) it updates the-names of Mcs-files in namidx.txt, in namidx-files.
 *   2) it creates the-file 'sftp.json' that contains the-changed files we have to upload.
 *   3) it computes the-number of names.
 *   4) it computes the-number of concepts.
 * INPUT: namidx.txt
 * OUTPUT: dirLang/namidx.lagLangX.json, namidx.lagRoot.json, Mcsqnt.json, sftp.json,
 * RUN: node Mcsmgr/namidx.mjs
 *
 * PROBLEM:
 * - to compute the-number of concepts, we must set new DIRS at cptqnt.root.json. 
 *
 * modified: {2021-11-01} solved char on other-lags but not on denoted
 * modified: {2021-05-02} .mjs
 * modified: {2021-04-04} lagALLL
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

let
  bExtra = false, // extra names, added manually on namidx.lagLagoExtra.json to-be removed!
  oNextln,
  oSetFileUp = new Set, 
  // files to upload, namidx, Mcs, Mcsqnt
  // we use a-set, because we add same files and want unique.
  aFileMcsInComments = moFs.readFileSync('namidx.txt').toString().split('\n'),
  aFileMcsIn = [],
  // array with names of dirCor/McsCor000010.last.html to remove|add its names
  aLag = [],
  // array of languages ['lagALLL'] or ['lagElln','lagEngl',...]
  aLagALL = ['lagSngo','lagEngl','lagElln','lagZhon'],
  // 'lagAlb','lagBel','lagBos','lagBul','lagCes','lagDan','lagDeu','lagEst',
  // 'lagFin','lagFra','lagHrv','lagHun','lagIta','lagLav','lagLit','lagMlt',
  // 'lagMol','lagNld','lagNor','lagPol','lagPor','lagRom','lagRus','lagSlk',
  // 'lagSlv','lagSrp','lagSpa','lagSwe','lagTur','lagUkr',
  // 'lagArb','lagHin','lagJpn'
  aRootNamidx_Char_Qntnam = JSON.parse(moFs.readFileSync('dirNamidx/namidx.lagRoot.json')),
  // [['lagEngl01ei','A',1111]} with quantity of names
  aFilMcs_QntMcs = [],
  // array with the-file-Mcs and the-quantity of Mcs they include
  // [ 'dirTchInf/McsTchInf999999.last.html', 51 ]
  oRootIdxfile_Idx = {},
  // holds the-names of namidx-files and the related chars
  // {lagEngl01ei:'A|a', lagZhon024:'13312..14000'}
  oIdxfilQntnam = {},
  // {lagEngl01ei:222} the-quantities of names of namidx-files
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
        // aLag = ['lagALLL'] or ['lagElln','lagEngl',...]
      } else if (sLn.startsWith('bExtra')) {
        bExtra = true
      } else {
        aFileMcsIn.push(sLn)
      }
    }
  }
}

/**
 * DOING: creates object {namidx: index} from [[namidx,idx,quantity]]
 * INPUT: aIn = [['lagEngl01ei','A',1234]]
 * OUTPUT: {lagEngl01ei:'A'}
 */
function fCreateOFileNamidx_Index(aIn) {
  let oOut = {}
  for (n = 0; n < aIn.length; n++) {
    if (!aIn[n][1].startsWith(';')) {
      // remove non namidx info
      oOut[aIn[n][0]] = aIn[n][1]
    }
  }
  return oOut
}
oRootIdxfile_Idx = fCreateOFileNamidx_Index(aRootNamidx_Char_Qntnam)

// find the-array of languages to work with
if (aLag[0] === 'lagALLL') {
  aLag = aLagALL
}

if (aFileMcsIn.length > 0) {
  // first file we want to upload
  oSetFileUp.add('dirNamidx/namidx.lagRoot.json');
  // also we want the-file with the-quantity of concepts.
  oSetFileUp.add('Mcsqnt.root.json');
}

/**
 * for EACH FILE in aFileMcsIn,
 * for EACH LANGUAGE
 * REMOVE the-names linked to this file, for ALL namidx-files
 * READ the-file and store temporarilly its name-Urls
 * ADD name-Urls in namidx-files
 */
for (n = 0; n < aFileMcsIn.length; n++) {
  let
    nMcsqnt = 0,
    sFileMcs = aFileMcsIn[n] // the-Mcs-file we want to work

  // add the-file to upload-list
  oSetFileUp.add(sFileMcs)
  // add Mcsqnt-file to upload-list
  // if sFileMcs ../index.html dirNamidx/abbreviation.html do nothing nnn
  if (!sFileMcs.startsWith('../')             // root-dir has no Mcs
      && !sFileMcs.startsWith("dirNamidx/")   // dirNamidx has no Mcs
      && !sFileMcs.startsWith("Mcs000")       // dirMcs has Mcsqnt.root.json
     ) {
    oSetFileUp.add(sFileMcs.substring(0, sFileMcs.lastIndexOf('/')) + '/Mcsqnt.json')
  }

  // for EACH language
  for (let nL = 0; nL < aLag.length; nL++) {
    var
      aNU, // array with a-name-Url
      oIdxfil_ANamUrl = {}
      // object to hold the-Αrrays with the-Νame-Urls per namidx-file
      // after reading Mcs-files.
      // {lagEngl01ei:[['name1','Url1'],['name2','Url2']]}

    // REMOVE name-Urls
    fRemoveNamUrl(oRootIdxfile_Idx, sFileMcs, aLag[nL])

    // remove name-Urls and for the-extra-files in this lag
    if (bExtra) {
      let aNamidxExtr = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' +aLag[nL].substring(3)
        +'/namidx.' +aLag[nL] +'Extra.json')),
        oSetExtra_files = new Set(),
        aExtra_files

      for (n = 0; n < aNamidxExtr.length; n++) {
        oSetExtra_files.add(aNamidxExtr[n][1].substring(0, aNamidxExtr[n][1].indexOf('#')))
      }
      aExtra_files = Array.from(oSetExtra_files)
      // console.log(aExtra_files)
      for (n = 0; n <aExtra_files.length; n++) {
        fRemoveNamUrl(oRootIdxfile_Idx, aExtra_files[n], aLag[nL])
      }  
    }

    // READ Mcs-file and ADD its name-Urls on oIdxfil_ANamUrl{lagEngl01ei:[[name,Url]]}
    let
      bMcsSection = true,
      sUrl, // The-url of a-section. it may-contain a-section-Mcs.
      sUrlP, // The-url of a-paragraph. it may-contain a-paragraph-Mcs.
      sUrlPPrev, // the-sUrl of previous-paragraph
      oReadlines = new mfReadlines(sFileMcs)

    while (oNextln = oReadlines.next()) {
      sLn = oNextln.toString()

      // process the-section and Mcs-name lines
      if (sLn.indexOf('<section id="') >= 0) {
        // first get the-id of the-section
        // names are-stored inside a-section and <p>name::
        sUrl = sLn.substring(sLn.indexOf('"')+1,sLn.lastIndexOf('"'))
        sUrl = sFileMcs + '#' + sUrl
      } else if (sLn.indexOf('<p id="') >= 0) {
        bMcsSection = false;
        sUrlPPrev = sUrlP
        sUrlP = sLn.substring(sLn.indexOf('"')+1,sLn.lastIndexOf('">'))
        sUrlP = sFileMcs + '#' + sUrlP
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
           || sLn.startsWith('    <br> &nbsp; &nbsp;* ενν.') // σύνταγμα.2008 ειδική περίπτωση!
           || sLn.startsWith('    <br> &nbsp; &nbsp; &nbsp; &nbsp;* ενν.')) {
            if (sLn.indexOf('* ενν.') > 0) {
              aNU = [sLn.substring(sLn.indexOf('* ενν.')+6, sLn.indexOf(',')), sUrl]
            } else  {
              aNU = [sLn.substring(18, sLn.indexOf(',')), sUrl]
            }
            fStoreNamUrlLag(aNU, aLag[nL])
          }
        } else {
          if (sLn.startsWith('    <br>* Mcs'+aLag[nL].substring(3)+'.')) {
            if (bMcsSection) {
              aNU = [sLn.substring(18, sLn.indexOf(',')), sUrl]
              fStoreNamUrlLag(aNU, aLag[nL])
            } else {
              aNU = [sLn.substring(18, sLn.indexOf(',')), sUrlP]
              fStoreNamUrlLag(aNU, aLag[nL])
              // if previous-id different for current
              // we have a-new-paragraph-cpt
              // because in one paragraph we can-have many Mcs.
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
      // ADD extra name-Urls on oIdxfil_ANamUrl for current language
      let aNamidxExtr = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' +aLag[nL].substring(3)
        +'/namidx.' +aLag[nL] +'Extra.json'))
      for (let nE = 0; nE < aNamidxExtr.length; nE++) {
        fStoreNamUrlLag(aNamidxExtr[nE], aLag[nL])
      }
    }

    // WRITE arrays in oIdxfil_ANamUrl ({lagEngl01ei:[[name,Url]]})
    // in namidx-files
    for (let sNmix in oIdxfil_ANamUrl) {
      // console.log(aLag[nL]+", "+sNmix)
      let
        aNew = oIdxfil_ANamUrl[sNmix], // the-array with name-Urls
        // the-name of the existing file with names-urls
        sIdxfilFullExist = 'dirNamidx/dirLag' +aLag[nL].substring(3) +'/namidx.' +sNmix +'.json',
        sMeta

      oSetFileUp.add(sIdxfilFullExist)
      aNew.sort(fCompare)

      // if namidx-file exists, put new names and write
      if (moFs.existsSync(sIdxfilFullExist)) {
        let
          aEx = JSON.parse(moFs.readFileSync(sIdxfilFullExist))
          //the-existing-array

        sMeta = aEx.shift() // [";namidx",";char..char.2"
        // add on existed-names the new names,
        for (let nN = 0; nN < aNew.length; nN++) {
          aEx.push(aNew[nN])
        }
        aEx = fRemoveArrayDupl(aEx) // remove duplicates
        aEx.sort(fCompare)
        oIdxfilQntnam[sNmix] = aEx.length
        aEx.unshift(sMeta)
        fWriteJsonQntDate(sIdxfilFullExist, aEx)
      } else {
        // namidx-file does not exist, write new-array of names.
        oIdxfilQntnam[sNmix] = aNew.length
        let
          aMeta = []
        aMeta[0] = ';' +sNmix
        aMeta[1] = fFindIndex(sNmix)
        aNew.unshift(aMeta)
        fWriteJsonQntDate(sIdxfilFullExist, aNew)
      }
    }
  }

  // update Mcsqnt.json
  // only on Mcs-files measure Mcs
  if (sFileMcs.indexOf('filMcs') >= 0
     || sFileMcs.indexOf('Mcs') >= 0 
     || sFileMcs.indexOf('Hitp') >= 0 )  {
    aFilMcs_QntMcs.push([sFileMcs, nMcsqnt])
  }
}

/**
 * DOING: REMOVES name-Urls from namidx-files per language
 * INPUT:
 *   - oFilenamidxIndexIn: object {lagElln01alfa: 'Α'} from which the-names will-be-removed
 *   - sFilMcsRmvIn: the-Mcsfile whose names will-be-removed
 *   - sLagIn: the-lag whose names will-be-removed
 */
function fRemoveNamUrl(oFilenamidxIndexIn, sFilMcsRmvIn, sLagIn) {
  // oFilenamidxIndexIn = { lagElln00: 'charREST', lagElln01alfa: 'Α', ... lagSngo25u: 'U' }
  // sFilMcsRmvIn = dirCor/McsCor999999.last.html
  // sLagIn = lagElln
  // for ALL namidx-files remove names with Url sFilMcsRmvIn
  // TODO: IF we have a-file for each Mcs-file[a]
  // with ALL the-namidx-json-files in which it[a] is-used
  // THEN we can-iterate ONLY in these files. {2018-07-23}
  for (let sFileNamidxShort in oFilenamidxIndexIn) {
    // ALL namidx-files in sLagIn
    if (sFileNamidxShort.startsWith(sLagIn)) { // sFileNamidxShort: lagEngl01ei, sLagIn: lagEngl
      let
        aNamDif = [],
        sFileNamidxFull = 'dirNamidx/dirLag' + sLagIn.substring(3) +
                  '/namidx.' + sFileNamidxShort + '.json',
        sUrl

      if (moFs.existsSync(sFileNamidxFull)) {
        let
          // read existing namidx.X
          aNamExist,
          bRemoved = false

        try {
          aNamExist = JSON.parse(moFs.readFileSync(sFileNamidxFull))
        } catch(e) {
          console.log('>> json problem:' + sFileNamidxFull)
        }
          
        // IF namidx is reference (endsWith('_0.json'))
        // read it, make oFilenamidxIndexIn, and remove names
        if (sFileNamidxFull.endsWith('_0.json')) {
          let oIN = fCreateOFileNamidx_Index(aNamExist)
          fRemoveNamUrl(oIN, sFilMcsRmvIn, sLagIn)
        } else {
          // ELSE remove names
          // create new array with names NOT in sFilMcsRmvIn
          // first put on new array meta-info: [";lagElln06zita",";Ζ..Η",1,"2019-09-04"]
          aNamDif.push(aNamExist[0])
          for (let nE = 1; nE < aNamExist.length; nE++) {
            // the-url of a-name
            sUrl = aNamExist[nE][1]
            // add on aNamDif the-names without the-file to remove
            if (!sUrl.startsWith(sFilMcsRmvIn)) {
              aNamDif.push(aNamExist[nE])
            } else if (sUrl.startsWith(sFilMcsRmvIn)) {
              bRemoved = true
              oSetFileUp.add(sFileNamidxFull)
              if (sFileNamidxFull.indexOf('_') > 0) {
                // IF removed child, add and parent-reference
                oSetFileUp.add(sFileNamidxFull.substring(0, sFileNamidxFull.lastIndexOf('_')) +'_0.json')
              }
            }
          }
          // store namidx length
          if (bRemoved) {
            oIdxfilQntnam[sFileNamidxShort] = aNamDif.length - 1
            // sFileNamidxShort changed, store it
            fWriteJsonQntDate(sFileNamidxFull, aNamDif)
          }
        }
      }
    }
  }
}

/**
 * DOING:
 *  it stores one name-Url in oIdxfil_ANamUrl
 *  using first character of name, for a-language
 * INPUT:
 *  - aNUIn: ["name","dirNtr/McsNtr000007.last.html#idChmElrBoron"]
 *  - sLagIn: 'lagSngo','lagEngl','lagElln'
 */
function fStoreNamUrlLag(aNUIn, sLagIn) {
  let
    bRest = true,
    // if first-char of name NOT in an-index in the-lag, then it is a-charREST in this lag
    sCharName,    // the-first char of name
    sCharIdx,     // the-chars in the-index-file
    sCharIdxStart,
    sCharIdxEnd,
    sIdxfile      // name of namidx-file on which to store the-name-Url

  // FIND namidx-file
  // choose root-char or rest
  sCharName = aNUIn[0].substring(0,1)
  for (sIdxfile in oRootIdxfile_Idx) {
    if (sIdxfile.startsWith(sLagIn)) {
      sCharIdx = oRootIdxfile_Idx[sIdxfile]

      if (sCharIdx.indexOf('..') < 0) {
        // index is a-set of chars 'B|b|'
        if (sCharIdx.indexOf(sCharName) >= 0) {
          // found index-file
          bRest = false 
          fStoreNamUrlNamidx(sIdxfile, aNUIn, sLagIn)
          break
        }
      } else {
        // index is a-sequence of chars 'C..D'
        let a = sCharIdx.split('..')
        sCharIdxStart = a[0]
        sCharIdxEnd = a[1]
        if (sCharName >= sCharIdxStart && sCharName < sCharIdxEnd) {
          // found index-file
          bRest = false 
          fStoreNamUrlNamidx(sIdxfile, aNUIn, sLagIn)
          break
        }
      }
    }
  }
  if (bRest) {
    sIdxfile = sLagIn + '00'
    fStoreNamUrlNamidx(sIdxfile, aNUIn, sLagIn)
  }

  /*
  sCharName = aNUIn[0].substring(0,1).toUpperCase()
  if (Object.values(oRootIdxfile_Idx).includes(sCharName)) {
    // find namidx-file for sCharName
    sIdxfile = fObjvalRKey(oRootIdxfile_Idx, sCharName, sLagIn)
    //if letter in other-lang, then no namidx in this lang
    if (sIdxfile) {
      fStoreNamUrlNamidx(sIdxfile, aNUIn)
    } else {
      sIdxfile = sLagIn + '00'
      fStoreNamUrlNamidx(sIdxfile, aNUIn)
    }
  } else {
    // if sCharName is not found, choose REST-char
    sIdxfile = sLagIn + '00'
    fStoreNamUrlNamidx(sIdxfile, aNUIn)
  }
  */
}

/**
 * DOING: it stores a-name-Url in oIdxfil_ANamUrl in a-namidx-file
 * INPUT: sNamidxIn: lagSngo24i, lagZhon05, lagEngl19es_0
 */
function fStoreNamUrlNamidx(sNamidxIn, aNUIn, sLagIn) {
  // console.log(sNamidxIn+', '+aNUIn[0])
  if (!sNamidxIn.endsWith('_0')) {
    // namidx is NOT a-reference
    if (oIdxfil_ANamUrl[sNamidxIn]) {
      oIdxfil_ANamUrl[sNamidxIn].push(aNUIn)
    } else {
      oIdxfil_ANamUrl[sNamidxIn] = []
      oIdxfil_ANamUrl[sNamidxIn].push(aNUIn)
    }
  } else {
    // lagNam03si_0 is a-reference
    let aNi = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' + sLagIn.substring(3)
      +'/namidx.' +sNamidxIn +'.json'))
    fStoreNamUrlReference(aNi, aNUIn, sLagIn)
  }
}

/**
 * DOING:
 *   stores one name-Url in oIdxfil_ANamUrl
 *   using Unicode-code-points order
 * INPUT:
 * - aNamidxRefIn: an-array of a-reference-namidx
 * [
 *   [";lagEngl03si_0","C|c",167556,"2021-11-07","codepoint order"],
 *   ["lagEngl03si_1","C..char",2178],
 *   ["lagEngl03si_2_0","char..chas",163164],
 *   ["lagEngl03si_3","chas..D",2214]
 * ]
 * - aNUIn: ['name','Url']
 */
function fStoreNamUrlReference(aNamidxRefIn, aNUIn, sLagIn) {
  // a-reference-namidx ALWAYS contains sequencies (..) of indecies
  // console.log(aNUIn[0]+':   '+aNamidxRefIn[0])
  for (n = 1; n < aNamidxRefIn.length; n++) {
    // console.log(aNUIn[0]+':   '+aNamidxRefIn[n])
    if (aNUIn[0] >= aNamidxRefIn[n][1].split('..')[0] &&
        aNUIn[0] < aNamidxRefIn[n][1].split('..')[1]) {
      // console.log(aNUIn[0]+', '+aNamidxRefIn[n])
      // if previous namidx-file is not a-reference, store name-Url
      if (!aNamidxRefIn[n][0].endsWith('_0')) {
        if (oIdxfil_ANamUrl[aNamidxRefIn[n][0]]) {
          oIdxfil_ANamUrl[aNamidxRefIn[n][0]].push(aNUIn)
        } else {
          oIdxfil_ANamUrl[aNamidxRefIn[n][0]] = []
          oIdxfil_ANamUrl[aNamidxRefIn[n][0]].push(aNUIn)
        }
      } else {
        // namidx-file is a-reference
        let aNi = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' + sLagIn.substring(3)
            +'/namidx.' +aNamidxRefIn[n][0] +'.json'))
        fStoreNamUrlReference(aNi, aNUIn, sLagIn)
      }
      break
    }
  }
}

/**
 * DOING: it finds the-index of a-given index-file.
 */
function fFindIndex(sIdxfilIn) {
  let
    sIdx = '',
    sIdxfilFull,
    sLag = sIdxfilIn.substring(3, 7),
    sFile,
    aRef

  if (sIdxfilIn.indexOf('_') < 0) {
    // search root
    sIdx = fFindIdxArray(aRootNamidx_Char_Qntnam)
  } else if (sIdxfilIn.endsWith('_0')) {
    // lagEngl03si_0 search lagEngl03si
    // lagEngl03si_2_0 search lagEngl03si_0
    sFile = sIdxfilIn.substring(0, sIdxfilIn.lastIndexOf('_'))
    if (sFile.indexOf('_') < 0) {
      sIdx = fFindIdxArray(aRootNamidx_Char_Qntnam)
    } else {
      sFile = sFile.substring(0, sFile.lastIndexOf('_'))
      sIdxfilFull = 'dirNamidx/dirLag'+sLag +'/namidx.' +sFile +'_0.json'
      aRef = JSON.parse(moFs.readFileSync(sIdxfilFull))
      sIdx = fFindIdxArray(aRef)
    }
  } else {
    // lagEngl03si_2_14 search lagEngl03si_2_0
    sFile = sIdxfilIn.substring(0, sIdxfilIn.lastIndexOf('_'))
    sIdxfilFull = 'dirNamidx/dirLag'+sLag +'/namidx.' +sFile +'_0.json'
    aRef = JSON.parse(moFs.readFileSync(sIdxfilFull))
    sIdx = fFindIdxArray(aRef)
  }

  function fFindIdxArray (aIdxfil) {
    for (n = 1; n < aIdxfil.length; n++) {
      if (aIdxfil[n][0] === sIdxfilIn) {
        // we found idxfile
        sIdx = aIdxfil[n][1]
        break
      }
    }
    return sIdx
  }
  return sIdx
}
console.log(fFindIndex("lagEngl03si_0"))

/**
 * Remove duplicates of an-array [["a","b"],["a","c"],["a","b"],["c","d"]]
 */
function fRemoveArrayDupl(aIn) {
  let
    aHelp = [],
    aOut = [],
    sElt

  for (n = 0; n < aIn.length; n++) {
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
  let
    s

  // aIn[0] = [";lagEngl01ei",";A..B",419,"2018-08-04"],
  if (aIn.length === 1) {
    s = '[\n  ["' + aIn[0][0] + '","' + aIn[0][1] + '",0,"' + fDateYMD() + '"]\n'
  } else {
    s = '[\n  ["' + aIn[0][0] + '","' + aIn[0][1] + '",' +
      (aIn.length-1) + ',"' + fDateYMD() + '"],\n'
    for (let n = 1; n < aIn.length-1; n++) {
      s = s +'  ["' + aIn[n][0] + '","' + aIn[n][1] + '"],\n'
    }
    // last element no-comma at the-end
    s = s + '  ["' + aIn[aIn.length-1][0] + '","' + aIn[aIn.length-1][1] + '"]\n'
  }

  s = s + ']'
  moFs.writeFileSync(sFilIn, s)
}

/**
 * DOING: it returns the-current-date as yyyy-mm-dd
 */
function fDateYMD() {
  let
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
  let
    s

  // aIn length more than 1
  s = '[\n'
  for (n = 0; n < aIn.length-1; n++) {
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
  let sOut =''

  for (let k in oIn) {
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
  // oIdxfilQntnam={lagEngl00: 1101,lagEngl01ei: 419,lagEngl03si_1: 1038,lagEngl03si_2_1: 6959}
  // the-set of namidx-files we computed
  let oSetNamidxComputed = new Set()

  for (let sFileNij in oIdxfilQntnam) {
    // console.log('>>> compute: '+sFileNij)
    let sNamidxRef // the-reference-file lagEngl03si_2_0

    // if namidx is a-child, we find its reference-parent
    if (sFileNij.indexOf('_') > 0) {
      // lagEngl03si_1 >> lagEngl03si_0
      sNamidxRef = sFileNij.substring(0, sFileNij.lastIndexOf('_')) +'_0'
    }

    if (sFileNij.indexOf('_') === -1 && !oSetNamidxComputed.has('lagRoot')) {
      // a namidx.lagRoot.json element
      oSetNamidxComputed.add('lagRoot')
      fUpdate_from_oIdxfilQ('dirNamidx/namidx.lagRoot.json')
    } else if (sFileNij.indexOf('_') > 0 && !oSetNamidxComputed.has(sNamidxRef)) {
      // sNamidxRef=lagEngl03si_2_0
      oSetNamidxComputed.add(sNamidxRef)
      fUpdate_from_oIdxfilQ('dirNamidx/dirLag' + sFileNij.substring(3,7)
        + '/namidx.' + sNamidxRef + '.json')
    }
  }

  // update quantities in a-reference-namidx-file
  // and computes new sums
  function fUpdate_from_oIdxfilQ(sNamidxRefIn) {
    // read array of namidx of file
    // iterate over array and update oIdxfilQntnam items
    // store new file
    // [";lagEngl03si_2_0",";char",129181,"2018-07-29","codepoint order"],
    // ["lagEngl03si_2_1","char",6959],
    let
      aNi = JSON.parse(moFs.readFileSync(sNamidxRefIn)),
      n,
      nSum = 0

    if (sNamidxRefIn.indexOf('.lagRoot.json') === -1) {
      // console.log("update: " +sNamidxRefIn)
      for (n = 1; n < aNi.length; n++) {
        // aNi=[["lagEngl03si_2_1","char",1000]]
        // oIdxfilQntnam= [lagEngl03si_2_1:1000]]
        // if oIdxfilQntnam contains info of aNi[n]
        if (!aNi[n][0].startsWith(';')) {
          // don't compute lag-sums twice [";lagEngl","English",145191],
          if (oIdxfilQntnam[aNi[n][0]]) {
            aNi[n][2] = oIdxfilQntnam[aNi[n][0]]
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
      let
        nLag = 1, // first lang index
        nSumAGGR = 0

      // [";AGGR","char",0,"2018-09-11","root chars"],
      // [";lagElln","Greek",1848],
      for (n = 2; n < aNi.length; n++) {
        // ["lagElln01alfa","Α",258],
        if (new RegExp('^;lag....$').test(aNi[n][0])) {
          // on new lag reset nSum
          nSumAGGR = nSumAGGR + nSum
          aNi[nLag][2] = nSum
          nSum = 0
          nLag = n
        } else if (oIdxfilQntnam[aNi[n][0]] >= 0) {
          aNi[n][2] = oIdxfilQntnam[aNi[n][0]]
          nSum = nSum + aNi[n][2]
          oSetNamidxComputed.add(aNi[n][0])
        } else if (!oIdxfilQntnam[aNi[n][0]]) {
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

  // update sum in parent files
  function fUpdate_from_child(sChld_pathIn, nChld_sumIn) {
    // double
    let
      sPrnt_path,
      aPrnt_nmix,
      n,
      nPrnt_sum = 0,
      sChld_path_only = sChld_pathIn.substring(0, sChld_pathIn.lastIndexOf('_')),
      sChld_nmix = sChld_pathIn.substring(sChld_pathIn.indexOf('namidx.')+7, sChld_pathIn.lastIndexOf('.'))

    if (sChld_path_only.indexOf('_') > 0) {
      // parent is NOT the-root-reference
      sPrnt_path = sChld_path_only.substring(0, sChld_path_only.lastIndexOf('_')) + '_0.json'
      // console.log('update-child: ' +sPrnt_path +', ' +nChld_sumIn)
      aPrnt_nmix = JSON.parse(moFs.readFileSync(sPrnt_path))
      for (n = 1; n < aPrnt_nmix.length; n++) {
        // ["lagEngl03si_0","C",130313],
        if (aPrnt_nmix[n][0] === sChld_nmix) {
          nPrnt_sum = nPrnt_sum + nChld_sumIn
          aPrnt_nmix[n][2] = nChld_sumIn
        } else {
          nPrnt_sum = nPrnt_sum + aPrnt_nmix[n][2]
        }
      }
      aPrnt_nmix[0][2] = nPrnt_sum // all sum
      aPrnt_nmix[0][3] = fDateYMD()
      fWriteJsonArray(sPrnt_path, aPrnt_nmix)
      fUpdate_from_child(sPrnt_path, nPrnt_sum)
    } else {
      // parent is the-root-reference
      // console.log('update-child: root, ' +nChld_sumIn)
      let
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

// write the-files to upload
let aSftp = Array.from(oSetFileUp)
aSftp.sort()
console.log(aSftp)
fWriteJsonArray('sftp.json', aSftp)

console.log('>>> Mcs-file indexed:')
console.log(aFilMcs_QntMcs)

/**
 * DOING: updates the-quantity of Mcs of ONE Mcs-file[a] in Mcsqnt.json-files 
 *    AND all wholes of it[a]
 * INPUT: the-name of an-Mcs-file[a] and the-new quantity of Mcs in this[a] file.
 * OUTPUT: the-Mcsqnt-files affected 
 */
function fUpdateQntMcs(sFileMcsIn, nMcsqntIn) {
  let
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
      // remove files with 0 Mcs
      aMcsqnt.splice(n, 1)
    } else if (aMcsqnt[n][0] === sFileMcsIn) {
      aMcsqnt[n][1] = nMcsqntIn
      nMcsqntSum = nMcsqntSum + nMcsqntIn
      bMcs = true
    } else {
      nMcsqntSum = nMcsqntSum + aMcsqnt[n][1]
    }
  }
  // if Mcsfile is new, add it
  // we have to remove old!!! or qnt=0
  if (!bMcs) {
    aMcsqnt.push([sFileMcsIn, nMcsqntIn])
    nMcsqntSum = nMcsqntSum + nMcsqntIn
  }
  // on root
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
    let
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
fUpdateALLQntMcs(aFilMcs_QntMcs)