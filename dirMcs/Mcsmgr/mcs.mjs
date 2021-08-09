/**
 * Create McsDir000000.last.html
 *
 * Input:
 * Output: McsDir000000.last.html file.
 * run: node mcs.mjs
 *
 * version.0-15-0.2021-08-04: module rename from js-mcsAdd3.js,
 * version.0-14-2.2020-12-04: no-steemit,
 * version.0-14-1.2020-11-28: Infrsc,
 * version.0-14-0.2020-07-05: hitp-files-local,
 * version.0-13-0.2020-04-06: structure-doing,
 * version.0-12-0.2020-02-19: whole-part-generic-tree,
 * version.0-11-1.2020-02-19: whole-part-generic-tree,
 * version.0-11-0.2020-01-12: versions,
 * version.0-10-0.2019-12-28: generic-whole-trees,
 * version.0-9-0.2019-12-25: whole-att,
 * version.0-8-0.2019-12-23: entity-link,
 * version.0-7-0.2019-09-06: comments on filMcsDirNam,
 * version.0-6-4.2019-08-09: github,
 * version.0-6-3.2019-07-30: idOverview,
 * version.0-6-2.2019-06-29: misc,
 * version.0-6-1.2019-05-05: misc,
 * version.0-6-0.2018-06-29: disqus-dir,
 * version.0-5-1.2018-03-17: filMcs,
 * version.0-5-0.2018-02-18: steemit,
 * version.0-4-0.2018-01-14: lower-case,
 * version.0-3-0.2017-12-10: NameFileIdShort,
 * version.0-2-1.2017-11-26: cpt.FilMcsId.last.html,
 * version.0-1-3.2017-11-17: idHeadercrd,
 * version.0-1-1.2017-09-27,
 * version.0-1-0.2017-06-27,
 */

import moFs from 'fs';
import moUtil from './js-moUtil-old.js';


var
  //moFs = require('fs'),
  //moUtil = require('./js-moUtil-old.js'),
  s,

  //// INPUT VALUES ////
  //1. Add counter or not
  bCounter = true,
  bDisqus = false, //on meta-info on dir-pages
  //2. Directory of the-concept (dirCor)
  sDir = 'dirCor',
  sDirNaked = 'Cor',
  //3. Name of the-title: Ethereum--blockchain-net
  sName = 'doing.referenting',
  //4. SHORT-name: sysNet, ogn, DnChain, DnEth, Dchain-net, lagKmo,
  sNmShort = 'referenting',

  //5. FILE-name: 
  sNmFile = '000020',
  //6. Name for IDs eg Dtc, unique in this file: Net,
  sNmId = 'Rfrtg';

