import * as moLagUtil from './mLagUtil.js'
import * as moLagElln from './mLagElln.mjs'

console.log(fCreateWordinfo('ψάξιμο-το/psáksimo-to/','caseEllnMnG3XoT3SuNcF1Ba')[1])




/**
 * DOING: it creates an-array with word-info
 * INPUT:
 *  - sWordIn = 'ξαδέρφη-η/ksadhérfi-i/'
 *  - sMethodIn = caseEllnMnG2XiT2SeuNucF2Bo
 * OUTPUT: ["ξαδέρφη-η","  <p id="idWrdEllnksadhe9rfi-i"><span class="clsColorRed">ξαδέρφη-η/ksadhérfi-i/..."]
 */
function fCreateWordinfo(sWordIn, sMethodIn) {
  let
    aWordinfo = [],
    sWord = sWordIn.substring(0, sWordIn.indexOf('/')), //ξαδέρφη-η
    sPhonema = sWordIn.substring(sWordIn.indexOf('/')+1, sWordIn.length-1), //ksadhérfi-i
    sPhonemaPreview = moLagUtil.fPhonemaTonosReplace(sPhonema), //no tonos to have previews
    sMethod = sMethodIn,
    sLag = sMethod.substring(4, 8), //Elln
    sInfo,
    oCase

  aWordinfo[0] = sWord
  sInfo = '  <p id="idWrd' + sLag + sPhonemaPreview + '">' +
    '<span class="clsColorRed">' + sWordIn + '</span>::\n' +
    '    <br>* McsEngl.word' + sLag + '.' + sWordIn + '@word' + sLag + ',\n' +
    '    <br>* Mcs' + sLag + './' + sPhonema + '/' + sWord + '@word' + sLag + ',\n'

  oCase = moLagElln.fFindCaseinfoElln(sWordIn, sMethod)
  //console.log(oCase)
  /*{
    McsElln1: '.λέξηΕλλν.ξαδέρφη-η/ksadhérfi-i/@wordElln,',
    McsElln2: '.ουσιαστικό.ξαδέρφη-η/ksadhérfi-i/@wordElln,',
    sinNom: 'ξαδέρφη/ksadhérfi/',
    sinGen: 'ξαδέρφης/ksadhérfis/',
    sinAcc: 'ξαδέρφη/ksadhérfi/',
    sinVoc: 'ξαδέρφη/ksadhérfi/',
    pluNom: 'ξαδέρφες/ksadhérfes/|ξαδερφάδες/ksadherfádhes/',
    pluGen: 'ξαδερφάδων/ksadherfádhon/',
    pluAcc: 'ξαδέρφες/ksadhérfes/|ξαδερφάδες/ksadherfádhes/',
    pluVoc: 'ξαδέρφες/ksadhérfes/|ξαδερφάδες/ksadherfádhes/',
    Baseform: 'ξαδέρφη',
    Basespch: '/ksadhérfi/',
    functionality: 'μορφή',
    pos: 'ουσιαστικό',
    gender: 'θηλυκό',
    method: 'caseEllnMnG2XiT2SeuNucF2Bo-πτωτΕλλνΜνΓ2ΚιΤ2ΣιαΝαμΦ2Λο',
    members: 'ξαδέρφη/ksadhérfi/-ξαδέρφης/ksadhérfis/-ξαδέρφη/ksadhérfi/-ξαδέρφη/ksadhérfi/-ξαδέρφες/ksadhérfes/|ξαδερφάδες/ksadherfádhes/-ξαδερφάδων/ksadherfádhon/-ξαδέρφες/ksadhérfes/|ξαδερφάδες/ksadherfádhes/-ξαδέρφες/ksadhérfes/|ξαδερφάδες/ksadherfádhes/'
  }*/
  if (sLag === 'Elln') {
    sInfo = sInfo +
      '    <br>* McsElln' + oCase.McsElln1 + '\n' +
      '    <br>* McsElln' + oCase.McsElln2 + '\n'
    let
      aMember = [],
      oSetMember = new Set,
      sElm,
      sMember
    //ενικός-ονομαστική
    if (oCase.sinNom != '∅') {
      oSetMember.add(oCase.sinNom)
      sMember = oCase.sinNom + '!~ονομ-ενικ'
      if (oCase.sinGen.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|γενι-ενικ'
      if (oCase.sinAcc.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|αιτι-ενικ'
      if (oCase.sinVoc.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|κλητ-ενικ'
      if (oCase.pluNom.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|ονομ-πληθ'
      if (oCase.pluGen.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|γενι-πληθ'
      if (oCase.pluAcc.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|αιτι-πληθ'
      if (oCase.pluVoc.indexOf(oCase.sinNom) != -1)
        sMember = sMember + '|κλητ-πληθ'
      sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
    }
    //ενικός-γενική
    if (oCase.sinGen != '∅') {
      if (oCase.sinGen.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.sinGen)) {
          oSetMember.add(oCase.sinGen)
          sMember = oCase.sinGen + '!~γενι-ενικ'
          if (oCase.sinAcc.indexOf(oCase.sinGen) != -1)
            sMember = sMember + '|αιτι-ενικ'
          if (oCase.sinVoc.indexOf(oCase.sinGen) != -1)
            sMember = sMember + '|κλητ-ενικ'
          if (oCase.pluNom.indexOf(oCase.sinGen) != -1)
            sMember = sMember + '|ονομ-πληθ'
          if (oCase.pluGen.indexOf(oCase.sinGen) != -1)
            sMember = sMember + '|γενι-πληθ'
          if (oCase.pluAcc.indexOf(oCase.sinGen) != -1)
            sMember = sMember + '|αιτι-πληθ'
          if (oCase.pluVoc.indexOf(oCase.sinGen) != -1)
            sMember = sMember + '|κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.sinGen.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~γενι-ενικ'
            if (oCase.sinAcc.indexOf(sElm) != -1)
              sMember = sMember + '|αιτι-ενικ'
            if (oCase.sinVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-ενικ'
            if (oCase.pluNom.indexOf(sElm) != -1)
              sMember = sMember + '|ονομ-πληθ'
            if (oCase.pluGen.indexOf(sElm) != -1)
              sMember = sMember + '|γενι-πληθ'
            if (oCase.pluAcc.indexOf(sElm) != -1)
              sMember = sMember + '|αιτι-πληθ'
            if (oCase.pluVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }
    //ενικός-αιτιατική
    if (oCase.sinAcc != '∅') {
      if (oCase.sinAcc.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.sinAcc)) {
          oSetMember.add(oCase.sinAcc)
          sMember = oCase.sinAcc + '!~αιτι-ενικ'
          if (oCase.sinVoc.indexOf(oCase.sinAcc) != -1)
            sMember = sMember + '|κλητ-ενικ'
          if (oCase.pluNom.indexOf(oCase.sinAcc) != -1)
            sMember = sMember + '|ονομ-πληθ'
          if (oCase.pluGen.indexOf(oCase.sinAcc) != -1)
            sMember = sMember + '|γενι-πληθ'
          if (oCase.pluAcc.indexOf(oCase.sinAcc) != -1)
            sMember = sMember + '|αιτι-πληθ'
          if (oCase.pluVoc.indexOf(oCase.sinAcc) != -1)
            sMember = sMember + '|κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.sinAcc.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~αιτι-ενικ'
            if (oCase.sinVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-ενικ'
            if (oCase.pluNom.indexOf(sElm) != -1)
              sMember = sMember + '|ονομ-πληθ'
            if (oCase.pluGen.indexOf(sElm) != -1)
              sMember = sMember + '|γενι-πληθ'
            if (oCase.pluAcc.indexOf(sElm) != -1)
              sMember = sMember + '|αιτι-πληθ'
            if (oCase.pluVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }
    //ενικός-κλητική
    if (oCase.sinVoc != '∅') {
      if (oCase.sinVoc.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.sinVoc)) {
          oSetMember.add(oCase.sinVoc)
          sMember = oCase.sinVoc + '!~κλητ-ενικ'
          if (oCase.pluNom.indexOf(oCase.sinVoc) != -1)
            sMember = sMember + '|ονομ-πληθ'
          if (oCase.pluGen.indexOf(oCase.sinVoc) != -1)
            sMember = sMember + '|γενι-πληθ'
          if (oCase.pluAcc.indexOf(oCase.sinVoc) != -1)
            sMember = sMember + '|αιτι-πληθ'
          if (oCase.pluVoc.indexOf(oCase.sinVoc) != -1)
            sMember = sMember + '|κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.sinVoc.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~κλητ-ενικ'
            if (oCase.pluNom.indexOf(sElm) != -1)
              sMember = sMember + '|ονομ-πληθ'
            if (oCase.pluGen.indexOf(sElm) != -1)
              sMember = sMember + '|γενι-πληθ'
            if (oCase.pluAcc.indexOf(sElm) != -1)
              sMember = sMember + '|αιτι-πληθ'
            if (oCase.pluVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }
    //πληθυντικός-ονομαστική
    if (oCase.pluNom != '∅') {
      if (oCase.pluNom.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.pluNom)) {
          oSetMember.add(oCase.pluNom)
          sMember = oCase.pluNom + '!~ονομ-πληθ'
          if (oCase.pluGen.indexOf(oCase.pluNom) != -1)
            sMember = sMember + '|γενι-πληθ'
          if (oCase.pluAcc.indexOf(oCase.pluNom) != -1)
            sMember = sMember + '|αιτι-πληθ'
          if (oCase.pluVoc.indexOf(oCase.pluNom) != -1)
            sMember = sMember + '|κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.pluNom.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~ονομ-πληθ'
            if (oCase.pluGen.indexOf(sElm) != -1)
              sMember = sMember + '|γενι-πληθ'
            if (oCase.pluAcc.indexOf(sElm) != -1)
              sMember = sMember + '|αιτι-πληθ'
            if (oCase.pluVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }
    //πληθυντικός-γενική
    if (oCase.pluGen != '∅') {
      if (oCase.pluGen.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.pluGen)) {
          oSetMember.add(oCase.pluGen)
          sMember = oCase.pluGen + '!~γενι-πληθ'
          if (oCase.pluAcc.indexOf(oCase.pluGen) != -1)
            sMember = sMember + '|αιτι-πληθ'
          if (oCase.pluVoc.indexOf(oCase.pluGen) != -1)
            sMember = sMember + '|κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.pluGen.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~γενι-πληθ'
            if (oCase.pluAcc.indexOf(sElm) != -1)
              sMember = sMember + '|αιτι-πληθ'
            if (oCase.pluVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }
    //πληθυντικός-αιτιατική
    if (oCase.pluAcc != '∅') {
      if (oCase.pluAcc.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.pluAcc)) {
          oSetMember.add(oCase.pluAcc)
          sMember = oCase.pluAcc + '!~αιτι-πληθ'
          if (oCase.pluVoc.indexOf(oCase.pluAcc) != -1)
            sMember = sMember + '|κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.pluAcc.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~αιτι-πληθ'
            if (oCase.pluVoc.indexOf(sElm) != -1)
              sMember = sMember + '|κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }
    //πληθυντικός-κλητική
    if (oCase.pluVoc != '∅') {
      if (oCase.pluVoc.indexOf('|') === -1) {
        // if not stored
        if (!oSetMember.has(oCase.pluVoc)) {
          oSetMember.add(oCase.pluVoc)
          sMember = oCase.pluVoc + '!~κλητ-πληθ'
          sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
        }
      } else {
        aMember = oCase.pluVoc.split('|')
        for (sElm of aMember) {
          if (!oSetMember.has(sElm)) {
            oSetMember.add(sElm)
            sMember = sElm + '!~κλητ-πληθ'
            sInfo = sInfo + '    <br>* McsElln.' + sMember + ':' + sWord + '@wordElln,\n'
          }
        }
      }
    }

  }

  sInfo = sInfo +
    '    <br>\n' +
    '    <br>× base-form: ' + oCase.Baseform + '\n' +
    '    <br>× base-pronunciation: ' + oCase.Basespch + '\n' +
    '    <br>× functionality: ' + oCase.functionality + '\n' +
    '    <br>× pos: ' + oCase.pos + '\n' +
    '    <br>× gender: ' + oCase.gender + '\n' +
    '    <br>× members: ' + oCase.members + '\n' +
    '    <br>× inflection-method: <a class="clsPreview" href="../../dirLag/McsLag000020.last.html#idLEllncase' 
            + oCase.method.substring(8, oCase.method.indexOf('-')) + '">' + oCase.method + '</a>\n' +
    '    <br>× el.wiktionary.org: <a href="https://el.wiktionary.org/wiki/' + oCase.Baseform + '">' + oCase.Baseform + '</a>\n' +
    '    <a class="clsHide" href="#idWrd' +sLag + sPhonemaPreview + '"></a></p>'

  aWordinfo[1] = sInfo
  return aWordinfo
}
