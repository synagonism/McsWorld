/**
 * DOING: removes and adds the-name-Urls of namidx-files in namidx.txt
 *   from dirNamidx/dirLag/namidx.X.json-files.
 * INPUT: namidx.txt
 * OUTPUT: nameidx.X.json
 * RUN: node namidx
 *
 * PROBLEM:
 * - on many languages, store all files in one dir dirEll eg
 *
 * modified: {2018-10-25} 'cptqnt.json'
 * modified: {2018-10-16} '* Mcs.'
 * modified: {2018-09-22}
 * created: {2017-06-01}
 */

var
  moFs = require('fs'),
  mfReadlines = require('n-readlines'), // npm install n-readlines
  bExtra = false,
  oNextln,
  oSetFileUp = new Set, // files to upload, namidx, html, json
  aFilMcsInComments = moFs.readFileSync('namidx.txt').toString().split('\n'),
  //array with names of filMcsName.html to remove|add
  aFilMcsIn = [],
  aLag = [], //array of languages ['lagALL'] or ['lagEll','lagEng',...]
  aLagAll = ['lagAlb','lagBel','lagBos','lagBul','lagCes','lagDan','lagDeu','lagEll','lagEng','lagEst',
    'lagFin','lagFra','lagHrv','lagHun','lagIta','lagLav','lagLit','lagMlt','lagMol','lagNld','lagNor',
    'lagPol','lagPor','lagRom','lagRus','lagSlk','lagSlv','lagSrp','lagSpa','lagSwe','lagTur','lagUkr',
    'lagArb','lagHin','lagJpn','lagZho'
  ],
  //[['lagEng01ei','A',1111]} with quantity of names
  aNamidxRootSum = JSON.parse(moFs.readFileSync('dirNamidx/namidx.root.json')),
  aCpt = [],
  n,
  //hold the-names of namidx-files and the related capital-letters
  //we want the-names of files to be only english.
  //{lagEng01ei:'A'}
  oNamidxRoot = {},
  //object to hold the-arrays with the-name-Urls
  //after reading filMcsName.html files.
  //{lagEng01ei:[['name','Url']]}
  oNamidxAnu = {},
  //{lagEng01ei:222} the-quantities of names of namidx-files
  oNamidxQ = {},
  sLn

// if run with arguments, skip namidx.txt
if (process.argv[2]) {
  aFilMcsIn = [process.argv[2]]
  if (process.argv[3]) {
    aLag = [process.argv[3]]
  } else {
    aLag = ['lagEng']
  }
} else {
  /**
   * a) find the-Mcs-files to remove|add its names and put paths in aFilMcsIn.
   * b) find the-languages to work with.
   */
  for (n = 0; n < aFilMcsInComments.length; n++) {
    sLn = aFilMcsInComments[n]

    // remove comments and empty-lines
    if (!sLn.startsWith('//') && sLn.length !== 0) {
      if (sLn.startsWith('lag')) {
        aLag.push(sLn.substring(0,6))
        //aLag = ['lagALL'] or ['lagEll','lagEng',...]
      } else if (sLn.startsWith('bExtra')) {
        bExtra = true
      } else {
        aFilMcsIn.push(sLn)
      }
    }
  }
}

/**
 * DOING: creates object {namidxfil: idx} from [[namidxfil,idx,quantity]]
 * INPUT: aNamidxRootSum = [['lagEng01ei','A',1234]]
 * OUTPUT: oNamidxRoot = {lagEng01ei:'A'}
 */
function fCreateONamidxRO(aIn) {
  var oOut = {}
  for (var n = 0; n < aIn.length; n++) {
    if (!aIn[n][1].startsWith(';')) {
      oOut[aIn[n][0]] = aIn[n][1]
    }
  }
  return oOut
}
oNamidxRoot = fCreateONamidxRO(aNamidxRootSum)

//find the-array of languages to work with
if (aLag[0] === 'lagALL') {
  aLag = aLagAll
}

if (aFilMcsIn.length > 0) {
  oSetFileUp.add('dirNamidx/namidx.root.json');
}

/**
 * for EACH FILE in aFilMcsIn,
 * for EACH LANGUAGE
 * REMOVE the-names linked to this file, from ALL namidx-files
 * READ the-file and store temporarilly its name-Urls
 * ADD name-Urls in namidx-files
 */
