/**
 * Create filMcsName.last.html with disqus-comments on filMcsDirNam.last.html
 *
 * Input:
 * Output: filMcsName.last.html file.
 * run: node js-mcsAdd3.js
 *
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



var
  moFs = require('fs'),
  moUtil = require('./js-moUtil-old.js'),
  s,

  //// INPUT VALUES ////
  //1. Add counter or not
  bCounter = true,
  bDisqus = false, //on meta-info on dir-pages
  //2. Directory of the-concept (dirCor or else)
  sDir = 'dirTchCpgm',
  sDIR = 'dirTchCpgm',
  //3. Name of the-title: Ethereum--blockchain-net
  sN = 'computer-program',
  //4. SHORT-name: ogn, DnChain, DnEth, Dchain-net, lagKmo,
  sNS = 'Cpgm',
  //5. FILE-name: shows relation of another file: DtcbnetEth, DnLbr,
  sNFil = 'Cpgm',
  //6. Name for IDs eg Dtc, unique in this file.
  sNId = 'Cpgm';

s =
  '<!DOCTYPE html>\n' +
  '<html>\n' +
  '<head>\n' +
  '  <meta charset="utf-8">\n' +
  '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '  <title>Mcs.' + sNS + ' (' + sN + ' 0-1-0.' + moUtil.fDateYMD() + ' draft)</title>\n' +
  '  <meta name="keywords" content="' + sN + ', ' + sNS + ', ModelConceptSensorial, McsHitp, Synagonism">\n' +
  '  <link rel="stylesheet" href="https://synagonism.github.io/hitp/hitp.css">\n' +
  '</head>\n' +
  '\n' +
  '<body>\n' +
  '<header id="idHeader">\n' +
  '  <p></p>\n' +
  '  <h1 id="idHeaderH1">' + sN + '\n' +
  '    <br>' +  'sensorial-concept-Mcs (' + sNS + ')\n' +
  '    </h1>\n' +
  '  <p id="idHeadercrd">McsHitp-creation:: {' + moUtil.fDateYMD() + '}\n' +
  '    <a class="clsHide" href="#idHeadercrd"></a></p>\n' +
  '</header>\n' +
  '\n' +
  '<section id="idOverview">\n' +
  '  <h1 id="idOverviewH1">overview of ' + sNS + '\n' +
  '    <a class="clsHide" href="#idOverviewH1"></a></h1>\n' +
  '  <p id="idName">name::\n' +
  '    <br>* Mcs.filMcs' + sNFil + '.last.html' + '!⇒' + sNS + ',\n' +
  '    <br>* Mcs.' + sDir +'/filMcs' + sNFil + '.last.html' + '!⇒' + sNS + ',\n' +
  '    <br>* Mcs.' + sNS + ',\n' +
  '    <br>* Mcs.' + sN + '!⇒' + sNS + ',\n' +
  '    <br>* Mcs.' + sNS + '\'(' + sN + ')' + '!⇒' + sNS + ',\n' +
  '    <a class="clsHide" href="#idName"></a></p>\n' +
  '  <p id="idDescription">description::\n' +
  '    <br>· \n' +
  '    <a class="clsHide" href="#idDescription"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'rscF">\n' +
  '  <h1 id="id' + sNId + 'rscFH1">resource of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'rscFH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'rscnam">name::\n' +
  '    <br>* Mcs.' + sNS + '\'attResource,\n' +
  '    <br>* Mcs.' + sNS + '\'resource,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'rscnam"></a></p>\n' +
  '  <p id="id' + sNId + 'rscwpa">addressWpg::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNId + 'rscwpa"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'srtrF">\n' +
  '  <h1 id="id' + sNId + 'srtrFH1">structure of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'srtrFH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'srtrnam">name::\n' +
  '    <br>* Mcs.' + sNS + '\'attStructure,\n' +
  '    <br>* Mcs.' + sNS + '\'structure,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'srtrnam"></a></p>\n' +
  '  <p id="id' + sNId + 'srtrdsn">description::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNId + 'srtrdsn"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'dngF">\n' +
  '  <h1 id="id' + sNId + 'dngFH1">DOING of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'dngFH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'dngnam">name::\n' +
  '    <br>* Mcs.' + sNS + '\'attDoing,\n' +
  '    <br>* Mcs.' + sNS + '\'doing,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'dngnam"></a></p>\n' +
  '  <p id="id' + sNId + 'dngdsn">description::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNId + 'dngdsn"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'evgF">\n' +
  '  <h1 id="id' + sNId + 'evgFH1">EVOLUTING of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'evgFH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'evgnam">name::\n' +
  '    <br>* Mcs.' + sNS + '\'attEvoluting,\n' +
  '    <br>* Mcs.' + sNS + '\'evoluting,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'evgnam"></a></p>\n' +
  '  <p id="id' + sNId + 'evg' + moUtil.fDateYMD2() + '">{time.' + moUtil.fDateYMD() + '}::\n' +
  '    <br>=== McsHitp-creation:\n';
if (sDir === 'dirCor') {
  s = s +
  '    <br>· creation of current <a class="clsPreview" href="filMcs.last.html#idOverview">concept</a>.\n'
} else {
  s = s +
  '    <br>· creation of current <a class="clsPreview" href="../dirCor/filMcs.last.html#idOverview">concept</a>.\n'
}
s = s +
  '    <a class="clsHide" href="#id' + sNId + 'evg' + moUtil.fDateYMD2() + '"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'wptF">\n' +
  '  <h1 id="id' + sNId + 'wptFH1">WHOLE-PART-TREE of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'whlFH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'wptnam">name::\n' +
  '    <br>* Mcs.' + sNS + '\'whole-part-tree,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'wptnam"></a></p>\n' +
  '  <p id="id' + sNId + 'wtr">whole-tree-of-' + sNS + '::\n' +
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
  '    <a class="clsHide" href="#id' + sNId + 'wtr"></a></p>\n' +
  '  <p id="id' + sNId + 'ptr">part-tree-of-' + sNS + '::\n' +
  '    <br>*\n' +
  '    <a class="clsHide" href="#id' + sNId + 'ptr"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'gstF">\n' +
  '  <h1 id="id' + sNId + 'gstFH1">GENERIC-SPECIFIC-TREE of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'gstFH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'gstnam">name::\n' +
  '    <br>* Mcs.' + sNS + '\'generic-specific-tree,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'gstnam"></a></p>\n' +
  '  <p id="id' + sNId + 'gtr">generic-tree-of-' + sNS + '::\n' +
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
  '    <a class="clsHide" href="#id' + sNId + 'gtr"></a></p>\n' +
  '  <p id="id' + sNId + 'str">specific-tree-of-' + sNS + '::\n' +
  '    <br>* ,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'str"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="idMeta">\n' +
  '  <h1 id="idMetaH1">meta-info\n' +
  '    <a class="clsHide" href="#idMetaH1"></a></h1>\n';
if (bCounter) {
  s = s +
  '  <p id="idMetaCounter" class="clsCenter">this page was-visited\n' +
  '    <span class="clsColorRed">\n' +
  '    <script src="../../dirPgm/dirCntr/counter.php?page=Mws-'
         + sDir + '.' + sNFil + '"></script>\n' +
  '    </span>\n' +
  '    times since {' + moUtil.fDateYMD() + '}</p>\n';
}
s = s +
  '  <!-- the content of page-path paragraph is displayed as it is on top of toc -->\n' +
  '  <p id="idMetaWebpage_path"><span class="clsB clsColorGreen">page-wholepath</span>:\n' +
  '    <a class="clsPreview" href="../../#idOverview">synagonism.net</a> /\n' +
  '    <a class="clsPreview" href="../filMcsWorld.last.html#idOverview">Mcs-worldview</a> /\n' +
  '    <a class="clsPreview" href="filMcs' + sDIR + '.last.html#idOverview">' + sDir + '</a> /\n' +
  '    ' + sNS + '\n' +
  '    </p>\n' +
  '  <p id="idMetaP1">SEARCH::\n' +
  '    <br>· this page uses \'<span class="clsColorRed">locator-names</span>\', names that when you find them, you find the-LOCATION of the-concept they denote.\n' +
  '    <br>⊛ <strong>GLOBAL-SEARCH</strong>:\n' +
  '    <br>· clicking on <span class="clsColorGreenBg">the-green-BAR of a-page</span> you have access to the-global--locator-names of my-site.\n' +
  '    <br>· use the-prefix \'<span class="clsColorRed">' + sNS + '</span>\' for <a class="clsPreview" href="../dirCor/filMcs.last.html#idOverview">sensorial-concepts</a> related to current concept \'' + sN + '\'.\n' +
  '    <br>⊛ <strong>LOCAL-SEARCH</strong>:\n' +
  '    <br>· TYPE <span class="clsColorRed">CTRL+F "Mcs.words-of-concept\'s-name"</span>, to go to the-LOCATION of the-concept.\n' +
  '    <br>· a-preview of the-description of a-global-name makes reading fast.\n' +
  '    <a class="clsHide" href="#idMetaP1"></a></p>\n' +
  '  <p id="idFooterP1">footer::\n' +
  '    <br>• author: <a class="clsPreview" href="../../#idAboutme">Kaseluris.Nikos.1959</a>\n' +
  '    <br>• email:\n' +
  '    <br> &nbsp;<img src="../../misc/img/mail.png" alt="imgMail">\n' +
  '    <br>• edit on github: https://github.com/synagonism/Mcsw/blob/master/' + sDir +'/filMcs' + sNFil + '.last.html,\n' +
  '    <br>• comments on <a class="clsPreview" href="filMcs' + sDIR + '.last.html#idComment">Disqus</a>,\n' +
  '    <br>• twitter: <a href="https://twitter.com/synagonism">@synagonism</a>,\n' +
  '    <br>• steemit: <a href="https://steemit.com/synagonism">https://steemit.com/@synagonism</a>,\n' +
  '    <a class="clsHide" href="#idFooterP1"></a></p>\n' +
  '  <!--                              -->\n' +
  '  <p id="idMetaVersion">webpage-versions::\n' +
  '    <br>• <a href="filMcs' + sNFil + '.last.html">filMcs' + sNFil + '.last.html</a>: dynamic,\n' +
  '    <br>• filMcs' + sNFil + '.0-1-0.' + moUtil.fDateYMD() + '.last.html: draft creation,\n' +
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
  '<script>\n' +
  '  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n' +
  '  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
  '  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
  '  })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n' +
  '  ga(\'create\', \'UA-19285371-5\', \'synagonism.net\');\n' +
  '  ga(\'send\', \'pageview\');\n' +
  '</script>\n' +
  '\n' +
  '<script src="https://synagonism.github.io/hitp/hitp.js"></script>\n' +
  '</body>\n' +
  '</html>';

moFs.writeFileSync(sDir + '/filMcs' + sNFil + '.last.html', s);
if (bCounter) {
  moFs.writeFileSync('../dirPgm/dirCntr/dirCntrfiles/Mws-' + sDir + '.' + sNFil + '.txt', '1');
}