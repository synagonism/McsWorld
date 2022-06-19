/**
 * Create filMcs.html
 *
 * Input:
 * Output: filMcs.html file.
 * run: node js-mcs.js
 *
 * version.0-4-0.2018-01-14: lower-case,
 * version.0-3-0.2017-12-10: NameFileIdShort,
 * version.0-2-1.2017-11-26: cpt.FilMcsId.last.html,
 * version.0-1-3.2017-11-17: idHeadercrd,
 * version.0-1-1.2017-09-27,
 * version.0-1-0.2017-06-27,
 */



var
  moFs = require('fs'),
  moUtil = require('./js-moUtil.js'),
  //// INPUT VALUES ////
  //1. Add counter or not
  bCounter = true,
  //2. Add comments or not
  bDisqus = true,
  //3. Directory of the-concept (dirCor or else)
  sDir = 'dirTchInf',
  sDIR = 'DirTchInf',
  //4. Name of the-title
  sN = 'Cardano-network',
  //5. SHORT-name eg Dcc-net, Đnet, ĐEthereum,
  sNS = 'ĐCardano',
  //6. FILE-name: shows relation of another file
  sNFil = 'DbcnetAda',
  //7. Name for IDs eg Dtc, unique in this file.
  sNId = 'Ada',
  s;

