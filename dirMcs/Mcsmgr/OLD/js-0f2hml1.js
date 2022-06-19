/**
 * modified: {2017-04-23}
 * created: {2017-03-23}
 *
 * Input: FolioViews.fff file.
 * Output: own-hml file to convert in hitp-hml.
 * run: node 1fthml fileIn fileOut
 */

var oFs = require('fs'),
  sFileIn = 'test0.txt',
  sFileOut = 'testOut.txt',
  sTxtOut = '';

if (process.argv[2]) {
  sFileIn = process.argv[2];
} else {
  console.log('USAGE: node 1f2hml fileIn fileOut');
  process.exit();
}

if (process.argv[3]) {
  sFileOut = process.argv[3];
} else {
  console.log('USAGE: node 1f2hml fileIn fileOut');
  process.exit();
}

var oInterface = require('readline').createInterface({
  input: oFs.createReadStream(sFileIn)
});

var
  bOpen = false,
  nP = 1,
  sId = 'idBcnnet',
  sRelPrv = 'start',
  sTitle = '',
  oWs = oFs.createWriteStream(sFileOut);

/**
 * SearchReplace linein.
 *
 * sIn: string of linein.
 * rIn: regexp to match linein.
 * sReplaceIn: string to replace regexp
 *
 * return: new line
 */
function fSRRs(sIn, rIn, sReplaceIn) {
  var sOut = sIn;
  if (sIn.match(rIn)) {
    sOut = sIn.replace(rIn, sReplaceIn);
  }
  return sOut;
}