for (n = 0; n < aFilMcsIn.length; n++) {
  var
    nCptqnt = 0,
    sFil = aFilMcsIn[n] //the-Mcs-file we want to work

  oSetFileUp.add(sFil)
  oSetFileUp.add(sFil.substring(0, sFil.lastIndexOf('/')) + '/cptqnt.json')
  //for EACH language
  for (var nL = 0; nL < aLag.length; nL++) {
    var
      aNU, // array with a-name and its-Url
      sChar,
      sL = aLag[nL].substring(3) //Spa

    //REMOVE name-Urls
    fRemoveNames(oNamidxRoot, sFil, aLag[nL])
    // remove name-Urls and for the-extra-files in this lag
    if (bExtra) {
      var aNamidxExtr = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' +sL
        +'/namidx.' +aLag[nL] +'Extra.json')),
        oSetExtra_files = new Set(),
        aExtra_files,
        n

      for (n = 0; n < aNamidxExtr.length; n++) {
        oSetExtra_files.add(aNamidxExtr[n][1].substring(0, aNamidxExtr[n][1].indexOf('#')))
      }
      aExtra_files = Array.from(oSetExtra_files)
      console.log(aExtra_files)
      for (n = 0; n <aExtra_files.length; n++) {
        fRemoveNames(oNamidxRoot, aExtra_files[n], aLag[nL])
      }  
    }

    //READ Mcs-file and ADD its name-Urls on oNamidxAnu{lagEng01ei:[[name,Url]]}
    var
      sUrl, //The-url of the-name, is the-url of the-section-element is in.
      oReadlines = new mfReadlines(sFil)

    while (oNextln = oReadlines.next()) {
      sLn = oNextln.toString()

      //process the-section and cpt lines
      if (sLn.indexOf('<section id="') >= 0) {
        //first get the-id of the-section
        //names are-stored inside a-section
        sUrl = sLn.substring(sLn.indexOf('"')+1,sLn.lastIndexOf('"'))
        sUrl = aFilMcsIn[n] + '#' + sUrl
      } else if (sLn.indexOf('name::') >= 0 || sLn.indexOf('name::') >= 0) {
        nCptqnt = nCptqnt + 1
      } else {
        if (aLag[nL] === 'lagEng') {
          if (sLn.startsWith('    <br>* cpt.') ||
              sLn.startsWith('    <br>* Mcs.')) {
            if (sLn.indexOf('* cpt.') > 0) {
              aNU = [sLn.substring(sLn.indexOf('* cpt.')+6, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(sLn.indexOf('* cpt.')+6).toUpperCase() //char at cpt.X
              fStoreNULetter(aNU, sChar, aLag[nL])
            } else {
              aNU = [sLn.substring(sLn.indexOf('* Mcs.')+6, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(sLn.indexOf('* Mcs.')+6).toUpperCase() //char at cpt.X
              fStoreNULetter(aNU, sChar, aLag[nL])
            }
          }
        } else if (aLag[nL] === 'lagEll') {
          if (sLn.startsWith('    <br>* ενν.')
           || sLn.startsWith('    <br>* McsEll.')
           || sLn.startsWith('    <br>* cptEll.')
           || sLn.startsWith('    <br> &nbsp; &nbsp;* ενν.') //σύνταγμα.2008 ειδική περίπτωση!
           || sLn.startsWith('    <br> &nbsp; &nbsp; &nbsp; &nbsp;* ενν.')) {
            if (sLn.indexOf('* ενν.') > 0) {
              aNU = [sLn.substring(sLn.indexOf('* ενν.')+6, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(sLn.indexOf('* ενν.')+6).toUpperCase() //char at ενν.X
            } else if (sLn.indexOf('* cptEll.') > 0) {
              aNU = [sLn.substring(sLn.indexOf('* cptEll.')+9, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(sLn.indexOf('* cptEll.')+9).toUpperCase()
            } else  {
              aNU = [sLn.substring(sLn.indexOf('* McsEll.')+9, sLn.indexOf(',')), sUrl]
              sChar = sLn.charAt(sLn.indexOf('* McsEll.')+9).toUpperCase()
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
          if (sLn.startsWith('    <br>* cpt'+sL+'.')) {
            aNU = [sLn.substring(sLn.indexOf('* cpt'+sL+'.')+9, sLn.indexOf(',')), sUrl]
            sChar = sLn.charAt(sLn.indexOf('* cpt'+sL+'.')+9).toUpperCase() //char at cptLag.X
            fStoreNULetter(aNU, sChar, aLag[nL])
          }
        }
      }
    }

    if (bExtra) {
      //ADD extra name-Urls on oNamidxAnu for current language
      var aNamidxExtr = JSON.parse(moFs.readFileSync('dirNamidx/dirLag' +sL
        +'/namidx.' +aLag[nL] +'Extra.json'))
      for (var nE = 0; nE < aNamidxExtr.length; nE++) {
        sChar = aNamidxExtr[nE][0].substring(0,1).toUpperCase()
        fStoreNULetter(aNamidxExtr[nE], sChar, aLag[nL])
      }
    }

    //WRITE arrays in oNamidxAnu ({lagEng01ei:[[name,Url]]})
    //in namidx-files
    for (var sNmix in oNamidxAnu) {
      var
        aNew = oNamidxAnu[sNmix], //the-array with name-Urls
        //the-name of the existing file with names-urls
        sNamidxExistFull = 'dirNamidx/dirLag' +sL +'/namidx.' +sNmix +'.json',
        sMeta

      oSetFileUp.add(sNamidxExistFull)
      aNew.sort(fCompare)

      //if namidx-file exists, put new names and write
      if (moFs.existsSync(sNamidxExistFull)) {
        var
          aEx = JSON.parse(moFs.readFileSync(sNamidxExistFull))

        sMeta = aEx.shift() // [";namidx",";char..char.2"
        //add on existed-names the new names,
        for (var nN = 0; nN < aNew.length; nN++) {
          aEx.push(aNew[nN])
        }
        aEx = fArrayRemoveDupl(aEx) //remove duplicates
        aEx.sort(fCompare)
        oNamidxQ[sNmix] = aEx.length
        aEx.unshift(sMeta)
        fWriteJsonSync(sNamidxExistFull, aEx)
      } else {
        oNamidxQ[sNmix] = aNew.length
        aNew.unshift(sMeta)
        //if namidx-file does not exist, write new-array of names.
        fWriteJsonSync(sNamidxExistFull, aNew)
      }
    }
  }

  //update cptqnt.json
  aCpt.push([sFil, nCptqnt])
}

/**
 * DOING: REMOVES name-Urls from namidx-files per language
 * INPUT:
 *   - oNamidxFIIn: object of File-Index from which the-names will-be-removed
 *   - sFilRmvIn: the-file whose names will-be-removed
 *   - sLagIn: the-lag whose names will-be-removed
 */
function fRemoveNames(oNamidxFIIn, sFilRmvIn, sLagIn) {
  //for ALL namidx-files remove names with Url sFilRmvIn
  //TODO: IF we have a-file for each Mcs-file[a]
  // with ALL the-namidx-files in which it[a] is-used
  // THEN we can-iterate ONLY in these files. {2018-07-23}
  for (var sNmix in oNamidxFIIn) {
    //only for namidx-files in sLagIn
    if (sNmix.startsWith(sLagIn)) { //sNmix: lagEng01ei, sLagIn: lagEng
      var
        aNamDif = [],
        sNamidxFull = 'dirNamidx/dirLag' + sLagIn.substring(3) +
                  '/namidx.' + sNmix + '.json',
        sUrl

      if (moFs.existsSync(sNamidxFull)) {
        var
          //read existing namidx.X
          aEx = JSON.parse(moFs.readFileSync(sNamidxFull)),
          bRemoved = false

        //IF namidx is reference (endsWith('_0.json'))
        //read it, make oNamidxFIIn, and remove names
        if (sNamidxFull.endsWith('_0.json')) {
          var oIN = fCreateONamidxRO(aEx)
          fRemoveNames(oIN, sFilRmvIn, sLagIn)
          oSetFileUp.add(sNamidxFull)
        } else {
          //ELSE remove names
          //create new array with names NOT in sFilRmvIn
          for (var nE = 0; nE < aEx.length; nE++) {
            //the-url of a-name
            sUrl = aEx[nE][1]
            //add on aNamDif the-names without the-file to remove
            if (!sUrl.startsWith(sFilRmvIn)) {
              aNamDif.push(aEx[nE])
            } else if (sUrl.startsWith(sFilRmvIn)) {
              bRemoved = true
              oSetFileUp.add(sNamidxFull)
            }
          }
          //store namidx length
          if (bRemoved) {
            oNamidxQ[sNmix] = aNamDif.length - 1
            // if sNmix changed, store it
            fWriteJsonSync(sNamidxFull, aNamDif)
          }
        }
      }
    }
  }
}

/**
 * DOING: store one name-Url in oNamidxAnu
 *   using first capital-letter of name
 */
function fStoreNULetter(aNUIn, sLtrIn, sLagIn) {
  var sNif // name of namidx-file

  // choose lag-letter or rest
  if (Object.values(oNamidxRoot).includes(sLtrIn)) {
    //find namidx-file for sLtrIn
    sNif = fObjvalRKey(oNamidxRoot, sLtrIn)
    fStoreNULetter_root_or_child(sNif)
  } else {
    //if sLtrIn is REST-char
    sNif = fObjvalRKey(oNamidxRoot, sLagIn+'REST')
    fStoreNULetter_root_or_child(sNif)
  }

  // choose root or child
  function fStoreNULetter_root_or_child(sNifIn) {
    //console.log(sNifIn+', '+aNUIn[0])
    if (!sNifIn.endsWith('_0')) {
      // namidx is not a-reference
      if (oNamidxAnu[sNifIn]) {
        oNamidxAnu[sNifIn].push(aNUIn)
      } else {
        oNamidxAnu[sNifIn] = []
        oNamidxAnu[sNifIn].push(aNUIn)
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
 * DOING: stores one name-Url in temporary array of namidx-files
 *   using Unicode-code-points order
 * aNamidxIn: [['lagEng03si_2_1', 'name', 1234]]
 * aNUIn: ['name','Url']
 */
function fStoreNUCodepoint(aNamidxIn, aNUIn, sLagIn) {
  //aNamidxIn[0] = [ ';lagEng03si_0', 'C..D', 444, '2018-07-22' ]
  //console.log(aNUIn[0]+':   '+aNamidxIn[0])
  for (var n = 2; n < aNamidxIn.length; n++) {
    //console.log(aNUIn[0]+':   '+aNamidxIn[n])
    if (aNUIn[0] < aNamidxIn[n][1].split('..')[0]) {
      //if name-aNUIn < name-aNamidxIn
      //add name-Url in PREVIOUS index-file
      //console.log(aNUIn[0]+', '+aNamidxIn[n])
      //if namidx-file is not a-reference, store name-Url
      if (!aNamidxIn[n-1][0].endsWith('_0')) {
        //store
        if (oNamidxAnu[aNamidxIn[n-1][0]]) {
          oNamidxAnu[aNamidxIn[n-1][0]].push(aNUIn)
        } else {
          oNamidxAnu[aNamidxIn[n-1][0]] = []
          oNamidxAnu[aNamidxIn[n-1][0]].push(aNUIn)
        }
      } else {
        //namidx-file is a-reference
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
        if (oNamidxAnu[aNamidxIn[n][0]]) {
          oNamidxAnu[aNamidxIn[n][0]].push(aNUIn)
        } else {
          oNamidxAnu[aNamidxIn[n][0]] = []
          oNamidxAnu[aNamidxIn[n][0]].push(aNUIn)
        }
      } else {
        //namidx-file is a-reference
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
function fArrayRemoveDupl(aIn) {
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
 * INPUT:
 *   - sFilIn the-namidx-file we want to create
 *   - aIn the-array of the-name-Url-arrays to include,
 */
function fWriteJsonSync(sFilIn, aIn) {
  var
    s

  // aIn[0] [";lagEng01ei",";A..B",419,"2018-08-04"],
  s = '[\n  ["' + aIn[0][0] + '","' + aIn[0][1] + '",' +
    (aIn.length-1) + ',"' + fDateYMD() + '"],\n'
  for (var n = 1; n < aIn.length-1; n++) {
    s = s +'  ["' + aIn[n][0] + '","' + aIn[n][1] + '"],\n'
  }
  s = s + '  ["' + aIn[aIn.length-1][0] + '","' + aIn[aIn.length-1][1] + '"]\n'
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
function fWriteJson2Sync(sFilIn, aIn) {
  var
    s
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
 * finds key of object given value
 */
function fObjvalRKey(oIn, valIn) {
  return Object.keys(oIn).find(
    function(key) {
      return oIn[key] === valIn
    }
  )
}

/**
 * DOING: computes quantities of names
 */
function fComputeQName() {
  //oNamidxQ={lagEng00: 1101,lagEng01ei: 419,lagEng03si_1: 1038,lagEng03si_2_1: 6959}
  //the-set of namidx-files we computed
  var oSetNamidx = new Set()
  for (var sNmix in oNamidxQ) {
    //console.log('>>> compute: '+sNmix)
    var sNmix2 //the-reference-file lagEng03si_2_0

    // if namidx is a-child, we find its reference-parent
    if (sNmix.indexOf('_') > 0) {
      sNmix2 = sNmix.substring(0, sNmix.lastIndexOf('_')) +'_0' // lagEng03si_1 >> lagEng03si_0
    }
    if (sNmix.indexOf('_') === -1 && !oSetNamidx.has('root')) {
      //a namidx.root.json element
      oSetNamidx.add('root')
      fUpdate_from_oNamidxQ('dirNamidx/namidx.root.json')
    } else if (sNmix.indexOf('_') > 0 && !oSetNamidx.has(sNmix2)) {
      //sNmix2=lagEng03si_2_0
      oSetNamidx.add(sNmix2)
      fUpdate_from_oNamidxQ('dirNamidx/dirLag' + sNmix.substring(3,6)
        + '/namidx.' + sNmix2 + '.json')
    }
  }

  //update quantities in a-reference-namidx-file
  //and computes new sums
  function fUpdate_from_oNamidxQ(sNmixRefIn) {
    //read array of namidx of file
    //iterate over array and update oNamidxQ items
    //store new file
    //[";lagEng03si_2_0",";char",129181,"2018-07-29","codepoint order"],
    //["lagEng03si_2_1","char",6959],
    var
      aNi = JSON.parse(moFs.readFileSync(sNmixRefIn)),
      n,
      nSum = 0

    if (sNmixRefIn.indexOf('.root.json') === -1) {
      //console.log("update: " +sNmixRefIn)
      for (n = 1; n < aNi.length; n++) {
        //aNi=[["lagEng03si_2_1","char",1000]]
        //oNamidxQ= [lagEng03si_2_1:1000]]
        //if oNamidxQ contains info of aNi[n]
        if (!aNi[n][1].startsWith(';')) {
          //don't compute lag-sums twice ["lagEng",";English",145191],
          if (oNamidxQ[aNi[n][0]]) {
            aNi[n][2] = oNamidxQ[aNi[n][0]]
            nSum = nSum + aNi[n][2]
            oSetNamidx.add(aNi[n][0])
          } else {
            nSum = nSum + aNi[n][2]
          }
        }
      }
      aNi[0][2] = nSum
      aNi[0][3] = fDateYMD()
      fWriteJson2Sync(sNmixRefIn, aNi)
      fUpdate_from_child(sNmixRefIn, nSum)
    } else {
      // root file
      //console.log("update: root")
      var
        nLag = 1, // first lang
        nSumAll = 0

      // [";lagALL",";letter",0,"2018-09-11","per letter"],
      // ["lagEll",";Greek",1848],
      for (n = 2; n < aNi.length; n++) {
        if (!aNi[n][0].startsWith(';')) {
          if (new RegExp('^lag...$').test(aNi[n][0])) {
            nSumAll = nSumAll + nSum
            aNi[nLag][2] = nSum
            nSum = 0
            nLag = n
          } else if (oNamidxQ[aNi[n][0]]) {
            aNi[n][2] = oNamidxQ[aNi[n][0]]
            nSum = nSum + aNi[n][2]
            oSetNamidx.add(aNi[n][0])
          } else if (!oNamidxQ[aNi[n][0]]) {
            nSum = nSum + aNi[n][2]
          }
        }
      }
      nSumAll = nSumAll + nSum
      aNi[nLag][2] = nSum
      aNi[0][2] = nSumAll
      aNi[0][3] = fDateYMD()
      fWriteJson2Sync(sNmixRefIn, aNi)
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
        //["lagEng03si_0","C",130313],
        if (aPrnt_nmix[n][0] === sChld_nmix) {
          nPrnt_sum = nPrnt_sum + nChld_sumIn
          aPrnt_nmix[n][2] = nChld_sumIn
        } else {
          nPrnt_sum = nPrnt_sum + aPrnt_nmix[n][2]
        }
      }
      aPrnt_nmix[0][2] = nPrnt_sum //all sum
      aPrnt_nmix[0][3] = fDateYMD()
      fWriteJson2Sync(sPrnt_path, aPrnt_nmix)
      fUpdate_from_child(sPrnt_path, nPrnt_sum)
    } else {
      // parent is the-root-reference
      //console.log('update-child: root, ' +nChld_sumIn)
      var
        nAllSum = 0,
        nLagSum = 0, // sum of lag
        nLagIdx = 1 // index of lag

      sPrnt_path = 'dirNamidx/namidx.root.json'
      aPrnt_nmix = JSON.parse(moFs.readFileSync(sPrnt_path))
      for (n = 2; n < aPrnt_nmix.length; n++) {
        if (!aPrnt_nmix[n][0].startsWith(';')) {
          if (new RegExp('^lag...$').test(aPrnt_nmix[n][0])) {
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
      fWriteJson2Sync(sPrnt_path, aPrnt_nmix)
    }
  }
}

fComputeQName()

var aSftp = Array.from(oSetFileUp)
aSftp.sort()
console.log(aSftp)
fWriteJson2Sync('sftp.json', aSftp)

/**
 * DOING: computes the-quantity of Mcs of a-Mcs and updates the-cptqnt.json files with it
 * INPUT: the-name of a-Mcs[a] and the-quantity of Mcs of this[a] file.
 * OUTPUT: the-cptqnt-files affected 
 */
function fComputeQMcs(sMcsIn, nCptqntIn) {
  var
    aCptqnt,
    bMcs = false,
    nCptqntSum = 0,
    sDir = sMcsIn.substring(0, sMcsIn.lastIndexOf('/'))
    sCptqnt = sDir + '/cptqnt.json'

  aCptqnt = JSON.parse(moFs.readFileSync(sCptqnt))
  for (n = 1; n < aCptqnt.length; n++) {
    // [";dirLag",115,"2018-10-06"],
    // ["dirLag/filMcsChar.last.html",112],
    if (aCptqnt[n][0] === sMcsIn) {
      aCptqnt[n][1] = nCptqntIn
      nCptqntSum = nCptqntSum + nCptqntIn
      bMcs = true
    } else {
      nCptqntSum = nCptqntSum + aCptqnt[n][1]
    }
  }
  if (!bMcs) {
    aCptqnt.push([sMcsIn, nCptqntIn])
    nCptqntSum = nCptqntSum + nCptqntIn
  }
  aCptqnt[0] = [';'+sDir, nCptqntSum, fDateYMD()]
  aCptqnt.sort()
  fWriteJson2Sync(sCptqnt, aCptqnt)

  // update parents
  if (sDir.indexOf('/') === -1) {
    // parent = root
    fUpdate_root(sDir, nCptqntSum)
  } else {
    fComputeQMcs(sDir, nCptqntSum)
  }

  // update root file
  function fUpdate_root(sDfIn, nQIn) {
    var
      aCptqntRt,
      nCptqntRtSum = 0,
      sCptqntRt = 'cptqnt.root.json'

    aCptqntRt = JSON.parse(moFs.readFileSync(sCptqntRt))
    for (n = 1; n < aCptqntRt.length; n++) {
      // [";qntALL",179925,"2018-10-05"],
      // ["dirCor",10],
      if (aCptqntRt[n][0] === sDfIn) {
        aCptqntRt[n][1] = nQIn
        nCptqntRtSum = nCptqntRtSum + nQIn
      } else {
        nCptqntRtSum = nCptqntRtSum + aCptqntRt[n][1]
      }
    }
    aCptqntRt[0] = [';qntALL', nCptqntRtSum, fDateYMD()]
    fWriteJson2Sync(sCptqntRt, aCptqntRt)
  }
}
console.log(aCpt)

async function fQMcs(aIn) {
  for (const item of aIn) {
   await fComputeQMcs(item[0], item[1])
  }
}
fQMcs(aCpt)