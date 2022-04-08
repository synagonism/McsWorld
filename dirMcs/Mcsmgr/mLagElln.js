/*
 * mLagElln.js - module of Greek-language for the-browser.
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (synagonism)
 * kaseluris.nikos@gmail.com
 * https:// synagonism.net/
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
 */

import * as omLagUtil from './mLagUtil.js'
import * as omMcsh from './mMcsh.js'
//import fetch from 'node-fetch'

const
  // contains the-versions of mLagElln.js
  aVersion = [
    'mLagElln.js.0-1-0.2022-04-06: creation'
  ],
  sFileElln = omMcsh.sPathSite + 'dirMcs/dirLag/McsLag000020.last.html'

let
  aVerbEllnRegularNo = [],
  sMembers,
  oReadlines,
  oNextln,
  sLn

function fFindVerbEllnRegularNo () {
  oReadlines = new mfReadlines(sFileElln)
  while (oNextln = oReadlines.next()) {
    sLn = oNextln.toString()
    /*
    oOl = oDoc.getElementById('idLEnglvrbC1Spcdsn')
    for (let n = 0; n < aLi.length; n++) {
      let s = aLi[n].innerHTML
      if (s.indexOf('<strong>') >= 0)
        aVerbEllnRegularNo.push(s.substring(8, s.lastIndexOf('<')))
      else
        aVerbEllnRegularNo.push(s.substring(0, s.lastIndexOf(',')))
    }
    */
  }
}
//fFindVerbEllnRegularNo()

/*
 * DOING: it finds the-inflection-method of wordIn
 * INPUT:  'αγάπη', 'η αγάπη', bSinizisi
 * OUTPUT: [methods]
 */
