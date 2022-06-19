var
  moFs = require('fs'),
  mfReadlines = require('n-readlines'); // npm install n-readlines

module.exports = {
  /*
   * Find the-specific-attributes of a-concept.
   * Specific-attributes of a-concept[1] are the-attributes
   * inherited TO its[1] specifics.
   * The-attributes '-sG, -sGN'.
   * INPUT: the-path of concept.
   * OUTPUT: string of <ol> with the-attributes
   */
  fAttSpcRsOl: function(sMcsIn) {
    var
      aMcsln = moFs.readFileSync(sMcsIn).toString().split('\n'),
      bAtt = false; //we are inside a-specific-attribute
      sLast = 'none';
      sOl = '<ol>';

      for (var n = 0; n < aMcsln.length; n++) {
        var
          sLn = aMcsln[n];
        if (sLn.startsWith('<section ')) {
           if (sLn.endsWith('-sG">') || sLn.endsWith('-sGN">')) {
             bAtt = true;
           } else {
             bAtt = false;
           }
        }

        if (bAtt && sLn.startsWith("  <h1 ")) {
          if (sLast === 'none' || sLast === 'h1') {
            sOl += '\n<li><a href="' + fIdRs(sLn) +'">' +
                   fTitleRs(sLn) +'</a>';
          } else if (sLast === 'h2') {
            sOl += '</ol><li><a href="' + fIdRs(sLn) +'">' +
                   fTitleRs(sLn) +'</a></li>';
          } else if (sLast === 'h3') {
            sOl += '</ol></ol><li><a href="' + fIdRs(sLn) +'">' +
                   fTitleRs(sLn) +'</a></li>';
          }
          sLast = 'h1';
        }
      }

      sOl += '\n</ol>';
      return sOl;
  },

  /*
   * Find THE-FIRST generic-concept of a-concept[a].
   * INPUT: the-path of concept[a].
   * OUTPUT: string of path of generic-concept.
   */
  fCptFindRs: function(sMcsIn) {
    var
      aMcsln = moFs.readFileSync(sMcsIn).toString().split('\n'),
      sDir = fDirRs(sMcsIn),
      sPath = '';

      for (var n = 0; n < aMcsln.length; n++) {
        var
          sLn = aMcsln[n];
        if (sLn.indexOf('H1">GENERIC') != -1) {
          //n  <h1 id="idBcngncH1">GENERIC-of--Blkc-net
          //n+1    <a class="clsHide" href="#idBcngncH1"></a></h1>
          //n+2  <p id="idBcngncP1">Generic::
          //n+3    <br>* <a class="clsPreview" href="filMcsDtcnet.html#idDescription">Decentralized-transaction-chain--network</a>,
          sLn = aMcsln[n+3];
          sPath = fHrefRs(sLn);
          break;
        }
      }
      return sDir + sPath;
  },

  /*
   * Find THE-FIRST generic-concept of a-concept[a].
   * INPUT: the-path of concept[a].
   * OUTPUT: string of path of generic-concept.
   */
  fCptGnrFindRs: function(sMcsIn) {
    var
      aMcsln = moFs.readFileSync(sMcsIn).toString().split('\n'),
      sDir = fDirRs(sMcsIn),
      sPath = '';

      for (var n = 0; n < aMcsln.length; n++) {
        var
          sLn = aMcsln[n];
        if (sLn.indexOf('H1">GENERIC') != -1) {
          //n  <h1 id="idBcngncH1">GENERIC-of--Blkc-net
          //n+1    <a class="clsHide" href="#idBcngncH1"></a></h1>
          //n+2  <p id="idBcngncP1">Generic::
          //n+3    <br>* <a class="clsPreview" href="filMcsDtcnet.html#idDescription">Decentralized-transaction-chain--network</a>,
          sLn = aMcsln[n+3];
          sPath = fHrefRs(sLn);
          break;
        }
      }
      return sDir + sPath;
  }
}

/*
 * INPUT: 'dirTchInf/filMcsBcnnet.html'
 * OUTPUT: 'dirTchInf/'
 */
function fDirRs(sMcsIn) {
  return sMcsIn.substring(0, sMcsIn.lastIndexOf('/')+1);
}


/*
 * INPUT: '  <h1 id="idBcnnam">Name-of-blockchain'
 * OUTPUT: 'idBcnnam'
 */
function fIdRs(sLnIn) {
  return sLnIn.substring(sLnIn.indexOf('"')+1, sLnIn.lastIndexOf('"'));
}


/*
 * INPUT: '<br>* <a class="clsPreview" href="filMcsDtcnet.html#idDescription">Decentralized-transaction-chain--network</a>,'
 * OUTPUT: 'filMcsDtcnet.html'
 */
function fHrefRs(sLnIn) {
  var s = sLnIn.substring(sLnIn.indexOf('href="')+6);
  return s.substring(0, s.search(/[#"]/));
}

/*
 * INPUT: '  <h1 id="idBcnnam">Name-of-blockchain'
 * OUTPUT: 'Name-of-blockchain'
 */
function fTitleRs(sLnIn) {
  return sLnIn.substring(sLnIn.indexOf('">')+2);
}