oInterface.on('line', function (sLnIn) {
  var a;
  //<RD:CONCEPT>cpt.Blockchain_Network #rl3: idBcnnet #
  if (sLnIn.startsWith('<RD:CONCEPT')) {
    a = sLnIn.match(/<RD:CONCEPT>([^#]+)#rl3: id([^ #]+)(.*)/);
    sId = 'id' + a[2];
    sTitle = a[1].trim();
    sLnIn =
      '⋖!DOCTYPE html>' +
      '\n⋖html>' +
      '\n⋖head>' +
      '\n  ⋖meta charset="utf-8">' +
      '\n  ⋖meta name="viewport" content="width=device-width, initial-scale=1">' +
      '\n  ⋖title>' + sTitle + '⋖/title>' +
      '\n  ⋖meta name="keywords" content="mcsHitp">' +
      '\n  ⋖link rel="stylesheet" href="http://synagonism.github.io/hitp/hitp.css">' +
      '\n⋖/head>' +
      '\n' +
      '\n⋖body>' +
      '\n⋖header id="idHeader">' +
      '\n  ⋖p>⋖/p>' +
      '\n  ⋖h1 id="idHeaderH1">' + sTitle +
      '\n    ⋖/h1>' +
      '\n⋖/header>';
  }

  //<RD:"relation4">bcnnet'DESCRIPTION #rl4: idDescription #
  if (sLnIn.match('#rl4: idDescription')) {
    a = sLnIn.match(/<RD:\"relation4\">([^#]+)#rl4: idDescription(.*)/);
    nP = 1;
    sId = 'idDescription';
    sTitle = a[1].trim();
    if (sRelPrv === 'rel4') {
      sLnIn = '⋖/section>' +
        '\n' +
        '\n⋖section id="idDescription">' +
        '\n  ⋖h1 id="idDescriptionH1">' + sTitle +
        '\n    ⋖a class="clsHide" href="#idDescriptionH1">⋖/a>⋖/h1>';
    } else {
      sLnIn =
        '' +
        '\n⋖section id="idDescription">' +
        '\n  ⋖h1 id="idDescriptionH1">' + sTitle +
        '\n    ⋖a class="clsHide" href="#idDescriptionH1">⋖/a>⋖/h1>';
    }
    sRelPrv = 'rel4';
  }

  //<RD:"relation4">bcnnet'NAME #rl4: idName #
  if (sLnIn.match('#rl4: idName')) {
    a = sLnIn.match(/<RD:\"relation4\">([^#]+)#rl4: idName(.*)/);
    nP = 1;
    sId = 'idName';
    sTitle = a[1].trim();
    if (sRelPrv === 'rel4') {
      sLnIn = '⋖/section>'+
        '\n' +
        '\n⋖section id="idDescription">' +
        '\n  ⋖h1 id="idDescriptionH1">' + sTitle +
        '\n    ⋖a class="clsHide" href="#idDescriptionH1">⋖/a>⋖/h1>';
    } else {
      sLnIn =
        '' +
        '\n⋖section id="idDescription">' +
        '\n  ⋖h1 id="idDescriptionH1">' + sTitle +
        '\n    ⋖a class="clsHide" href="#idDescriptionH1">⋖/a>⋖/h1>';
    }
    sRelPrv = 'rel4';
  }

  //<RD:"relation4">bcnnet'Nnnn #rl4: idNnnn #
  if (sLnIn.startsWith('<RD:"relation4"')) {
    a = sLnIn.match(/<RD:\"relation4\">([^#]+)#rl4: id([^ #]+)(.*)/);
    nP = 1;
    sId = 'id' + a[2];
    sTitle = a[1].trim();
    if (sRelPrv === 'start') {
      sLnIn =
        '' +
        '\n⋖section id="' + sId + '">' +
        '\n  ⋖h1 id="' + sId + 'H1">' + sTitle +
        '\n    ⋖a class="clsHide" href="#' + sId + 'H1">⋖/a>⋖/h1>';
    } else {
      if (sRelPrv === 'rel9') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n⋖/section>';
      }
      if (sRelPrv === 'rel8') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n⋖/section>';
      }
      if (sRelPrv === 'rel7') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n⋖/section>';
      }
      if (sRelPrv === 'rel6') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n⋖/section>';
      }
      if (sRelPrv === 'rel5') {
        sLnIn = '  ⋖/section>' +
          '\n⋖/section>';
      }
      if (sRelPrv === 'rel4') {
        sLnIn = '⋖/section>';
      }
      sLnIn = sLnIn +
        '\n' +
        '\n⋖section id="' + sId + '">' +
        '\n  ⋖h1 id="' + sId + 'H1">' + sTitle +
        '\n    ⋖a class="clsHide" href="#' + sId + 'H1">⋖/a>⋖/h1>';
    }
    sRelPrv = 'rel4';
  }


  //<RD:"relation5">bcnnet'Nnnn #rl5: idNnnn #
  if (sLnIn.startsWith('<RD:"relation5"')) {
    a = sLnIn.match(/<RD:"relation5">([^#]+)#rl5: id([^ #]+)(.*)/);
    //console.log(a[0])
    nP = 1;
    sId = 'id' + a[2];
    sTitle = a[1].trim();
    if (sRelPrv === 'rel4') {
    sLnIn =
      '' +
      '\n  ⋖section id="' + sId + '">' +
      '\n  ⋖h2 id="' + sId + 'H2">' + sTitle +
      '\n    ⋖a class="clsHide" href="#' + sId + 'H2">⋖/a>⋖/h2>';
    } else {
      if (sRelPrv === 'rel9') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel8') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel7') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel6') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel5') {
        sLnIn = '  ⋖/section>';
      }
      sLnIn = sLnIn +
        '\n' +
        '\n  ⋖section id="' + sId + '">' +
        '\n  ⋖h2 id="' + sId + 'H2">' + sTitle +
        '\n    ⋖a class="clsHide" href="#' + sId + 'H2">⋖/a>⋖/h2>';
    }
    sRelPrv = 'rel5';
  }


  //<RD:"relation6">bcnnet'Nnnn #rl6: idNnnn #
  if (sLnIn.startsWith('<RD:"relation6"')) {
    a = sLnIn.match(/<RD:"relation6">([^#]+)#rl6: id([^ #]+)(.*)/);
    //console.log(a[0])
    nP = 1;
    sId = 'id' + a[2];
    sTitle = a[1].trim();

    //If previous rel5, then FIRST rel6
    if (sRelPrv === 'rel5') {
    sLnIn = '' +
      '\n  ⋖section id="' + sId + '">' +
      '\n  ⋖h3 id="' + sId + 'H3">' + sTitle +
      '\n    ⋖a class="clsHide" href="#' + sId + 'H3">⋖/a>⋖/h3>';
    } else {
      if (sRelPrv === 'rel9') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel8') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel7') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel6') {
        sLnIn = '  ⋖/section>';
      }
      sLnIn = sLnIn +
        '\n' +
        '\n  ⋖section id="' + sId + '">' +
        '\n  ⋖h3 id="' + sId + 'H3">' + sTitle +
        '\n    ⋖a class="clsHide" href="#' + sId + 'H3">⋖/a>⋖/h3>';
    }
    sRelPrv = 'rel6';
  }


  //<RD:"relation7">bcnnet'Nnnn #rl7: idNnnn #
  if (sLnIn.startsWith('<RD:"relation7"')) {
    a = sLnIn.match(/<RD:"relation7">([^#]+)#rl7: id([^ #]+)(.*)/);
    //console.log(a[0])
    nP = 1;
    sId = 'id' + a[2];
    sTitle = a[1].trim();

    //If previous rel6, then FIRST rel7
    if (sRelPrv === 'rel6') {
    sLnIn = '' +
      '\n  ⋖section id="' + sId + '">' +
      '\n  ⋖h4 id="' + sId + 'H4">' + sTitle +
      '\n    ⋖a class="clsHide" href="#' + sId + 'H4">⋖/a>⋖/h4>';
    } else {
      if (sRelPrv === 'rel9') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel8') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel7') {
        sLnIn = '  ⋖/section>';
      }
      sLnIn = sLnIn +
        '\n' +
        '\n  ⋖section id="' + sId + '">' +
        '\n  ⋖h4 id="' + sId + 'H4">' + sTitle +
        '\n    ⋖a class="clsHide" href="#' + sId + 'H4">⋖/a>⋖/h4>';
    }
    sRelPrv = 'rel7';
  }


  //<RD:"relation8">bcnnet'Nnnn #rl8: idNnnn #
  if (sLnIn.startsWith('<RD:"relation8"')) {
    a = sLnIn.match(/<RD:"relation8">([^#]+)#rl8: id([^ #]+)(.*)/);
    //console.log(a[0])
    nP = 1;
    sId = 'id' + a[2];
    sTitle = a[1].trim();

    //If previous rel7, then FIRST rel8
    if (sRelPrv === 'rel7') {
    sLnIn = '' +
      '\n  ⋖section id="' + sId + '">' +
      '\n  ⋖h5 id="' + sId + 'H5">' + sTitle +
      '\n    ⋖a class="clsHide" href="#' + sId + 'H5">⋖/a>⋖/h5>';
    } else {
      if (sRelPrv === 'rel9') {
        sLnIn = '  ⋖/section>' +
          '\n  ⋖/section>';
      }
      if (sRelPrv === 'rel8') {
        sLnIn = '  ⋖/section>';
      }
      sLnIn = sLnIn +
        '\n' +
        '\n  ⋖section id="' + sId + '">' +
        '\n  ⋖h5 id="' + sId + 'H5">' + sTitle +
        '\n    ⋖a class="clsHide" href="#' + sId + 'H5">⋖/a>⋖/h5>';
    }
    sRelPrv = 'rel8';
  }


  //<RD:"relation9">bcnnet'Nnnn #rl9: idNnnn #
  if (sLnIn.startsWith('<RD:"relation9"')) {
    a = sLnIn.match(/<RD:"relation9">([^#]+)#rl9: id([^ #]+)(.*)/);
    //console.log(a[0])
    nP = 1;
    sId = 'id' + a[2];
    sTitle = a[1].trim();

    //If previous rel8, then FIRST rel9
    if (sRelPrv === 'rel8') {
    sLnIn = '' +
      '\n  ⋖section id="' + sId + '">' +
      '\n  ⋖h6 id="' + sId + 'H6">' + sTitle +
      '\n    ⋖a class="clsHide" href="#' + sId + 'H6">⋖/a>⋖/h6>';
    } else {
      if (sRelPrv === 'rel9') {
        sLnIn = '  ⋖/section>' +
          '\n' +
          '\n  ⋖section id="' + sId + '">' +
          '\n  ⋖h6 id="' + sId + 'H6">' + sTitle +
          '\n    ⋖a class="clsHide" href="#' + sId + 'H6">⋖/a>⋖/h6>';
      }
    }
    sRelPrv = 'rel9';
  }

  //<RD>_CREATED: {2016.03.04}
  sLnIn = fSRRs(sLnIn, /<RD>_CREATED: (.*)/,
    '  ⋖p id="' + sId + 'crd">Created::' +
    '\n    ⋖br>$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'crd">⋖/a>⋖/p>');
  //<RD>_DESCRIPTION:
  sLnIn = fSRRs(sLnIn, /<RD>_DESCRIPTION:(.*)/,
    '  ⋖p id="' + sId + 'dsn">Description::$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'dsn">⋖/a>⋖/p>');
  //<RD>_NAME.ENGLISH:
  sLnIn = fSRRs(sLnIn, /<RD>_NAME.ENGLISH:(.*)/,
    '  ⋖p id="' + sId + 'nam">Name::$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'nam">⋖/a>⋖/p>');
  //<RD>_ΟΝΟΜΑ.ΕΛΛ:
  sLnIn = fSRRs(sLnIn, /<RD>_ΟΝΟΜΑ.ΕΛΛ:(.*)/,
    '  ⋖p id="' + sId + 'namEll">NameGreek::$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'namEll">⋖/a>⋖/p>');
  //<RD>_GENERIC:
  sLnIn = fSRRs(sLnIn, /<RD>_GENERIC:(.*)/,
    '  ⋖p id="' + sId + 'gnc">Generic::$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'gnc">⋖/a>⋖/p>');
  //<RD>_SPECIFIC:
  sLnIn = fSRRs(sLnIn, /<RD>_SPECIFIC:(.*)/,
    '  ⋖p id="' + sId + 'Spc">Specific::$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'Spc">⋖/a>⋖/p>');
  //<RD>_ADDRESS.WPG:
  sLnIn = fSRRs(sLnIn, /<RD>_ADDRESS.WPG:(.*)/,
    '  ⋖p id="' + sId + 'wpa">AddressWpg::$1' +
    '\n    ⋖a class="clsHide" href="#' + sId + 'wpa">⋖/a>⋖/p>');
  //<RD>#idWavwprref1#[1]
  sLnIn = fSRRs(sLnIn, /<RD>#([ ]*)([^ #]+)([ #]+)(.*)/,
    '  ⋖p id="$2">$4' +
    '\n    ⋖a class="clsHide" href="#$2">⋖/a>⋖/p>');
  //<RD>
  if (sLnIn.startsWith('<RD>')) {
    a = sLnIn.match(/<RD>(.*)/);
    sTitle = a[1];
    sLnIn =
      '  ⋖p id="' + sId + 'P' + nP + '">' + sTitle +
      '\n    ⋖a class="clsHide" href="#' + sId + 'P' + nP + '">⋖/a>⋖/p>';
    nP = nP + 1;
  }

  oWs.write(sLnIn + '\n');
});

oInterface.on('close', function(){
  oWs.on('finish', function () {
    oWs.close();
  });
});

//error: D:\dirFTH\1f2hml.js:273
//    sId = 'id' + a[2];
//=> 273=<RD:"relation7", something wrong relation7 input.

//error:
//=> #rl7#

//error: <RD:"relation5">ppcnet'Resource #rl6: