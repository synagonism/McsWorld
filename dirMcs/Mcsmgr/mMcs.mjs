/*
 * mMcs.mjs - it creates a-new file McsHitp-senso-concept
 * The MIT License (MIT)
 *
 * Copyright (c) 2017-2021 Kaseluris.Nikos.1959 (hmnSngo)
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
 * DOING: it creates a-new file senso-concept McsDir000000.last.html
 *     - updates aPages.json
 *     - creates McsDir000000.txt
 *     - indexes new file
 *     - uploads new and modified files
 * INPUT:
 * OUTPUT: McsDir000000.last.html
 * RUN: node Mcsmgr/mMcs.mjs pwd
 *
 * ISSUE: IF you want to recreate the-file, you have to delete IT from aPages.json
 */

import moFs from 'fs'
import * as moUtil from './mUtil.mjs'
import {fNamidx} from './mNamidx.mjs'
import {fSftp} from './mSftp.mjs'

const
  // contains the-versions of mHitp.js 
  aVersion = [
    'mMcs.mjs.1-0-0.2021-12-12: ',
    'version.0-15-0.2021-08-04: module rename from js-mcsAdd3.js',
    'version.0-14-2.2020-12-04: no-steemit',
    'version.0-14-1.2020-11-28: Infrsc',
    'version.0-14-0.2020-07-05: hitp-files-local',
    'version.0-13-0.2020-04-06: structure-doing',
    'version.0-12-0.2020-02-19: whole-part-generic-tree',
    'version.0-11-1.2020-02-19: whole-part-generic-tree',
    'version.0-11-0.2020-01-12: versions',
    'version.0-10-0.2019-12-28: generic-whole-trees',
    'version.0-9-0.2019-12-25: whole-att',
    'version.0-8-0.2019-12-23: entity-link',
    'version.0-7-0.2019-09-06: comments on filMcsDirNam',
    'version.0-6-4.2019-08-09: github',
    'version.0-6-3.2019-07-30: idOverview',
    'version.0-6-2.2019-06-29: misc',
    'version.0-6-1.2019-05-05: misc',
    'version.0-6-0.2018-06-29: disqus-dir',
    'version.0-5-1.2018-03-17: filMcs',
    'version.0-5-0.2018-02-18: steemit',
    'version.0-4-0.2018-01-14: lower-case',
    'version.0-3-0.2017-12-10: NameFileIdShort',
    'version.0-2-1.2017-11-26: cpt.FilMcsId.last.html',
    'version.0-1-3.2017-11-17: idHeadercrd',
    'version.0-1-1.2017-09-27',
    'version.0-1-0.2017-06-27'
  ]

let
  n,
  s,

  //// INPUT VALUES ////
  //1. Add counter or not
  bCounter = true,

  //2. Directory of the-concept dirCor|dirEdu|dirHlth|dirHmn|dirLag|dirNtr|
  //   dirOgm|dirStn|dirStnlaw|dirTch|dirTchCpgm|dirTchInf
  sDir = 'dirStn',
  sDirShort = 'Stn',
  
  //3. Name of the-title: Ethereum--blockchain-net
  sName = 'service-oznProduction',
  //4. SHORT-name: sysNet, ogn, DnChain, DnEth, Dchain-net, lagKmo,
  sNameShort = 'oznService',

  //5. FILE-name: 
  sNameFile = '',
  sNameFileNaked = '',
  //6. Name for IDs eg Dtc, unique in this file: Net,
  sNameId = 'OznSvc',
  aPages,
  nFile = 0

aPages = JSON.parse(moFs.readFileSync('../aPages.json'))

// find file-name
for (n = 0; n < aPages.length; n++) {
  if (new RegExp('^Mcs'+sDirShort+'[0-9]').test(aPages[n][0])) nFile = nFile + 1
}
// first file-number 000000
sNameFileNaked = 'Mcs' + sDirShort + nFile.toString().padStart(6, '0')
sNameFile = sNameFileNaked + '.last.html'

