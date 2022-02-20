/*
 * mWrdidx.mjs - module that creates word-indexes and uploads the-files
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (hmnSngo)
 * kaseluris.nikos@gmail.com
 * https://synagonism.net/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * DOING:
 *   it works as a-module AND stand-alone.
 *   1) it reads the-Wrdidx.txt, and creates the-word-concepts for the-words in.
 *   2) it name-indexes the-new files.
 * INPUT: Wrdidx.txt
 * OUTPUT: dirWrdidx/dirLang/McsWrdidxLangX.last.html, McsWrdidx_0.json, sftp.json,
 *
 * RUN: node Mcsmgr/mWrdidx.mjs pwd ALONE|ANYTHING
 *
 * PROBLEM:
 * - 
 *
 */

import moFs from 'fs';
import mfReadlines from 'n-readlines'; // npm install n-readlines
import {oSftp, fSftp} from './mSftp.mjs'
import * as moUtil from './mUtil.mjs'
import * as moLagElln from './mLagElln.js'

const
  // contains the-versions of mHitp.js 
  aVersion = [
    'mWrdidx.mjs.0-1-0.2022-02-08: created'
  ]

let
  aWordsInComments,
  aWordsIn = [],
  sMethod,
  bAlone = false

if (process.argv[2]) {
  oSftp.password = process.argv[2]
} else {
  console.log('type password after mWrdidx.mjs')
  process.exit()
}

if (process.argv[3]) {
  bAlone = true
} 

if (bAlone) {
  aWordsInComments = moFs.readFileSync('Wrdidx.txt').toString().split('\n')

  /**
   * find words and method to work on.
   */
  for (let n = 0; n < aWordsInComments.length; n++) {
    let sLn = aWordsInComments[n]

    // remove comments and empty-lines
    if (!sLn.startsWith('//') && sLn.length !== 0) {
      // remove comments after ;
      if (sLn.indexOf(';') > 0) {
        aWordsIn.push(sLn.substring(0,sLn.lastIndexOf(';')))
      } else {
        aWordsIn.push(sLn)
      }
    }
  }
  //the-first item is the-method
  sMethod = aWordsIn.shift()
}

/**
 * DOING: it stores word-info
 * INPUT:
 *    - asWordsIn: an array-of-words OR one word to index.
 *    - sMethodIn
 */
function fWrdidx(asWordsIn, sMethodIn) {
  let
    oNextln,
    oSetFileUp = new Set, 
    // files to upload, index, Mcs,
    // we use a-set, because we add same files and want unique.
    aWordsIn,
    // array with words to index
    sMethod = sMethodIn,
    sLag = sMethod.substring(4, 8),
    aRootWrdidx_Idx_Qntwrd = JSON.parse(moFs.readFileSync('dirWrdidx/McsWrdidx_0.json')),
    // [['McsWrdidxEngl01ei','A',1111]} with quantity of words
    oWrdidxMcs_Idx = {},
    // holds the-names of Wrdidx-files and the related indexes
    // {McsWrdidxEngl01ei:'A|a', McsWrdidxZhon024:'13312..14000'}
    oWrdidx_Qntwrd = {},
    // {McsWrdidxEngl01ei:222} the-quantities of word of Wrdidx-files
    sLn,
    n

  if (typeof asWordsIn === 'string') {
    aWordsIn = [asWordsIn]
  } else {
    aWordsIn = asWordsIn
  }

  if (aWordsIn.length > 0) {
    // first file we want to upload
    oSetFileUp.add('dirWrdidx/McsWrdidx_0.json');
  }

  /**
   * for EACH word in aWordsIn,
   * FINDS its Wrdidx-file
   * ADDS word-info
   * INPUT: sWordIn = 'ξαδέρφη-η/ksadhérfi-i/'
   */
  aWordsIn.forEach((sWordIn) => {
    let
      aWordinfo,
      sWord,
      aWrdidx,
      sWrdidxMcs,
      sWrdidxMcsFull,
      sIndex

    sWord = sWordIn
    console.log(sWord)
    aWrdidx = fFindWrdidxMcs(sWord, sLag, aRootWrdidx_Idx_Qntwrd)
    sWrdidxMcs = aWrdidx[0]
    sIndex = aWrdidx[1]
    console.log(sWrdidxMcs)

    sWrdidxMcsFull = 'dirWrdidx/dirLag' + sLag + '/' + sWrdidxMcs

    //create word-info
    //["ξαδέρφη-η","  <p id=="idWrdEllnksadhérfi-i"><span class="clsColorRed">ξαδέρφη-η/ksadhérfi-i/..."]
    aWordinfo = fCreateWordinfo(sWord, sMethod)
    console.log(aWordinfo)

    //add word-info
    if (moFs.existsSync(sWrdidxMcsFull)) {
      //add word-info
    } else {
      //create file and add word-info
      //fCreateWrdidxMcs(sWrdidxMcsFull, sIndex)
    }

    oSetFileUp.add(sWrdidxMcsFull)
  })

  /**
   * DOING: it creates an-array with word-info
   * INPUT:
   *  - sWordIn = 'ξαδέρφη-η/ksadhérfi-i/'
   *  - sMethodIn = caseEllnMnG2XiT2SeuNucF2Bo
   * OUTPUT: ["ξαδέρφη-η","  <p id="idWrdEllnksadhérfi-i"><span class="clsColorRed">ξαδέρφη-η/ksadhérfi-i/..."]
   */
  function fCreateWordinfo(sWordIn, sMethodIn) {
    let
      aWordinfo = [],
      sWord = sWordIn.substring(0, sWordIn.indexOf('/')), //ξαδέρφη-η
      sSpeech = sWordIn.substring(sWordIn.indexOf('/')+1, sWordIn.length-1), //ksadhérfi-i
      sMethod = sMethodIn,
      sLag = sMethod.substring(4, 8), //Elln
      sInfo,
      oCase

    aWordinfo[0] = sWord
    sInfo = '  p id="idWrd' + sLag + sSpeech + '">' +
      '<span classColorRed">' + sWordIn + '</span>::\n' +
      '    <br>* McsEngl.word' + sLag + '.' + sWordIn + '@word' + sLag + ',\n' +
      '    <br>* Mcs' + sLag + '.' + sWordIn + '@word' + sLag + ',\n'

    oCase = moLagElln.fFindCaseinfoElln(sWordIn, sMethod)
    console.log(oCase)

    aWordinfo[1] = sInfo
    return aWordinfo
  }

  /**
   * DOING: it creates McsWrdidx-file
   * INPTUT: sWiMcsFullIn='dirWrdidx/dirLagElln/McsWrdidxElln01alfa_1.last.html'
   */
  function fCreateWrdidxMcs(sWiMcsFullIn, sIndexIn) {
    let
      n,
      s,
      sName = sWiMcsFullIn.substring(sWiMcsFullIn.lastIndexOf('/')+1, sWiMcsFullIn.indexOf('.')),
      sFile = sName + '.last.html', //McsWrdidxElln01alfa_1.last.html
      sLag =  sWiMcsFullIn.substring(16, sWiMcsFullIn.lastIndexOf('/')), //Elln
      sId = sName.substring(9), //Elln01alfa_1
      aPages

    aPages = JSON.parse(moFs.readFileSync('../aPages.json'))
    s =
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '  <title>Mcs.' + sName + '-(0-1-0.' + moUtil.fDateYMD() + ') ' + sIndexIn + '</title>\n' +
      '  <meta name="keywords" content="' + sName + ', word' +sLag +', ModelConceptSensorial, McsHitp, Synagonism">\n' +
      '  <link rel="stylesheet" href="../../Mcsmgr/mHitp.css">\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '<header id="idHeader">\n' +
      '  <p></p>\n' +
      '  <h1 id="idHeaderH1">' + sName + ' - ' + sIndexIn + '\n' +
      '    <br>senso-concept-Mcs\n' +
      '    </h1>\n' +
      '  <p id="idHeadercrd">McsHitp-creation:: {' + moUtil.fDateYMD() + '}\n' +
      '    <a class="clsHide" href="#idHeadercrd"></a></p>\n' +
      '</header>\n' +
      '\n' +
      '<section id="idOverview">\n' +
      '  <h1 id="idOverviewH1">overview of ' + sName + '\n' +
      '    <a class="clsHide" href="#idOverviewH1"></a></h1>\n' +
      '  <p id="idDescription">description::\n' +
      '    <br>× quantity of words: \n' +
      '    <a class="clsHide" href="#idDescription"></a></p>\n' +
      '  <p id="idName">name::\n' +
      '    <br>* McsEngl.' + sName + ',\n' +
      '    <br>* McsEngl.wordary' + sLag +'\'' +sIndexIn +',\n' +
      '    <a class="clsHide" href="#idName"></a></p>\n' +
      '  <p id="idOverviewwtr">whole-tree-of-McsWrdidxElln01alfa::\n'
    if (sLag === 'Elln') {
      s = s +
      '    <br>* <a class="clsPreview" href="../../dirLag/McsLag000025.last.html#idOverview">wordaryElln</a>,\n'
    } else if (sLag === 'Engl') {
      s = s +
      '    <br>* <a class="clsPreview" href="../../dirLag/McsLag000024.last.html#idOverview">wordaryEngl</a>,\n'
    } else if (sLag === 'Zhon') {
      s = s +
      '    <br>* <a class="clsPreview" href="../../dirLag/McsLag000023.last.html#idOverview">wordaryZhon</a>,\n'
    } else {
      s = s +
      '    <br>* <a class="clsPreview" href="../../dirLag/McsLag00007.last.html#idLHmnmwrdIdx">wordary</a>,\n'
    }
    s = s +
      '    <a class="clsHide" href="#idOverviewwtr"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="idWrd' + sId + '">\n' +
      '  <h1 id="idWrd' + sId + 'H1">' + sIndexIn + ' of ' + sName + '\n' +
      '    <a class="clsHide" href="#idWrd' + sId + 'H1"></a></h1>\n' +
      '</section>\n' +
      '\n' +
      '<section id="idMeta">\n' +
      '  <h1 id="idMetaH1">meta-info\n' +
      '    <a class="clsHide" href="#idMetaH1"></a></h1>\n' +
      '  <p id="idMetaCounter" class="clsCenter">this page was-visited\n' +
      '    <span class="clsColorRed">\n' +
      '    <script src="../../../dirPgm/dirCntr/counter.php?page=' + sName + '"></script>\n' +
      '    </span>\n' +
      '    times since {' + moUtil.fDateYMD() + '}</p>\n' +
      '  <!-- the content of page-path paragraph is displayed as it is on top of toc -->\n' +
      '  <p id="idMetaWebpage_path"><span class="clsB clsColorGreen">page-wholepath</span>:\n' +
      '    <a class="clsPreview" href="../../../#idOverview">synagonism.net</a> /\n' +
      '    <a class="clsPreview" href="../../Mcs000000.last.html#idOverview">worldviewSngo</a> /\n' +
      '    dirWrdidx /\n' +
      '    dirLag' + sLag + ' /\n' +
      '    ' + sName + '\n' +
      '    </p>\n' +
      '  <p id="idMetaP1">SEARCH::\n' +
      '    <br>· this page uses \'<span class="clsColorRed">locator-names</span>\', names that when you find them, you find the-LOCATION of the-concept they denote.\n' +
      '    <br>⊛ <strong>GLOBAL-SEARCH</strong>:\n' +
      '    <br>· clicking on <span class="clsColorGreenBg">the-green-BAR of a-page</span> you have access to the-global--locator-names of my-site.\n' +
      '    <br>· use the-prefix \'<span class="clsColorRed">word' + sLag + '</span>\' for <a class="clsPreview" href="../dirCor/McsCor000002.last.html#idOverview">senso-concepts</a> related to current concept \'' + sName + '\'.\n' +
      '    <br>⊛ <strong>LOCAL-SEARCH</strong>:\n' +
      '    <br>· TYPE <span class="clsColorRed">CTRL+F "McsLang.words-of-concept\'s-name"</span>, to go to the-LOCATION of the-concept.\n' +
      '    <br>· a-preview of the-description of a-global-name makes reading fast.\n' +
      '    <a class="clsHide" href="#idMetaP1"></a></p>\n' +
      '  <p id="idFooterP1">footer::\n' +
      '    <br>• author: <a class="clsPreview" href="../../dirHmn/McsHmn000003.last.html#idOverview">Kaseluris.Nikos.1959</a>\n' +
      '    <br>• email:\n' +
      '    <br> &nbsp;<img src="../../../dirRsc/dirImg/mail.png">\n' +
      '    <br>• edit on github: https://github.com/synagonism/McsWorld/blob/master/dirMcs/' + sWiMcsFullIn + ',\n' +
      '    <br>• comments on <a class="clsPreview" href="../../dirLag/McsLag000015.last.html#idOverview">Disqus</a>,\n' +
      '    <br>• twitter: <a href="https://twitter.com/synagonism">@synagonism</a>,\n' +
      '    <a class="clsHide" href="#idFooterP1"></a></p>\n' +
      '  <p id="idMetaVersion">webpage-versions::\n' +
      '    <br>• version.last.dynamic: <a lass="clsPreview" href="' + sFile + '">' + sFile + '</a>,\n' +
      '    <br>• version.draft.creation: ' + sName + '.0-1-0.' + moUtil.fDateYMD() + '.last.html,\n' +
      '    <a class="clsHide" href="#idMetaVersion"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="idSupport">\n' +
      '  <h1 id="idSupportH1">support (<a class="clsPreview" href="../../../#idSupport">link</a>)</h1>\n' +
      '  <p></p>\n' +
      '  <!--                              -->\n' +
      '</section>\n' +
      '\n' +
      '<script type="module">\n' +
      '  import * as oHitp from \'../../Mcsmgr/mHitp.js\'' +
      '</script>\n' +
      '</body>\n' +
      '</html>'
    moFs.writeFileSync(sWiMcsFullIn, s)
    moFs.writeFileSync('../dirPgm/dirCntr/dirCntrfiles/' + sName + '.txt', '1')
    aPages.push([sName+'.txt', sIndexIn])
    moUtil.fSortAArray(aPages)
    moUtil.fWriteJsonArray('../aPages.json', aPages)
    oSetFileUp.add('../dirPgm/dirCntr/dirCntrfiles/' + sName + '.txt')
    oSetFileUp.add('../aPages.json')
  }

  /**
   * DOING: it stores a-word in a-Wrdidx-file
   * INPUT:
   *    - sWrdidxIn: McsWrdidxZhon05, McsWrdidxEngl19es_0
   *    - sWordIn: 'νύφη/nífi/'
   *    - sLagIn: 'Elln'
   */
  function fStoreNamUrlNamidx(sWrdidxIn, sWordIn, sLagIn) {
    //console.log(sWrdidxIn+', '+sWordIn[0])
    if (!sWrdidxIn.endsWith('_0')) {
      // Wrdidx is NOT a-reference
      if (oFileIdx_ANamUrl[sWrdidxIn]) {
        oFileIdx_ANamUrl[sWrdidxIn].push(sWordIn)
      } else {
        oFileIdx_ANamUrl[sWrdidxIn] = []
        oFileIdx_ANamUrl[sWrdidxIn].push(sWordIn)
      }
    } else {
      // McsWrdidxEngl19es_0 is a-reference
      let aNi = JSON.parse(moFs.readFileSync('dirWrdidx/dirLag' + sLagIn
        +'/' +sWrdidxIn +'.json'))
      fStoreNamUrlReference(aNi, sWordIn, sLagIn)
    }
  }

  /**
   * DOING:
   *   stores one name-Url in oFileIdx_ANamUrl
   *   using Unicode-code-points order
   * INPUT:
   * - aWrdidxRefIn: an-array of a-reference-Wrdidx-file
   * [
   *   [";McsWrdidxEngl03si_0","C|c",167556,"2021-11-07","codepoint order"],
   *   ["McsWrdidxEngl03si_1","C..char",2178],
   *   ["McsWrdidxEngl03si_2_0","char..chas",163164],
   *   ["McsWrdidxEngl03si_3","chas..D",2214]
   * ]
   * - sWordIn: 'name'
   */
  function fStoreNamUrlReference(aWrdidxRefIn, sWordIn, sLagIn) {
    // a-reference-Wrdidx-file ALWAYS contains sequencies (..) of indexes
    //console.log(sWordIn[0]+':   '+aWrdidxRefIn[0])
    for (n = 1; n < aWrdidxRefIn.length; n++) {
      //console.log(sWordIn[0]+':   '+aWrdidxRefIn[n][1])
      let
        sIdxCrnt = aWrdidxRefIn[n][1].split('..')[0],
        sIdxNext = aWrdidxRefIn[n][1].split('..')[1]

      // PROBLEM with supplementary-chars on reference-Wrdidx-files 
      if (sWordIn[0] >= sIdxCrnt && sWordIn[0] < sIdxNext) {
        //console.log(sWordIn[0]+', '+aWrdidxRefIn[n][1])
        // if Wrdidx-file is NOT a-reference, store name-Url
        if (!aWrdidxRefIn[n][0].endsWith('_0')) {
          if (oFileIdx_ANamUrl[aWrdidxRefIn[n][0]]) {
            oFileIdx_ANamUrl[aWrdidxRefIn[n][0]].push(sWordIn)
          } else {
            oFileIdx_ANamUrl[aWrdidxRefIn[n][0]] = []
            oFileIdx_ANamUrl[aWrdidxRefIn[n][0]].push(sWordIn)
          }
        } else {
          // Wrdidx-file is a-reference
          let aNi = JSON.parse(moFs.readFileSync('dirWrdidx/dirLag' + sLagIn
              +'/' +aWrdidxRefIn[n][0] +'.json'))
          fStoreNamUrlReference(aNi, sWordIn, sLagIn)
        }
        break
      }
    }
  }

  /**
   * DOING: it finds the-index of a-given Wrdidx-file.
   */
  function fFindIndex(sWrdidxIn) {
    let
      sIdx = '',
      sFileIdxFull,
      sLag = sWrdidxIn.substring(3, 7),
      sFile,
      aRef

    if (sWrdidxIn.indexOf('_') < 0) {
      // search root
      sIdx = fFindIdxArray(aRootWrdidx_Idx_Qntwrd)
    } else if (sWrdidxIn.endsWith('_0')) {
      // McsWrdidxEngl03si_0 search McsWrdidxEngl03si
      // McsWrdidxEngl03si_2_0 search McsWrdidxEngl03si_0
      sFile = sWrdidxIn.substring(0, sWrdidxIn.lastIndexOf('_'))
      if (sFile.indexOf('_') < 0) {
        sIdx = fFindIdxArray(aRootWrdidx_Idx_Qntwrd)
      } else {
        sFile = sFile.substring(0, sFile.lastIndexOf('_'))
        sFileIdxFull = 'dirWrdidx/dirLag'+sLag +'/namidx.' +sFile +'_0.json'
        aRef = JSON.parse(moFs.readFileSync(sFileIdxFull))
        sIdx = fFindIdxArray(aRef)
      }
    } else {
      // McsWrdidxEngl03si_2_14 search McsWrdidxEngl03si_2_0
      sFile = sWrdidxIn.substring(0, sWrdidxIn.lastIndexOf('_'))
      sFileIdxFull = 'dirWrdidx/dirLag'+sLag +'/namidx.' +sFile +'_0.json'
      aRef = JSON.parse(moFs.readFileSync(sFileIdxFull))
      sIdx = fFindIdxArray(aRef)
    }

    function fFindIdxArray (aFileIdx) {
      for (n = 1; n < aFileIdx.length; n++) {
        if (aFileIdx[n][0] === sWrdidxIn) {
          // we found idxfile
          sIdx = aFileIdx[n][1]
          break
        }
      }
      return sIdx
    }
    return sIdx
  }

  /**
   * DOING: creates json-file from array.
   *   Each element in the-array is another array
   *   with name and url elements.
   *   on the-first element updates the-quantity of names and the-date.
   * INPUT:
   *   - sFilIn the-Wrdidx-file we want to create
   *   - aIn the-array of the-name-Url-arrays to include,
   */
  function fWriteJsonQntDate(sFilIn, aIn) {
    let
      s

    // aIn[0] = [";McsWrdidxEngl01ei",";A..B",419,"2018-08-04"],
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
   * DOING: it computes quantities of names
   */
  function fComputeQntName() {
    // oWrdidx_Qntwrd={McsWrdidxEngl00: 1101,McsWrdidxEngl01ei: 419,McsWrdidxEngl03si_1: 1038,McsWrdidxEngl03si_2_1: 6959}
    // the-set of Wrdidx-files we computed
    let oSetNamidxComputed = new Set()

    for (let sWrdidx in oWrdidx_Qntwrd) {
      //console.log('>>> compute: '+sWrdidx)
      let sFileIdxRef // the-reference-file McsWrdidxEngl03si_2_0

      // if Wrdidx is a-child, we find its reference-parent
      if (sWrdidx.indexOf('_') > 0) {
        // McsWrdidxEngl03si_1 >> McsWrdidxEngl03si_0
        sFileIdxRef = sWrdidx.substring(0, sWrdidx.lastIndexOf('_')) +'_0'
      }

      if (sWrdidx.indexOf('_') === -1 && !oSetNamidxComputed.has('lagRoot')) {
        // a namidx.lagRoot.json element
        oSetNamidxComputed.add('lagRoot')
        fUpdate_from_oFileIdxQ('dirWrdidx/McsWrdidx_0.json')
      } else if (sWrdidx.indexOf('_') > 0 && !oSetNamidxComputed.has(sFileIdxRef)) {
        // sFileIdxRef=McsWrdidxEngl03si_2_0
        oSetNamidxComputed.add(sFileIdxRef)
        fUpdate_from_oFileIdxQ('dirWrdidx/dirLag' + sWrdidx.substring(3,7)
          + '/namidx.' + sFileIdxRef + '.json')
      }
    }

    // update quantities in a-reference-Wrdidx-file
    // and computes new sums
    function fUpdate_from_oFileIdxQ(sFileIdxRefIn) {
      // read array of Wrdidx-file
      // iterate over array and update oWrdidx_Qntwrd items
      // store new file
      // [";McsWrdidxEngl03si_2_0",";char",129181,"2018-07-29","codepoint order"],
      // ["McsWrdidxEngl03si_2_1","char",6959],
      let
        aNi = JSON.parse(moFs.readFileSync(sFileIdxRefIn)),
        n,
        nSum = 0

      if (sFileIdxRefIn.indexOf('.lagRoot.json') === -1) {
        //console.log("update: " +sFileIdxRefIn)
        for (n = 1; n < aNi.length; n++) {
          // aNi=[["McsWrdidxEngl03si_2_1","char",1000]]
          // oWrdidx_Qntwrd= [McsWrdidxEngl03si_2_1:1000]]
          // if oWrdidx_Qntwrd contains info of aNi[n]
          if (!aNi[n][0].startsWith(';')) {
            // don't compute lag-sums twice [";McsWrdidxEngl","English",145191],
            if (oWrdidx_Qntwrd[aNi[n][0]]) {
              aNi[n][2] = oWrdidx_Qntwrd[aNi[n][0]]
              nSum = nSum + aNi[n][2]
              oSetNamidxComputed.add(aNi[n][0])
            } else {
              nSum = nSum + aNi[n][2]
            }
          }
        }
        aNi[0][2] = nSum
        aNi[0][3] = fDateYMD()
        moUtil.fWriteJsonArray(sFileIdxRefIn, aNi)
        fUpdate_from_child(sFileIdxRefIn, nSum)
      } else {
        // lagRoot Wrdidx-file
        let
          nLag = 1, // first lang index
          nSumAGGR = 0

        nSum = 0
        // [";AGGR","char",0,"2018-09-11","root chars"],
        // [";McsWrdidxElln","Greek",1848],
        for (n = 2; n < aNi.length; n++) {
          // ["McsWrdidxElln01alfa","Α",258],
          if (new RegExp('^;lag....$').test(aNi[n][0])) {
            // on new lag reset nSum
            nSumAGGR = nSumAGGR + nSum
            aNi[nLag][2] = nSum
            nSum = 0
            nLag = n
          } else if (oWrdidx_Qntwrd[aNi[n][0]] >= 0) {
            aNi[n][2] = oWrdidx_Qntwrd[aNi[n][0]]
            nSum = nSum + aNi[n][2]
            oSetNamidxComputed.add(aNi[n][0])
          } else if (!oWrdidx_Qntwrd[aNi[n][0]]) {
            nSum = nSum + aNi[n][2]
          }
        }
        nSumAGGR = nSumAGGR + nSum
        aNi[nLag][2] = nSum
        aNi[0][2] = nSumAGGR
        aNi[0][3] = fDateYMD()
        moUtil.fWriteJsonArray(sFileIdxRefIn, aNi)
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
        //console.log('update-child: ' +sPrnt_path +', ' +nChld_sumIn)
        aPrnt_nmix = JSON.parse(moFs.readFileSync(sPrnt_path))
        for (n = 1; n < aPrnt_nmix.length; n++) {
          // ["McsWrdidxEngl03si_0","C",130313],
          if (aPrnt_nmix[n][0] === sChld_nmix) {
            nPrnt_sum = nPrnt_sum + nChld_sumIn
            aPrnt_nmix[n][2] = nChld_sumIn
          } else {
            nPrnt_sum = nPrnt_sum + aPrnt_nmix[n][2]
          }
        }
        aPrnt_nmix[0][2] = nPrnt_sum // all sum
        aPrnt_nmix[0][3] = fDateYMD()
        moUtil.fWriteJsonArray(sPrnt_path, aPrnt_nmix)
        fUpdate_from_child(sPrnt_path, nPrnt_sum)
      } else {
        // parent is the-root-reference
        //console.log('update-child: root, ' +nChld_sumIn)
        let
          nAllSum = 0,
          nLagSum = 0, // sum of lag
          nLagIdx = 1 // index of lag

        sPrnt_path = 'dirWrdidx/McsWrdidx_0.json'
        aPrnt_nmix = JSON.parse(moFs.readFileSync(sPrnt_path))
        for (n = 2; n < aPrnt_nmix.length; n++) {
          if (new RegExp('^;lag....$').test(aPrnt_nmix[n][0])) {
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
        nAllSum = nAllSum + nLagSum
        aPrnt_nmix[nLagIdx][2] = nLagSum
        aPrnt_nmix[0][2] = nAllSum
        aPrnt_nmix[0][3] = fDateYMD()
        moUtil.fWriteJsonArray(sPrnt_path, aPrnt_nmix)
      }
    }
  }
  /*
  fComputeQntName()

  // write the-files to upload
  let aSftp = Array.from(oSetFileUp)
  aSftp.sort()
  console.log(aSftp)
  moUtil.fWriteJsonArray('sftp.json', aSftp)

  //call
  if (fSftpIn) fSftpIn()
  */
}
fWrdidx(aWordsIn, sMethod)

/**
 * DOING: creates object {Wrdidx: index} from [[Wrdidx,idx,quantity]]
 * INPUT: aIn = [['McsWrdidxEngl01ei','A',1234]]
 * OUTPUT: {McsWrdidxEngl01ei:'A'}
 */
function fCreateOWrdidxMcs_Index(aIn) {
  let
    n,
    oOut = {}
  for (n = 0; n < aIn.length; n++) {
    if (!aIn[n][1].startsWith(';')) {
      // remove non index info
      oOut[aIn[n][0]] = aIn[n][1]
    }
  }
  return oOut
}

/**
 * DOING: it finds the-Wrdidx-file to store a-word
 * INPUT:
 *  - sWordIn: 'νύφη/nífi/'
 *  - sLagIn: 'Elln'
 *  - aWrdidxIdxIn: [['McsWrdidxX','X']]
 * OUTPUT: ['McsWrdidxEngl18ar.last.html', 'R|r']
 */
function fFindWrdidxMcs(sWordIn, sLagIn, aWrdidxIdxIn) {
  let
    aWrdidxMcs_Idx, // the-output WrdidxMcs-index info
    bRest = true,
    // if first-char of name NOT in an-index in the-lag, then it is a-charREST in this lag
    sCharWord,    // the-first char of name
    sIndex,       // the-chars-of-index in the-Wrdidx-file
    sIdxCrnt,
    sIdxNext,
    sWrdidx,      // name of Wrdidx-file on which to store the-word
    sWrdidxOut,
    nCharWord,
    nIdxCrnt,
    nIdxNext,
    oWrdidxMcs_Idx,
    sWrdidxRefFull,
    aRef

  // FIND Wrdidx-file
  // choose root-char or rest
  sCharWord = sWordIn[0].substring(0,1)
  oWrdidxMcs_Idx = fCreateOWrdidxMcs_Index(aWrdidxIdxIn)

  for (sWrdidx in oWrdidxMcs_Idx) {
    if (sWrdidx.startsWith('McsWrdidx'+sLagIn)) {
      sIndex = oWrdidxMcs_Idx[sWrdidx]

      if (sIndex.indexOf('..') < 0) {
        // index is a-set of chars 'B|b|'
        if (sIndex.indexOf(sCharWord) >= 0) {
          // found Wrdidx-file
          bRest = false 
          sWrdidxOut = sWrdidx +'.last.html'
          aWrdidxMcs_Idx = [sWrdidxOut, sIndex]
          break
        }
      } else {
        // index is a-sequence of chars 'C..D'
        let a = sIndex.split('..')
        sIdxCrnt = a[0]
        sIdxNext = a[1]
        //compare codepoints
        nCharWord = sCharWord.codePointAt()
        // if srch-char is a-supplement with surrogates (high 55296–56319), find it
        if (nCharWord >= 55296 && nCharWord <= 56319) {
          let sSupplement = String.fromCodePoint(sWordIn[0].charAt(0).charCodeAt(0),
                                                 sWordIn[0].charAt(1).charCodeAt(0))
          nCharWord = sSupplement.codePointAt()
        }
        if (!Number.isInteger(Number(sIdxCrnt))) {
          // it is char
          nIdxCrnt = sIdxCrnt.codePointAt()
        } else {
          // it is number
          nIdxCrnt = Number(sIdxCrnt)
        }
        if (!Number.isInteger(Number(sIdxNext))) {
          nIdxNext = sIdxNext.codePointAt()
        } else {
          nIdxNext = Number(sIdxNext)
        }
        //console.log(nIdxCrnt+', '+nIdxNext)
        if (nCharWord >= nIdxCrnt && nCharWord < nIdxNext) {
          // found Wrdidx-file
          bRest = false 
          sWrdidxOut = sWrdidx +'.last.html'
          aWrdidxMcs_Idx = [sWrdidxOut, sIndex]
          break
        }
      }
    }
  }
  if (bRest) {
    sWrdidxOut = 'McsWrdidx' + sLagIn + '00.last.html'
    aWrdidxMcs_Idx = [sWrdidxOut, '']
  }

  if (!sWrdidxOut.endsWith('_0')) {
    return aWrdidxMcs_Idx 
  } else {
    sWrdidxRefFull = 'dirWrdidx/dirLag'+sLagIn +'/' +sWrdidxOut +'.json'
    aRef = JSON.parse(moFs.readFileSync(sWrdidxRefFull))
    return fFindWrdidxMcs(sWordIn, sLagIn, aRef)
  }
}

/*
// IF run alone
if (bAlone) {
  // create name-indices 
  fWrdidx(aWordsIn)
  //upload files
  fSftp()
}
*/

export {fWrdidx}