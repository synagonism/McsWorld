/**
 * Create index.name.X.html files
 *
 * Input:
 * Output: index.name.X.html files.
 * run: node nameIdxnam.js
 *
 * modified: {2017-06-18}
 * created: {2017-06-18}
 */

var
  moFs = require('fs'),
  //object to hold the-names of namidx.X.json index-files
  oIdxNam = {
    engA:'A', engB:'B', engC:'C', engD:'D', engE:'E', engF:'F',
    engG:'G', engH:'H', engI:'I', engJ:'J', engK:'K', engL:'L',
    engM:'M', engN:'N', engO:'O', engP:'P', engQ:'Q', engR:'R',
    engS:'S', engT:'T', engU:'U', engV:'V', engW:'W', engX:'X',
    engY:'Y', engZ:'Z',
    ellAl:'Α', ellBe:'Β', ellGa:'Γ', ellDe:'Δ', ellEp:'Ε', ellZe:'Ζ',
    ellEt:'Η', ellTh:'Θ', ellIo:'Ι', ellKa:'Κ', ellLa:'Λ', ellMu:'Μ',
    ellNu:'Ν', ellXi:'Ξ', ellOn:'Ο', ellPi:'Π', ellRh:'Ρ', ellSi:'Σ',
    ellTa:'Τ', ellUp:'Υ', ellPh:'Φ', ellCh:'Χ', ellPs:'Ψ', ellOm:'Ω',
    ZZZ:'ZZZ'
  };

/**
 * For each index-file,
 */
for (var sK in oIdxNam) {
  var
    sFilIdx = 'namidx.' + sK + '.json',
    sFilHml = 'index.name.' + sK + '.html';

  if (moFs.existsSync(sFilIdx)) {
    var
      aEx = JSON.parse(moFs.readFileSync(sFilIdx));
    fHtmlCreate(sFilHml, aEx);
  }
}


function fHtmlCreate(sFileIn, aIn) {
  //create html-file
  var
    s,
    sA = sFileIn.substring(11, sFileIn.lastIndexOf('.')); //index.name.engA.html
  s =
    '<!DOCTYPE html>\n' +
    '<html>\n' +
    '<head>\n' +
    '  <meta charset="utf-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '  <title>mws\'index.name.' + sA + '</title>\n' +
    '  <meta name="keywords" content="ModelInfoWorld, worldview, mws, hitp, Kaseluris.Nikos.1959, synagonism">\n' +
    '  <link rel="stylesheet" href="http://synagonism.github.io/hitp/hitp.css">\n' +
    '  <script>\n' +
    '    oMwsI' + sA + ' = {\n' +
    '      oXHR: new XMLHttpRequest(),\n' +
    '      a: null\n' +
    '    }\n' +
    '    oMwsI' + sA + '[\'oXHR\'].open(\'GET\', \'namidx.' + sA + '.json\', true);\n' +
    '    oMwsI' + sA + '[\'oXHR\'].send(null);\n' +
    '    oMwsI' + sA + '[\'oXHR\'].onreadystatechange = function () {\n' +
    '      if (oMwsI' + sA + '[\'oXHR\'].readyState === 4 && oMwsI' + sA + '[\'oXHR\'].status === 200) {\n' +
    '        oMwsI' + sA + '[\'a\'] = JSON.parse(oMwsI' + sA + '[\'oXHR\'].responseText);\n' +
    '      }\n' +
    '    }\n' +
    '  </script>\n' +
    '</head>\n' +
    '\n' +
    '<body>\n' +
    '<header id="idHeader">\n' +
    '  <p></p>\n' +
    '  <h1 id="idHeaderH1">index.name.' + sA + '\n' +
    '    <br>of ModelWorldSynagonism (mws)\n' +
    '    </h1>\n' +
    '</header>\n' +
    '\n' +
    '<section id="idDescription">\n' +
    '  <h1 id="idDescriptionH1">Description\n' +
    '    <a class="clsHide" href="#idDescriptionH1"></a></h1>\n' +
    '  <p id="idDescriptiondsn">Description::\n' +
    '    <br>The-index is-computed dynamically from file \'namidx.' + sA + '.json\'.\n' +
    '    <br>(Chrome needs to clear cache, some times: best with "Clear Cache" extenstion)' +
    '    <a class="clsHide" href="#idDescriptiondsn"></a></p>\n' +
    '  <p id="idName">Name::\n' +
    '    <br>* cpt.Index.name.' + sA + '-of-mws,\n' +
    '    <br>* cpt.Mws\'index.name.' + sA + ',\n' +
    '    <a class="clsHide" href="#idName"></a></p>\n' +
    '</section>\n' +
    '\n' +
    '<section id="idIdx">\n' +
    '  <h1 id="idIdxH1">Index\n' +
    '    <a class="clsHide" href="#idIdxH1"></a></h1>\n' +
    '  <ol id="idOl">\n' +
    '    <ol>\n' +
    '</section>\n' +
    '\n' +
    '<script src="http://synagonism.github.io/hitp/hitp.js"></script>\n' +
    '<script>\n' +
    '  window.addEventListener(\'load\', function () {\n' +
    '    var\n' +
    '      a = oMwsI' + sA + '[\'a\'], //existing name-url array\n' +
    '      sLi;\n' +
    '\n' +
    '    sLi = \'<li>index.name.\' + a[0][0].substring(1)\n' +
    '        + \', created: {\' + a[0][1] + \'}\';\n' +
    '    // Put names\n' +
    '    for (var n = 1; n < a.length; n++) {\n' +
    '      sLi = sLi +\n' +
    '        \'<li>\' + a[n][0] +\n' +
    '        \':: <a class="clsPreview" href="\' + a[n][1] +\n' +
    '        \'">\' +\n' +
    '        a[n][1] +\'</a>,\';\n' +
    '    }\n' +
    '    document.getElementById(\'idOl\').innerHTML = sLi;\n' +
    '  });\n' +
    '</script>\n' +
    '</body>\n' +
    '</html>';
  moFs.writeFileSync(sFileIn, s);
}