s =
  '<!DOCTYPE html>\n' +
  '<html>\n' +
  '<head>\n' +
  '  <meta charset="utf-8">\n' +
  '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '  <title>Mcs.' + sNameShort + '-(0-1-0.' + moUtil.fDateYMD() + ' draft) ' + sName + '</title>\n' +
  '  <meta name="keywords" content="' + sName + ', ' + sNameShort + ', ModelConceptSensorial, McsHitp, Synagonism">\n' +
  '  <link rel="stylesheet" href="../Mcsmgr/mHitp.css">\n' +
  '</head>\n' +
  '\n' +
  '<body>\n' +
  '<header id="idHeader">\n' +
  '  <p></p>\n' +
  '  <h1 id="idHeaderH1">' + sName + ' senso-concept-Mcs\n' +
  '    <br>(' + sNameShort + ')\n' +
  '    </h1>\n' +
  '  <p id="idHeadercrd">McsHitp-creation:: {' + moUtil.fDateYMD() + '}\n' +
  '    <a class="clsHide" href="#idHeadercrd"></a></p>\n' +
  '</header>\n' +
  '\n' +
  '<section id="idOverview">\n' +
  '  <h1 id="idOverviewH1">overview of ' + sNameShort + '\n' +
  '    <a class="clsHide" href="#idOverviewH1"></a></h1>\n' +
  '  <p id="idDescription">description::\n' +
  '    <br>· \n' +
  '    <a class="clsHide" href="#idDescription"></a></p>\n' +
  '  <p id="idName">name::\n' +
  '    <br>* McsEngl.' + sNameFile + '//' + sDir + '//dirMcs!⇒' + sNameShort + ',\n' +
  '    <br>* McsEngl.' + sDir +'/' + sNameFile + '!⇒' + sNameShort + ',\n' +
  '    <br>* McsEngl.' + sName + '!⇒' + sNameShort + ',\n' +
  '    <br>* McsEngl.' + sNameShort + ',\n' +
  '    <br>* McsEngl.' + sNameShort + '\'(' + sName + ')' + '!⇒' + sNameShort + ',\n' +
  '    <a class="clsHide" href="#idName"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNameId + 'rscF">\n' +
  '  <h1 id="id' + sNameId + 'rscFH1">info-resource of ' + sNameShort + '\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'rscFH1"></a></h1>\n' +
  '  <p id="id' + sNameId + 'rscnam">name::\n' +
  '    <br>* Mcs.' + sNameShort + '\'Infrsc,\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'rscnam"></a></p>\n' +
  '  <p id="id' + sNameId + 'rscwpa">addressWpg::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNameId + 'rscwpa"></a></p>\n' +
  '</section>\n' +
  //'\n' +
  //'<section id="id' + sNameId + 'srtrF">\n' +
  //'  <h1 id="id' + sNameId + 'srtrFH1">structure of ' + sNameShort + '\n' +
  //'    <a class="clsHide" href="#id' + sNameId + 'srtrFH1"></a></h1>\n' +
  //'  <p id="id' + sNameId + 'srtrnam">name::\n' +
  //'    <br>* Mcs.' + sNameShort + '\'structure,\n' +
  //'    <a class="clsHide" href="#id' + sNameId + 'srtrnam"></a></p>\n' +
  //'  <p id="id' + sNameId + 'srtrdsn">description::\n' +
  //'    <br>* \n' +
  //'    <a class="clsHide" href="#id' + sNameId + 'srtrdsn"></a></p>\n' +
  //'</section>\n' +
  '\n' +
  '<section id="id' + sNameId + 'dngF">\n' +
  '  <h1 id="id' + sNameId + 'dngFH1">DOING of ' + sNameShort + '\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'dngFH1"></a></h1>\n' +
  '  <p id="id' + sNameId + 'dngnam">name::\n' +
  '    <br>* Mcs.' + sNameShort + '\'doing,\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'dngnam"></a></p>\n' +
  '  <p id="id' + sNameId + 'dngdsn">description::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNameId + 'dngdsn"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNameId + 'evgF">\n' +
  '  <h1 id="id' + sNameId + 'evgFH1">evoluting of ' + sNameShort + '\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'evgFH1"></a></h1>\n' +
  '  <p id="id' + sNameId + 'evgnam">name::\n' +
  '    <br>* Mcs.' + sNameShort + '\'evoluting,\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'evgnam"></a></p>\n' +
  '  <p id="id' + sNameId + 'evg' + moUtil.fDateYMD2() + '">{' + moUtil.fDateYMD() + '}::\n' +
  '    <br>=== McsHitp-creation:\n';