s =
  '<!DOCTYPE html>\n' +
  '<html>\n' +
  '<head>\n' +
  '  <meta charset="utf-8">\n' +
  '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '  <title>Mcs.' + sNmShort + '-(0-1-0.' + moUtil.fDateYMD() + ' draft) ' + sName + '</title>\n' +
  '  <meta name="keywords" content="' + sName + ', ' + sNmShort + ', ModelConceptSensorial, McsHitp, Synagonism">\n' +
  '  <link rel="stylesheet" href="../Mcsmgr/mHitp.css">\n' +
  '</head>\n' +
  '\n' +
  '<body>\n' +
  '<header id="idHeader">\n' +
  '  <p></p>\n' +
  '  <h1 id="idHeaderH1">' + sName + '\n' +
  '    <br>sensorial-concept-Mcs (' + sNmShort + ')\n' +
  '    </h1>\n' +
  '  <p id="idHeadercrd">McsHitp-creation:: {' + moUtil.fDateYMD() + '}\n' +
  '    <a class="clsHide" href="#idHeadercrd"></a></p>\n' +
  '</header>\n' +
  '\n' +
  '<section id="idOverview">\n' +
  '  <h1 id="idOverviewH1">overview of ' + sNmShort + '\n' +
  '    <a class="clsHide" href="#idOverviewH1"></a></h1>\n' +
  '  <p id="idDescription">description::\n' +
  '    <br>· \n' +
  '    <a class="clsHide" href="#idDescription"></a></p>\n' +
  '  <p id="idName">name::\n' +
  '    <br>* McsEngl.Mcs' + sDirNaked + sNmFile + '.last.html' + '!⇒' + sNmShort + ',\n' +
  '    <br>* McsEngl.' + sDir +'/Mcs' + sDirNaked + sNmFile + '.last.html' + '!⇒' + sNmShort + ',\n' +
  '    <br>* McsEngl.' + sNmShort + ',\n' +
  '    <br>* McsEngl.' + sName + '!⇒' + sNmShort + ',\n' +
  '    <br>* McsEngl.' + sNmShort + '\'(' + sName + ')' + '!⇒' + sNmShort + ',\n' +
  '    <a class="clsHide" href="#idName"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNmId + 'rscF">\n' +
  '  <h1 id="id' + sNmId + 'rscFH1">info-resource of ' + sNmShort + '\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'rscFH1"></a></h1>\n' +
  '  <p id="id' + sNmId + 'rscnam">name::\n' +
  '    <br>* Mcs.' + sNmShort + '\'Infrsc,\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'rscnam"></a></p>\n' +
  '  <p id="id' + sNmId + 'rscwpa">addressWpg::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNmId + 'rscwpa"></a></p>\n' +
  '</section>\n' +
  //'\n' +
  //'<section id="id' + sNmId + 'srtrF">\n' +
  //'  <h1 id="id' + sNmId + 'srtrFH1">structure of ' + sNmShort + '\n' +
  //'    <a class="clsHide" href="#id' + sNmId + 'srtrFH1"></a></h1>\n' +
  //'  <p id="id' + sNmId + 'srtrnam">name::\n' +
  //'    <br>* Mcs.' + sNmShort + '\'structure,\n' +
  //'    <a class="clsHide" href="#id' + sNmId + 'srtrnam"></a></p>\n' +
  //'  <p id="id' + sNmId + 'srtrdsn">description::\n' +
  //'    <br>* \n' +
  //'    <a class="clsHide" href="#id' + sNmId + 'srtrdsn"></a></p>\n' +
  //'</section>\n' +
  '\n' +
  '<section id="id' + sNmId + 'dngF">\n' +
  '  <h1 id="id' + sNmId + 'dngFH1">DOING of ' + sNmShort + '\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'dngFH1"></a></h1>\n' +
  '  <p id="id' + sNmId + 'dngnam">name::\n' +
  '    <br>* Mcs.' + sNmShort + '\'doing,\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'dngnam"></a></p>\n' +
  '  <p id="id' + sNmId + 'dngdsn">description::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNmId + 'dngdsn"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNmId + 'evgF">\n' +
  '  <h1 id="id' + sNmId + 'evgFH1">evoluting of ' + sNmShort + '\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'evgFH1"></a></h1>\n' +
  '  <p id="id' + sNmId + 'evgnam">name::\n' +
  '    <br>* Mcs.' + sNmShort + '\'evoluting,\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'evgnam"></a></p>\n' +
  '  <p id="id' + sNmId + 'evg' + moUtil.fDateYMD2() + '">{' + moUtil.fDateYMD() + '}::\n' +
  '    <br>=== McsHitp-creation:\n';