function fFindMethodNounElln (sWordIn, bSinizisiIn) {
  let
    sGender = '', //masc, femi, neut
    sWord,
    aOut = [],
    nSyllable = -1 //1=liyusa, 2=paraliyusa, 3=proparaliyusa

  if (sWordIn.startsWith('ο ')) {sGender = 'masc'; sWord = sWordIn.substring(2)}
  else if (sWordIn.startsWith('η ')) {sGender = 'femi'; sWord = sWordIn.substring(2)}
  else if (sWordIn.startsWith('το ')) {sGender = 'neut'; sWord = sWordIn.substring(3)}
  else  sWord = sWordIn

  if (bSinizisiIn)
    nSyllable = omLagUtil.fGreektonosFindSyllable(sWord, true)
  else
    nSyllable = omLagUtil.fGreektonosFindSyllable(sWord)

  // endsWith /a/
  // nounEllnMaG3XarT2SuNcF1Ba-ουδέτερο-αρ-παρ-ήπ-αρ-ατος-ατα-άτων,
  if (sWord.endsWith('αρ'))
    aOut = ["nounEllnMaG3XarT2SuNcF1Ba-ουδέτερο-αρ-παρ-ήπ-αρ-ατος-ατα-άτων"]
  // nounEllnMnG1XasT1SuNcF1Ba-αρσενικό-ας-οξυ-ψαρ-άς-ά-άδες-άδων,
  // nounEllnMnG1XasT1SuNcF1Bnp-αρσενικό-ας-οξυ-ψαρ-άς-ά,
  else if (sWord.endsWith('άς'))
    aOut = [
      "nounEllnMnG1XasT1SuNcF1Ba-αρσενικό-ας-οξυ-ψαρ-άς-ά-άδες-άδων",
      "nounEllnMnG1XasT1SuNcF1Bnp-αρσενικό-ας-οξυ-ψαρ-άς-ά"]
  // nounEllnMnG1XasT1SuNcF1Bns-αρσενικό-ας-οξυ-ψαρ-άδες-άδων,
  else if (sWord.endsWith('άδες'))
    aOut = ["nounEllnMnG1XasT1SuNcF1Bns-αρσενικό-ας-οξυ-ψαρ-άδες-άδων"]
  // nounEllnMnaG1XasT2SeuNucF2Ba-αρσενικό-ας-παρ-πατ-έρας-έρα|ρός-έρα|ερ-εράδες|έρες-εράδων|έρων,
  else if (sWord.endsWith('πατέρας'))
    aOut = ["nounEllnMnaG1XasT2SeuNucF2Ba-αρσενικό-ας-παρ-πατ-έρας-έρα|ρός-έρα|ερ-εράδες|έρες-εράδων|έρων"]
  // nounEllnMnG1Xas2T2SuNuF1Ba-αρσενικό-ας-παρ-γιαλάκ-ιας-ια-ηδες-ηδων,
  else if (sWord.endsWith('κιας'))
    aOut = ["nounEllnMnG1Xas2T2SuNuF1Ba-αρσενικό-ας-παρ-γιαλάκ-ιας-ια-ηδες-ηδων"]
  // nounEllnMnaG1XasT2SuNcF2Ba-αρσενικό-ας-παρ-αμφορ-έας-α|έως-είς-έων,
  // nounEllnMnG1XasT2SuNuF1Ba-αρσενικό-ας-παρ-Αντρέ-ας-α-ηδες-ηδων,
  else if (sWord.endsWith('έας') && sGender !== 'neut')
    aOut = [
      "nounEllnMnaG1XasT2SuNcF2Ba-αρσενικό-ας-παρ-αμφορ-έας-α|έως-είς-έων",
      "nounEllnMnG1XasT2SuNuF1Ba-αρσενικό-ας-παρ-Αντρέ-ας-α-ηδες-ηδων",
      "nounEllnMnG3XasT2SuNcF1Ba-ουδέτερο-ας-παρ-κρέ-ας-ατος-ατα-άτων"]

  // nounEllnMnG3XasT2SuNcF1Ba-ουδέτερο-ας-παρ-κρέ-ας-ατος-ατα-άτων,
  // nounEllnMnG1XasT2SeNuF1Ba-αρσενικό-ας-παρ-αγών-ας-α-ες-ων,
  // nounEllnMnG1XasT2SeNcF1Ba-αρσενικό-ας-παρ-ταμί-ας-α-ες-ών,
  // nounEllnMnaG1XasT2SeNucF2Ba-αρσενικό-ας-παρ-μήν-ας-α|ός-ες-ών,
  // nounEllnMnG1XasT2SuNcF1Ba-αρσενικό-ας-παρ-ρήγ-ας-α-άδες-άδων,
  // nounEllnMnG1XasT2SeuNuF2Ba-αρσενικό-ας-παρ-αέρ-ας-α-ες|ηδες-ων|ηδων,
  // nounEllnMnG1XasT2SuNucF2Ba-αρσενικό-ας-παρ-Γρίβ-ας-α-ηδες|αίοι-ηδων|αίων-ηδες|αίους,
  else if (sWord.endsWith('ας') && nSyllable === 2 && sGender === 'neut')
    aOut = ["nounEllnMnG3XasT2SuNcF1Ba-ουδέτερο-ας-παρ-κρέ-ας-ατος-ατα-άτων"]
  else if (sWord.endsWith('ας') && nSyllable === 2 && sGender === 'masc')
    aOut = [
      "nounEllnMnG1XasT2SeNuF1Ba-αρσενικό-ας-παρ-αγών-ας-α-ες-ων",
      "nounEllnMnG1XasT2SeNcF1Ba-αρσενικό-ας-παρ-ταμί-ας-α-ες-ών",
      "nounEllnMnaG1XasT2SeNucF2Ba-αρσενικό-ας-παρ-μήν-ας-α|ός-ες-ών",
      "nounEllnMnG1XasT2SuNcF1Ba-αρσενικό-ας-παρ-ρήγ-ας-α-άδες-άδων",
      "nounEllnMnG1XasT2SeuNuF2Ba-αρσενικό-ας-παρ-αέρ-ας-α-ες|ηδες-ων|ηδων",
      "nounEllnMnG1XasT2SuNucF2Ba-αρσενικό-ας-παρ-Γρίβ-ας-α-ηδες|αίοι-ηδων|αίων-ηδες|αίους"]
  else if (sWord.endsWith('ας') && nSyllable === 2 )
    aOut = [
      "nounEllnMnG1XasT2SeNuF1Ba-αρσενικό-ας-παρ-αγών-ας-α-ες-ων",
      "nounEllnMnG1XasT2SeNcF1Ba-αρσενικό-ας-παρ-ταμί-ας-α-ες-ών",
      "nounEllnMnaG1XasT2SeNucF2Ba-αρσενικό-ας-παρ-μήν-ας-α|ός-ες-ών",
      "nounEllnMnG1XasT2SuNcF1Ba-αρσενικό-ας-παρ-ρήγ-ας-α-άδες-άδων",
      "nounEllnMnG1XasT2SeuNuF2Ba-αρσενικό-ας-παρ-αέρ-ας-α-ες|ηδες-ων|ηδων",
      "nounEllnMnG1XasT2SuNucF2Ba-αρσενικό-ας-παρ-Γρίβ-ας-α-ηδες|αίοι-ηδων|αίων-ηδες|αίους",
      "nounEllnMnG3XasT2SuNcF1Ba-ουδέτερο-ας-παρ-κρέ-ας-ατος-ατα-άτων"]

  // nounEllnMnG1XasT3SeNcF1Ba-αρσενικό-ας-προ-φύλακ-ας-α-ες-'ων,
  // nounEllnMnG1XasT3SeNuF1Ba-αρσενικό-ας-προ-βαρύμαγκ-ας-α-ες-ων,
  // nounEllnMnG1XasT3SuNcF1Ba-αρσενικό-ας-προ-Μπούκουρ-ας-α-αίοι-αίων-αίους,
  // nounEllnMnG1XasT3SeuNucF2Ba-αρσενικό-ας-προ-τσέλιγκ-ας-α-ες|άδες-άδων,
  else if (sWord.endsWith('ας') && nSyllable === 3 )
    aOut = [
      "nounEllnMnG1XasT3SeNcF1Ba-αρσενικό-ας-προ-φύλακ-ας-α-ες-'ων",
      "nounEllnMnG1XasT3SeNuF1Ba-αρσενικό-ας-προ-βαρύμαγκ-ας-α-ες-ων",
      "nounEllnMnG1XasT3SuNcF1Ba-αρσενικό-ας-προ-Μπούκουρ-ας-α-αίοι-αίων-αίους",
      "nounEllnMnG1XasT3SeuNucF2Ba-αρσενικό-ας-προ-τσέλιγκ-ας-α-ες|άδες-άδων"]

  // nounEllnMnG2XaT1SeNuF1Ba-θηλυκό-α-οξυ-καρδι-ά-άς-ές-ών,
  // nounEllnMnG2XaT1SuNcF1Ba-θηλυκό-α-οξυ-μαμ-ά-άς-άδες-άδων,
  // nounEllnMnG2XaT1SeuNucF2Ba-θηλυκό-α-οξυ-γιαγι-ά-άς-ές|άδες-άδων,
  else if (sWord.endsWith('ά'))
    aOut = [
      "nounEllnMnG2XaT1SeNuF1Ba-θηλυκό-α-οξυ-καρδι-ά-άς-ές-ών",
      "nounEllnMnG2XaT1SuNcF1Ba-θηλυκό-α-οξυ-μαμ-ά-άς-άδες-άδων",
      "nounEllnMnG2XaT1SeuNucF2Ba-θηλυκό-α-οξυ-γιαγι-ά-άς-ές|άδες-άδων"]

  // nounEllnMnG2XaT2SeNuF1Ba-θηλυκό-α-παρ-ελπίδ-α-ας-ες-δων,
  // nounEllnMnG2XaT2SeNcF1Ba-θηλυκό-α-παρ-σοφί-α-ας-ες-ών,
  // nounEllnMnG2XaT2SeNcF1Bu6-θηλυκό-α-παρ-νότ-α-ας-ες-(ών),
  // nounEllnMnG2XaT2SeNcF1Bn6-θηλυκό-α-παρ-πείν-α-ας-ες,
  // nounEllnMnG2XaT3SeNuF1Ba-θηλυκό-α-παρ-αρθρίτιδ-α-ας-ες-ων,
  else if (sWord.endsWith('α') && nSyllable === 2 )
    aOut = [
      "nounEllnMnG2XaT2SeNuF1Ba-θηλυκό-α-παρ-ελπίδ-α-ας-ες-δων",
      "nounEllnMnG2XaT2SeNcF1Ba-θηλυκό-α-παρ-σοφί-α-ας-ες-ών",
      "nounEllnMnG2XaT2SeNcF1Bu6-θηλυκό-α-παρ-νότ-α-ας-ες-(ών)",
      "nounEllnMnG2XaT2SeNcF1Bn6-θηλυκό-α-παρ-πείν-α-ας-ες",
      "nounEllnMnG2XaT3SeNuF1Ba-θηλυκό-α-παρ-αρθρίτιδ-α-ας-ες-ων"]
  
  // nounEllnMnG2XaT3SeNcF1Ba-θηλυκό-α-προ-θάλασσ-α-ας-ες-ών,
  // nounEllnMnG2XaT3SeNc2F1Ba-θηλυκό-α-προ-σάλπιγγ-α-ας-ες-'ων,
  // nounEllnMnG3XaT2SuNcF1Ba-ουδέτερο-α-παρ-κύμ-α-ατος-ατα-άτων,
  // nounEllnMnG3XaT3SuNcF1Ba-ουδέτερο-α-προ-όνομ-α-'ατος-'ατα-άτων,
  else if (sWord.endsWith('α') && nSyllable === 3 )
    aOut = [
      "nounEllnMnG2XaT3SeNcF1Ba-θηλυκό-α-προ-θάλασσ-α-ας-ες-ών",
      "nounEllnMnG2XaT3SeNc2F1Ba-θηλυκό-α-προ-σάλπιγγ-α-ας-ες-'ων",
      "nounEllnMnG3XaT2SuNcF1Ba-ουδέτερο-α-παρ-κύμ-α-ατος-ατα-άτων",
      "nounEllnMnG3XaT3SuNcF1Ba-ουδέτερο-α-προ-όνομ-α-'ατος-'ατα-άτων"]
  

  // endsWith /e/


  // endsWith /i/


  // endsWith /o/


  // endsWith /u/

  return aOut
}