if (sDir === 'dirTchInf') {
  s = s +
  '    <br>· creation of current <a class="clsPreview" href="McsTchInf000009.last.html#idMcsHitp">concept</a>.\n'
} else {
  s = s +
  '    <br>· creation of current <a class="clsPreview" href="../dirTchInf/McsTchInf000009.last.html#idMcsHitp">concept</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNameId + 'evg' + moUtil.fDateYMD2() + '"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNameId + 'wptF">\n' +
  '  <h1 id="id' + sNameId + 'wptFH1">WHOLE-PART-TREE of ' + sNameShort + '\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'whlFH1"></a></h1>\n' +
  '  <p id="id' + sNameId + 'wptnam">name::\n' +
  '    <br>* Mcs.' + sNameShort + '\'whole-part-tree,\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'wptnam"></a></p>\n' +
  '  <p id="id' + sNameId + 'wtr">whole-tree-of-' + sNameShort + '::\n' +
  '    <br>* \n' +
  '    <br>* ... ';
if (sDir === 'dirCor') {
  s = s +
  '<a class="clsPreview" href="McsCor000003.last.html#idEntwtr">Sympan</a>.\n'
} else {
  s = s +
  '<a class="clsPreview" href="../dirCor/McsCor000003.last.html#idEntwtr">Sympan</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNameId + 'wtr"></a></p>\n' +
  '  <p id="id' + sNameId + 'ptr">part-tree-of-' + sNameShort + '::\n' +
  '    <br>*\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'ptr"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNameId + 'gstF">\n' +
  '  <h1 id="id' + sNameId + 'gstFH1">GENERIC-SPECIFIC-TREE of ' + sNameShort + '\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'gstFH1"></a></h1>\n' +
  '  <p id="id' + sNameId + 'gstnam">name::\n' +
  '    <br>* Mcs.' + sNameShort + '\'generic-specific-tree,\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'gstnam"></a></p>\n' +
  '  <p id="id' + sNameId + 'gtr">generic-tree-of-' + sNameShort + '::\n' +
  '    <br>* ,\n' +
  '    <br>* ... ';
if (sDir === 'dirCor') {
  s = s +
  '<a class="clsPreview" href="McsCor000003.last.html#idOverview">entity</a>.\n'
} else {
  s = s +
  '<a class="clsPreview" href="../dirCor/McsCor000003.last.html#idOverview">entity</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNameId + 'gtr"></a></p>\n' +
  '  <p id="id' + sNameId + 'str">specific-tree-of-' + sNameShort + '::\n' +
  '    <br>* ,\n' +
  '    <a class="clsHide" href="#id' + sNameId + 'str"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="idMeta">\n' +
  '  <h1 id="idMetaH1">meta-info\n' +
  '    <a class="clsHide" href="#idMetaH1"></a></h1>\n';
if (bCounter) {
  s = s +
  '  <p id="idMetaCounter" class="clsCenter">this page was-visited\n' +
  '    <span class="clsColorRed">\n' +
  '    <script src="../../dirPgm/dirCntr/counter.php?page='
         + sNameFileNaked + '"></script>\n' +
  '    </span>\n' +
  '    times since {' + moUtil.fDateYMD() + '}</p>\n';
}
s = s +
  '  <!-- the content of page-path paragraph is displayed as it is on top of toc -->\n' +
  '  <p id="idMetaWebpage_path"><span class="clsB clsColorGreen">page-wholepath</span>:\n' +
  '    <a class="clsPreview" href="../../#idOverview">synagonism.net</a> /\n' +
  '    <a class="clsPreview" href="../Mcs000000.last.html#idOverview">worldviewSngo</a> /\n' +
  '    <a class="clsPreview" href="Mcs' + sDirShort + '000000.last.html#idOverview">' + sDir + '</a> /\n' +
  '    ' + sNameShort + '\n' +
  '    </p>\n' +
  '  <p id="idMetaP1">SEARCH::\n' +
  '    <br>· this page uses \'<span class="clsColorRed">locator-names</span>\', names that when you find them, you find the-LOCATION of the-concept they denote.\n' +
  '    <br>⊛ <strong>GLOBAL-SEARCH</strong>:\n' +
  '    <br>· clicking on <span class="clsColorGreenBg">the-green-BAR of a-page</span> you have access to the-global--locator-names of my-site.\n' +
  '    <br>· use the-prefix \'<span class="clsColorRed">' + sNameShort + '</span>\' for <a class="clsPreview" href="../dirCor/filMcs.last.html#idOverview">sensorial-concepts</a> related to current concept \'' + sName + '\'.\n' +
  '    <br>⊛ <strong>LOCAL-SEARCH</strong>:\n' +
  '    <br>· TYPE <span class="clsColorRed">CTRL+F "McsLang.words-of-concept\'s-name"</span>, to go to the-LOCATION of the-concept.\n' +
  '    <br>· a-preview of the-description of a-global-name makes reading fast.\n' +
  '    <a class="clsHide" href="#idMetaP1"></a></p>\n' +
  '  <p id="idFooterP1">footer::\n' +
  '    <br>• author: <a class="clsPreview" href="../dirHmn/McsHmn000003.last.html#idOverview">Kaseluris.Nikos.1959</a>\n' +
  '    <br>• email:\n' +
  '    <br> &nbsp;<img src="../../dirRsc/dirImg/mail.png">\n' +
  '    <br>• edit on github: https://github.com/synagonism/McsWorld/blob/master/dirMcs/' + sDir +'/' + sNameFile + ',\n' +
  '    <br>• comments on <a class="clsPreview" href="Mcs' + sDirShort + '000000.last.html#idComment">Disqus</a>,\n' +
  '    <br>• twitter: <a href="https://twitter.com/synagonism">@synagonism</a>,\n' +
  '    <a class="clsHide" href="#idFooterP1"></a></p>\n' +
  '  <!--                              -->\n' +
  '  <p id="idMetaVersion">webpage-versions::\n' +
  '    <br>• version.last.dynamic: <a lass="clsPreview" href="' + sNameFile + '">' + sNameFile + '</a>,\n' +
  '    <br>• version.draft.creation: ' + sNameFileNaked + '.0-1-0.' + moUtil.fDateYMD() + '.last.html,\n' +
  '    <a class="clsHide" href="#idMetaVersion"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="idSupport">\n' +
  '  <h1 id="idSupportH1">support (<a class="clsPreview" href="../../#idSupport">link</a>)</h1>\n' +
  '  <p></p>\n' +
  '</section>\n' +
  '\n' +
  '<script type="module">\n' +
  '  import * as oHitp from \'../Mcsmgr/mHitp.js\'' +
  '</script>\n' +
  '<script>\n' +
  '  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n' +
  '  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
  '  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
  '  })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n' +
  '  ga(\'create\', \'UA-19285371-5\', \'synagonism.net\');\n' +
  '  ga(\'send\', \'pageview\');\n' +
  '</script>\n' +
  '</body>\n' +
  '</html>';

moFs.writeFileSync(sDir + '/' + sNameFile, s)

if (bCounter) {
  moFs.writeFileSync('../dirPgm/dirCntr/dirCntrfiles/' + sNameFileNaked + '.txt', '1');
}

// add file to aPages
aPages.push([sNameFileNaked+'.txt', sName])
aPages.sort((aA, aB) => {
  return aA[0] > aB[0] ? 1 : -1
})
moUtil.fWriteJsonArray('../aPages.json', aPages)

// index new file
fNamidx(sDir + '/' + sNameFile)

//add extra files to upload
let aSftp = JSON.parse(moFs.readFileSync('./sftp.json'))
aSftp.push('../aPages.json')
aSftp.push('../dirPgm/dirCntr/dirCntrfiles/' + sNameFileNaked + '.txt')
moUtil.fWriteJsonArray('./sftp.json', aSftp)
//upload files
fSftp()