if (sDir === 'dirCor') {
  s = s +
  '    <br>· creation of current <a class="clsPreview" href="filMcs.last.html#idOverview">concept</a>.\n'
} else {
  s = s +
  '    <br>· creation of current <a class="clsPreview" href="../dirCor/filMcs.last.html#idOverview">concept</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNmId + 'evg' + moUtil.fDateYMD2() + '"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNmId + 'wptF">\n' +
  '  <h1 id="id' + sNmId + 'wptFH1">WHOLE-PART-TREE of ' + sNmShort + '\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'whlFH1"></a></h1>\n' +
  '  <p id="id' + sNmId + 'wptnam">name::\n' +
  '    <br>* Mcs.' + sNmShort + '\'whole-part-tree,\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'wptnam"></a></p>\n' +
  '  <p id="id' + sNmId + 'wtr">whole-tree-of-' + sNmShort + '::\n' +
  '    <br>* \n' +
  '    <br>* ... ';
if (sDir === 'dirCor') {
  s = s +
  '<a class="clsPreview" href="filMcsEnt.last.html#idOverview">Sympan</a>.\n'
} else {
  s = s +
  '<a class="clsPreview" href="../dirCor/filMcsEnt.last.html#idOverview">Sympan</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNmId + 'wtr"></a></p>\n' +
  '  <p id="id' + sNmId + 'ptr">part-tree-of-' + sNmShort + '::\n' +
  '    <br>*\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'ptr"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNmId + 'gstF">\n' +
  '  <h1 id="id' + sNmId + 'gstFH1">GENERIC-SPECIFIC-TREE of ' + sNmShort + '\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'gstFH1"></a></h1>\n' +
  '  <p id="id' + sNmId + 'gstnam">name::\n' +
  '    <br>* Mcs.' + sNmShort + '\'generic-specific-tree,\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'gstnam"></a></p>\n' +
  '  <p id="id' + sNmId + 'gtr">generic-tree-of-' + sNmShort + '::\n' +
  '    <br>* ,\n' +
  '    <br>* ... ';
if (sDir === 'dirCor') {
  s = s +
  '<a class="clsPreview" href="filMcsEnt.last.html#idOverview">entity</a>.\n'
} else {
  s = s +
  '<a class="clsPreview" href="../dirCor/filMcsEnt.last.html#idOverview">entity</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNmId + 'gtr"></a></p>\n' +
  '  <p id="id' + sNmId + 'str">specific-tree-of-' + sNmShort + '::\n' +
  '    <br>* ,\n' +
  '    <a class="clsHide" href="#id' + sNmId + 'str"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="idMeta">\n' +
  '  <h1 id="idMetaH1">meta-info\n' +
  '    <a class="clsHide" href="#idMetaH1"></a></h1>\n';
if (bCounter) {
  s = s +
  '  <p id="idMetaCounter" class="clsCenter">this page was-visited\n' +
  '    <span class="clsColorRed">\n' +
  '    <script src="../../dirPgm/dirCntr/counter.php?page=Mcs'
         + sDirNaked + sNmFile + '"></script>\n' +
  '    </span>\n' +
  '    times since {' + moUtil.fDateYMD() + '}</p>\n';
}
s = s +
  '  <!-- the content of page-path paragraph is displayed as it is on top of toc -->\n' +
  '  <p id="idMetaWebpage_path"><span class="clsB clsColorGreen">page-wholepath</span>:\n' +
  '    <a class="clsPreview" href="../../#idOverview">synagonism.net</a> /\n' +
  '    <a class="clsPreview" href="../Mcs000000.last.html#idOverview">worldviewSngo</a> /\n' +
  '    <a class="clsPreview" href="Mcs' + sDirNaked + '000000.last.html#idOverview">' + sDir + '</a> /\n' +
  '    ' + sNmShort + '\n' +
  '    </p>\n' +
  '  <p id="idMetaP1">SEARCH::\n' +
  '    <br>· this page uses \'<span class="clsColorRed">locator-names</span>\', names that when you find them, you find the-LOCATION of the-concept they denote.\n' +
  '    <br>⊛ <strong>GLOBAL-SEARCH</strong>:\n' +
  '    <br>· clicking on <span class="clsColorGreenBg">the-green-BAR of a-page</span> you have access to the-global--locator-names of my-site.\n' +
  '    <br>· use the-prefix \'<span class="clsColorRed">' + sNmShort + '</span>\' for <a class="clsPreview" href="../dirCor/filMcs.last.html#idOverview">sensorial-concepts</a> related to current concept \'' + sName + '\'.\n' +
  '    <br>⊛ <strong>LOCAL-SEARCH</strong>:\n' +
  '    <br>· TYPE <span class="clsColorRed">CTRL+F "Mcs.words-of-concept\'s-name"</span>, to go to the-LOCATION of the-concept.\n' +
  '    <br>· a-preview of the-description of a-global-name makes reading fast.\n' +
  '    <a class="clsHide" href="#idMetaP1"></a></p>\n' +
  '  <p id="idFooterP1">footer::\n' +
  '    <br>• author: <a class="clsPreview" href="../dirHmn/McsHmn000003.last.html#idOverview">Kaseluris.Nikos.1959</a>\n' +
  '    <br>• email:\n' +
  '    <br> &nbsp;<img src="../../dirRsc/dirImg/mail.png">\n' +
  '    <br>• edit on github: https://github.com/synagonism/Mcsw/blob/master/' + sDir +'/Mcs' + sDirNaked + sNmFile + '.last.html,\n' +
  '    <br>• comments on <a class="clsPreview" href="Mcs' + sDirNaked + '000000.last.html#idComment">Disqus</a>,\n' +
  '    <br>• twitter: <a href="https://twitter.com/synagonism">@synagonism</a>,\n' +
  '    <a class="clsHide" href="#idFooterP1"></a></p>\n' +
  '  <!--                              -->\n' +
  '  <p id="idMetaVersion">webpage-versions::\n' +
  '    <br>• <a href="Mcs' + sDirNaked + sNmFile + '.last.html">Mcs' + sDirNaked + sNmFile + '.last.html</a>: dynamic,\n' +
  '    <br>• Mcs' + sDirNaked + sNmFile + '.0-1-0.' + moUtil.fDateYMD() + '.last.html: draft creation,\n' +
  '    <a class="clsHide" href="#idMetaVersion"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="idSupport">\n' +
  '  <h1 id="idSupportH1">support (<a class="clsPreview" href="../../#idSupport">link</a>)</h1>\n' +
  '  <p></p>\n' +
  '</section>\n' +
  '\n';
if (bDisqus) {
  s = s +
  '<section id="idComment">\n' +
  '  <h1 id="idCommentH1">comments\n' +
  '    <a class="clsHide" href="#idCommentH1"></a></h1>\n' +
  '  <p id="idCommentSpc">specific::\n' +
  '    <br>* <a class="clsPreview" href="Disqus-' + sDir +'.html#idDescription">on Disqus</a>,\n' +
  '    <a class="clsHide" href="#idCommentSpc"></a></p>\n' +
  '</section>\n' +
  '\n';
}
s = s +
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

moFs.writeFileSync(sDir + '/Mcs' + sDirNaked + sNmFile + '.last.html', s);
if (bCounter) {
  moFs.writeFileSync('../dirPgm/dirCntr/dirCntrfiles/Mcs' + sDirNaked + sNmFile + '.txt', '1');
}