/**
 * DOING: it finds info of a-Greek-case FROM example in dirLag/McsLag000020.last.html
 * INPUT:
 *  - sWordIn = αγάπη
 *  - sMethodIn = nounEllnMnG2XiT2SeNcF1Bn6
 * OUPUT: [table-members, note]
 */
async function fFindNounmbrElln (sWordIn, sMethodIn, bSinizisiIn) {
  let
    aCase = [],   // the-output cases as table-rows
    aMethod = [], // info of method
    aMcs,
    n,
    sStemM,    //stem nominativeSingular of method
    sStemMRem, //remove
    sStemMInc, //increase
    sStemMDec, //decrease
    sStemW,    //stem nominativeSingular of word
    sStemWRem,
    sStemWInc,
    sStemWDec,
    sStemW3,
    sStemMx, //
    sSufxM,
    sSufxMx,
    sWord = sWordIn, // ξαδέρφη
    sWordArti = sWordIn.substr(0, sWordIn.indexOf('/')), // ξαδέρφη-η
    sWordArtiPhnm = sWordIn.substr(sWordIn.indexOf('/')), // /ksadhérfi-i/
    sWordGS, //genitiveSingular
    sWordAS, //accusativeSingular
    sWordVS, //vocativeSingular
    sWordNP, //nominativePlural
    sWordGP, //genitivePlural
    sWordAP, //accusativePlurl
    sWordVP, //vocativePlural
    sWordX,
    bSinizisi = bSinizisiIn
    
  const response = await fetch(sFileElln)
  const sHtml = await response.text()
  aMcs = sHtml.toString().split('\n')

  //find the-index of method in McsLagElln
  n = aMcs.findIndex(function(sLn){
    return sLn.indexOf('"idLEllnnoun' +sMethodIn.substring(8) +'dsn"') > 1
  })
  //we found method
  sLn = aMcs[n+1] //<p>description::
  sLn = aMcs[n+2] //<br>× nounEllnMnG2Xi
  aCase.push(sLn.substring(10))
  aMethod.push(sLn.substring(10))
  sLn = aMcs[n+3] //</p>
  sLn = aMcs[n+4] //<table class="clsTblBorderNo">
  sLn = aMcs[n+5] //<tr><td>η<td>νύφ-η
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+6] //<tr><td>της<td>νύφ-ης
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+7] //<tr><td>την<td>νύφ-η
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+8] //<tr><td><td>νύφ-η
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+9] //<tr><td>οι<td>νύφ-ες|νυφ-άδες
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+10] //<tr><td>των<td>νυφ-άδων
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+11] //<tr><td>τις<td>νύφ-ες|νυφ-άδες
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  sLn = aMcs[n+12] //<tr><td><td>νύφ-ες|νυφ-άδες
  aCase.push(sLn.substring(6, sLn.lastIndexOf('>')+1))
  aMethod.push(sLn.substring(sLn.lastIndexOf('>')+1))
  //console.log(aMethod)
  //console.log(aCase)

  //find stems
  if (!sMethodIn.endsWith('Bns')) {
    sStemM = aMethod[1].substr(0, aMethod[1].indexOf('-'))
    sStemMRem = omLagUtil.fGreektonosRemove(sStemM)
    sStemMInc = omLagUtil.fGreektonosIncrease(sStemM, bSinizisi)
    sStemMDec = omLagUtil.fGreektonosDecrease(sStemM, bSinizisi)
    sSufxM = aMethod[1].substr(aMethod[1].lastIndexOf('-')+1)
  } else {
    // no singular
    sStemM = aMethod[5].substr(0, aMethod[5].indexOf('-'))
    sStemMRem = omLagUtil.fGreektonosRemove(sStemM)
    sStemMInc = omLagUtil.fGreektonosIncrease(sStemM, bSinizisi)
    sStemMDec = omLagUtil.fGreektonosDecrease(sStemM, bSinizisi)
    sSufxM = aMethod[5].substr(aMethod[5].lastIndexOf('-')+1)
  }
  sStemW = sWord.substr(0, sWord.length-sSufxM.length) //ξαδέρφ
  sStemWRem = omLagUtil.fGreektonosRemove(sStemW)
  sStemWInc = omLagUtil.fGreektonosIncrease(sStemW, bSinizisi)
  sStemWDec = omLagUtil.fGreektonosDecrease(sStemW, bSinizisi)
  //console.log(sStemWRem+', '+sStemWInc+', '+sStemWDec)

  //γενι-ενικ gs
  if (aMethod[2].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[2].split('|')
    sWordGS = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordGS = sWordGS +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordGS = fFindWordX(aMethod[2])
  }
  //console.log(sWordGS)

  /**
   * it returns a-member, given example method
   * INPUT: νότ-α, (νοτ-ών)
   */
  function fFindWordX(sMethexlIn) {
    if (sMethexlIn !== '∅') { //empty-set
      sStemMx = sMethexlIn.substr(0, sMethexlIn.indexOf('-'))
      sSufxMx = sMethexlIn.substr(sMethexlIn.indexOf('-')+1)
      //we do on wordIn, the-same function with methodX
      if (sStemMx === sStemM) sWordX = sStemW + sSufxMx
      else if (sStemMx === sStemMRem) sWordX = sStemWRem + sSufxMx
      else if (sStemMx === sStemMInc) sWordX = sStemWInc + sSufxMx
      else if (sStemMx === sStemMDec) sWordX = sStemWDec + sSufxMx
      //δύσχρηστο μέλος σε παρένθεση
      else if (sStemMx.substring(1) === sStemM) sWordX = '(' + sStemW + sSufxMx
      else if (sStemMx.substring(1) === sStemMRem) sWordX = '(' + sStemWRem + sSufxMx
      else if (sStemMx.substring(1) === sStemMInc) sWordX = '(' + sStemWInc + sSufxMx
      else if (sStemMx.substring(1) === sStemMDec) sWordX = '(' + sStemWDec + sSufxMx
      let sPhnm = omLagUtil.fGreekwordFindPhonema(sWordX, bSinizisi)
      if (sPhnm.indexOf('111') !== -1){
        //TODO: fix it from base-form
        console.log(sPhnm +'/' +sWordArtiPhnm)
      }
      sWordX = sWordX + sPhnm
      if (omLagUtil.fGreekwordHasSyllableOne(sWordX) == 1) {
        sWordX = omLagUtil.fGreektonosRemove(sWordX)
        sWordX = omLagUtil.fPhonemaTonosRemove(sWordX)
      }
    } else
      sWordX = '∅'
    return sWordX
  }
  
  if (!sMethodIn.endsWith('Bns')) {
    aCase[1] = aCase[1] + sWord + omLagUtil.fGreekwordFindPhonema(sWord, bSinizisi)
  } else {
    aCase[1] = aCase[1] + '∅'
  }
  aCase[2] = aCase[2] + sWordGS

  //αιτ-ενικ as
  if (aMethod[3].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[3].split('|')
    sWordAS = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordAS = sWordAS +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordAS = fFindWordX(aMethod[3])
  }
  aCase[3] = aCase[3] + sWordAS

  //κλητ-ενικ vs
  if (aMethod[4].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[4].split('|')
    sWordVS = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordVS = sWordVS +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordVS = fFindWordX(aMethod[4])
  }
  aCase[4] = aCase[4] + sWordVS

  //ονομ-πληθ np
  if (aMethod[5].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[5].split('|')
    sWordNP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordNP = sWordNP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordNP = fFindWordX(aMethod[5])
  }
  aCase[5] = aCase[5] + sWordNP

  //γενι-πληθ gp
  if (aMethod[6].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[6].split('|')
    sWordGP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordGP = sWordGP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordGP = fFindWordX(aMethod[6])
  }
  aCase[6] = aCase[6] + sWordGP

  //αιτ-πληθ ap
  if (aMethod[7].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[7].split('|')
    sWordAP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordAP = sWordAP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordAP = fFindWordX(aMethod[7])
  }
  aCase[7] = aCase[7] + sWordAP

  //κλητ-πληθ vp
  if (aMethod[8].indexOf('|') != -1) {
    //we have many forms
    const aExl = aMethod[8].split('|')
    sWordVP = fFindWordX(aExl[0]) 
    for (n=1; n<aExl.length; n++) {
      sWordVP = sWordVP +'|' +fFindWordX(aExl[n]) 
    }
  } else {
    sWordVP = fFindWordX(aMethod[8])
  }
  aCase[8] = aCase[8] + sWordVP

  let sCase =
    aCase[1] +
    aCase[2] +
    aCase[3] +
    aCase[4] +
    aCase[5] +
    aCase[6] +
    aCase[7] +
    aCase[8]

  return [sCase, aCase[0]]
}

/**
 * DOING: it finds the-members of a-Greek-adjective.
 */
function fFindAdjvmbrElln (sBaseIn, sMethodIn) {
  sMembers = sBaseIn
  return sMembers
}

/**
 * DOING: it finds the-members of a-Greek-verb.
 */
function fFindVerbmbrElln (sBaseIn, sMethodIn) {
  sMembers = sBaseIn
  return sMembers
}

export {
  aVerbEllnRegularNo,
  fFindMethodNounElln,
  fFindNounmbrElln
}