s =
  '<!DOCTYPE html>\n' +
  '<html>\n' +
  '<head>\n' +
  '  <meta charset="utf-8">\n' +
  '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  '  <title>Mcs.' + sN + ' (' + sNS + '.0-1-0.' + moUtil.fDateYMD() + ')</title>\n' +
  '  <meta name="keywords" content="' + sN + ', ' + sNS + ', ModelConceptStructured, Mcs, ModelInfoWorld, Worldview, Mws, Hitp, Kaseluris.Nikos.1959, Synagonism">\n' +
  '  <link rel="stylesheet" href="http://synagonism.github.io/hitp/hitp.css">\n' +
  '</head>\n' +
  '\n' +
  '<body>\n' +
  '<header id="idHeader">\n' +
  '  <p></p>\n' +
  '  <h1 id="idHeaderH1">Mcs.' + sN + ' (' + sNS + ')\n' +
  '    </h1>\n' +
  '  <p id="idHeadercrd">concept-created: {' + moUtil.fDateYMD() + '}\n' +
  '    <a class="clsHide" href="#idHeadercrd"></a></p>\n' +
  '</header>\n' +
  '\n' +
  '<section id="idDescriptionFT">\n' +
  '  <h1 id="idDescriptionFTH1">description of ' + sNS + '\n' +
  '    <a class="clsHide" href="#idDescriptionFTH1"></a></h1>\n' +
  '  <p id="idDescriptionP1">description::\n' +
  '    <br>· \n' +
  '    <a class="clsHide" href="#idDescriptionP1"></a></p>\n' +
  '  <p id="idName">name::\n' +
  '    <br>* cpt.filMcs' + sNFil + '.last.html,\n' +
  '    <br>* cpt.' + sDir +'/filMcs' + sNFil + '.last.html,\n' +
  '    <br>* cpt.' + sN + ',\n' +
  '    <br>* cpt.' + sN + '-(' + sNS + '),\n' +
  '    <br>* cpt.' + sNS + '-(' + sN + '),\n' +
  '    <a class="clsHide" href="#idName"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'rscFT">\n' +
  '  <h1 id="id' + sNId + 'rscFTH1">resource of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'rscFTH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'rscnam">Name::\n' +
  '    <br>* cpt.' + sN + '\'resource,\n' +
  '    <br>* cpt.' + sNS + 'AeResource,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'rscnam"></a></p>\n' +
  '  <p id="id' + sNId + 'rscwpa">addressWpg::\n' +
  '    <br>* \n' +
  '    <a class="clsHide" href="#id' + sNId + 'rscwpa"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'gncFT">\n' +
  '  <h1 id="id' + sNId + 'gncFTH1">GENERIC of ' + sNS + '\n' +
  '    <a class="clsHide" href="#id' + sNId + 'gncFTH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'gncchn">Generic-chain::\n' +
  '    <br>* \n' +
  '    <br>...\n' +
  '    <br>* entity,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'gncchn"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'SpcFT">\n' +
  '  <h1 id="id' + sNId + 'SpcFTH1">' + sNS + '.SPECIFIC\n' +
  '    <a class="clsHide" href="#id' + sNId + 'SpcFTH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'Spcnam">name::\n' +
  '    <br>* cpt.' + sN + '.specific,\n' +
  '    <br>* cpt.' + sNS + 'AsSpecific,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'Spcnam"></a></p>\n' +
  '  <p id="id' + sNId + 'SpcP1">specific::\n' +
  '    <br>\n' +
  '    <a class="clsHide" href="#id' + sNId + 'SpcP1"></a></p>\n' +
  '</section>\n' +
  '\n' +
  '<section id="id' + sNId + 'EvgFT">\n' +
  '  <h1 id="id' + sNId + 'EvgFTH1">' + sNS + '\.EVOLUTING\n' +
  '    <a class="clsHide" href="#id' + sNId + 'EvgFTH1"></a></h1>\n' +
  '  <p id="id' + sNId + 'Evgnam">name::\n' +
  '    <br>* cpt.' + sNS + '.evoluting,\n' +
  '    <a class="clsHide" href="#id' + sNId + 'Evgnam"></a></p>\n' +
  '  <p id="id' + sNId + 'Evg">{time.}::\n' +
  '    <br>=== :\n' +
  '    <a class="clsHide" href="#id' + sNId + 'Evg"></a></p>\n' +
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
  '  <p id="idMetaWebpage_path"><span class="clsB clsColorGreen">page-path</span>:\n' +
  '    <a class="clsPreview" href="../../#idDescription">synagonism.net</a> /\n' +
  '    <a class="clsPreview" href="../FilMcsw.Last.html#idDescription">Mcs-worldview</a> /\n' +
  '    <a class="clsPreview" href="FilMcs' + sDIR + '.Last.html#idDescription">' + sDir + '</a> /\n' +
  '    ' + sN + '\n' +
  '    </p>\n' +
  '  <p id="idMetaP1">SEARCH::\n' +
  '    <br>· this page uses \'<span class="clsColorRed">locator-names</span>\', names that when you find them, you find the-LOCATION of the-concept they denote.\n' +
  '    <br>• <strong>LOCAL-SEARCH</strong>:\n' +
  '    <br>· TYPE <span class="clsColorRed">CTRL+F "cpt.words-of-concept\'s-name"</span>, to go to the-LOCATION of the-concept.\n' +
  '    <br>• <strong>GLOBAL-SEARCH</strong>:\n' +
  '    <br>· clicking on the-green-TITLE of a-page you have access to the-global--locator-names of my-site.\n' +
  '    <br>· a-preview of the-description of a-global-name makes reading fast.\n' +
  '    <a class="clsHide" href="#idMetaP1"></a></p>\n' +
  '  <p id="idFooterP1">footer::\n' +
  '    <br>• author: <a class="clsPreview" href="../../#idAboutme">Kaseluris.Nikos.1959</a>\n' +
  '    <br>• email:\n' +
  '    <br> &nbsp;<img src="../../misc/img/mail.png" alt="imgMail">\n' +
  '    <br>• twitter: <a href="https://twitter.com/synagonism">@synagonism</a>\n' +
  '    <a class="clsHide" href="#idFooterP1"></a></p>\n' +
  '  <!--                              -->\n' +
  '  <p id="idMetaVersion">webpage-versions::\n' +
  '    <br>• version.last.dynamic: <a href="FilMcs' + sNFil + '.last.html">FilMcs' + sNFil + '.last.html</a>,\n' +
  '    <br>• version.0-1-0.' + moUtil.fDateYMD() + '.created: <a href="FilMcs' + sNFil + '.0-1-0.' + moUtil.fDateYMD() + '.html">FilMcs' + sNFil + '.0-1-0.' + moUtil.fDateYMD() + '.html</a>,\n' +
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
  '  <div id="disqus_thread"></div>\n' +
  '  <script type="text/javascript">\n' +
  '    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */\n' +
  '    var disqus_shortname = \'synagonism\';\n' +
  '    var disqus_identifier = \'' + sNFil + '\';\n' +
  '    var disqus_title = \'' + sNFil + '\';\n' +
  '    var disqus_url = \'http://synagonism.net/dirMiwMcs/' + sDir + '/FilMcs' + sNFil + '.last.html\';\n' +
  '    /* * * DON\'T EDIT BELOW THIS LINE * * */\n' +
  '    (function() {\n' +
  '      var dsq = document.createElement(\'script\'); dsq.type = \'text/javascript\'; dsq.async = true;\n' +
  '      dsq.src = \'//\' + disqus_shortname + \'.disqus.com/embed.js\';\n' +
  '      (document.getElementsByTagName(\'head\')[0] || document.getElementsByTagName(\'body\')[0]).appendChild(dsq);\n' +
  '    })();\n' +
  '  </script>\n' +
  '  <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>\n' +
  '  <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>\n' +
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
  '<script src="http://synagonism.github.io/hitp/hitp.js"></script>\n' +
  '</body>\n' +
  '</html>';

moFs.writeFileSync(sDir + '/filMcs' + sNFil + '.last.html', s);
if (bCounter) {
  moFs.writeFileSync('../dirPgm/dirCntr/dirCntrfiles/Mws-' + sDir + '.' + sNFil + '.txt', '1');
}