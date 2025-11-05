/*
 * mLagEngl.js - module of English-language.
 * The MIT License (MIT)
 *
 * Copyright (c) 2021-2025 Kaseluris.Nikos.1959 (synagonism)
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
import * as omMcsh from './mMcsh2.js'

const
  // contains the-versions of mLagEngl.js
  aVersion = [
    'mLagEngl.js.1-0-0.2025-11-02: fFindNounForms',
    'mLagEngl.js.0-1-0.2021-11-22: creation'
  ],
  sFileEngl = omMcsh.sPathSite + 'dirMcs/dirLag/McsLag000011.last.html',
  aIrregulars = []

/**
 * DOING: searches sFormIn if it is an-existing irregular noun form
 * return: ['sFormIn!~englnounC1:form1;form2',...] if exists in my site
 * return: [] if not found.
 */
async function fIsIrregularNoun (sFormIn) {
  let
    aFormsOut = [],
    n,
    sMethod = ''

  // find the-irregular nouns
  // search which include sFormIn
  const aaJson = await omMcsh.fSearchName(sFormIn + '!~englnounC', 'lagEngl');
  for (n = 0; n < aaJson.length; n++) {
    sMethod = aaJson[n][0]
    aFormsOut.push(sMethod)
  }
  return aFormsOut
}

/**
 * DOING: searches sFormIn if it is an-existing irregular verb form
 * return: ['sFormIn!~englverbC1:form1;form2;form3;form4;form5',...] if exists in my site
 * return: [] if not found.
 */
async function fIsIrregularVerb (sFormIn) {
  let
    aFormsOut = [],
    n,
    sMethod = ''

  // find the-irregular verbs
  // search which include sFormIn
  const aaJson = await omMcsh.fSearchName(sFormIn + '!~englverbC', 'lagEngl');
  for (n = 0; n < aaJson.length; n++) {
    sMethod = aaJson[n][0]
    aFormsOut.push(sMethod)
  }
  return aFormsOut
}

/**
 * DOING: it finds the-EXISTING forms of English-nouns.
 * return: ['englnounA1:form1;form2',...]
 * return: [] if problem.
 */
async function fFindKnownNounForms (sFormIn) {
  let
    aaSuggestion = [],
    aFormsOut = [],
    n,
    sMethod = ''

  // find existing nouns
  aaSuggestion = await omMcsh.fSearchName(sFormIn +'!~englnoun', 'lagEngl')

  // search which include sFormIn
  for (n = 0; n < aaSuggestion.length; n++) {
    sMethod = aaSuggestion[n][0]
    aFormsOut.push(sMethod)
  }

  return aFormsOut
}

/**
 * DOING: it finds the-EXISTING forms of English-verbs.
 * return: ['englverbA1:form1;form2',...]
 * return: [] if problem.
 */
async function fFindKnownVerbForms (sFormIn) {
  let
    aaSuggestion = [],
    aFormsOut = [],
    n,
    sMethod = ''

  // find existing verbs
  aaSuggestion = await omMcsh.fSearchName(sFormIn +'!~englverb', 'lagEngl')

  for (n = 0; n < aaSuggestion.length; n++) {
    sMethod = aaSuggestion[n][0]
    // run!~englverbC!=fctRunning
    // run!~englverbC-1:run;runs;ran;running;run
    if (!sMethod.includes('!=')) aFormsOut.push(sMethod)
  }

  return aFormsOut
}

/**
 * DOING: finds existing or POSSIBLE forms of any English-noun.
 * return: ['englnounA2:form1;form2',...] if found
 * return: [] if problem.
 */
async function fFindNounForms (sFormIn) {
  let
    aFormsOut = [],
    n,
    sMethod = ''

  // search for existing
  const aOut = await fFindKnownNounForms(sFormIn)

  if (aOut.length >= 1) {
    // englnounA
    // englnounB
    // englnounC
    aFormsOut.push('SITE EXISTING FORMS:')
    aFormsOut.push(aOut)
    return aFormsOut
  } else {

    // find POSSIBLE forms
    aFormsOut.push('POSSIBLE FORMS:')

    // englnounB1.f|fe;ves: leaf;leaves | knife;knives
    if (sFormIn.endsWith('ves')) {
      aFormsOut.push('englnounB1.' + sFormIn.slice(0, -3) + 'f;' + sFormIn)
      aFormsOut.push('englnounB1.' + sFormIn.slice(0, -3) + 'fe;' + sFormIn)
      return aFormsOut
    }
    // englnounB2.(cons)y;(cons)ies: entity;entities, boy/boys
    else if (sFormIn.endsWith('ies') && fIsConsonantExceptY(sFormIn[sFormIn.length - 4])) {
      aFormsOut.push('englnounB2.' + sFormIn.slice(0, -3) + 'y;' + sFormIn)
      return aFormsOut
    }

    // englnounA2.∅;es   -ch|sh|s|x: torch,brush,bus,box
    else if (sFormIn.endsWith('ches') ||
        sFormIn.endsWith('shes') ||
        sFormIn.endsWith('ses') ||
        sFormIn.endsWith('xes') ) {
      aFormsOut.push('englnounA2.' + sFormIn.slice(0, -2) + ';' + sFormIn)
      return aFormsOut
    } else if (sFormIn.endsWith('ch') ||
        sFormIn.endsWith('sh') ||
        sFormIn.endsWith('x') ) {
      aFormsOut.push('englnounA2.' + sFormIn + ';' + sFormIn + 'es')
      return aFormsOut
    }

    // englnounB1.f|fe;ves: leaf;leaves | knife;knives
    else if (sFormIn.endsWith('f')) {
      aFormsOut.push('englnounB1.' + sFormIn + ';' + sFormIn.slice(0, -1) + 'ves')
      return aFormsOut
    } else if (sFormIn.endsWith('fe')) {
      aFormsOut.push('englnounB1.' + sFormIn + ';' + sFormIn.slice(0, -2) + 'ves')
      return aFormsOut
    }

    else if (sFormIn.endsWith('y') && fIsConsonantExceptY(sFormIn[sFormIn.length - 2])) {
      aFormsOut.push('englnounB2.' + sFormIn + ';' + sFormIn.slice(0, -1) + 'ies')
      return aFormsOut
    }

    // englnounA1-∅;s              car/cars
    else if (sFormIn.endsWith('s')) {
      aFormsOut.push('englnounA1.' + sFormIn.slice(0, -1) + ';' + sFormIn)
      aFormsOut.push('englnounA2.' + sFormIn + ';' + sFormIn + 'es')
      return aFormsOut
    } else if (/[a-zA-Z]$/.test(sFormIn)) {
      aFormsOut.push('englnounA1.' + sFormIn + ';' + sFormIn + 's')
      return aFormsOut
    }
  }
  return []
}

/**
 * DOING: finds existing or POSSIBLE forms of any English-verb.
 * return: ['englverbA2:form1;form2',...] if found
 * return: [] if problem.
 */
async function fFindVerbForms (sFormIn) {
  let
    aFormsOut = [],
    n,
    sChar,
    sForm = '',
    sMethod = ''

  // search for existing
  const aOut = await fFindKnownVerbForms(sFormIn)

  if (aOut.length >= 1) {
    // englverbA
    // englverbB
    // englverbC
    aFormsOut.push('SITE EXISTING FORMS:')
    aFormsOut.push(aOut)
    return aFormsOut
  } else {

    // find POSSIBLE forms
    aFormsOut.push('POSSIBLE FORMS:')

    // englverbA1.∅;s;ed;ing;ed: climb;climbs;climbed;climbing;climbed,
    // englverbA2.∅;s;ped;ping;ped: stop;stops;stopped;stopping;stopped,
    // englverbA3.∅;es;ed;ing;ed: miss;misses;missed;missing;missed,
    // englverbB1.e;es;ed;ing;ed: like;likes;liked;liking;liked,
    // englverbB2.y;ies;ied;ying;ied: study;studies;studied;studying;studied,
    
    // -ching: A3,
    // -shing: A3,
    // -ssing: A3,
    // -lling,
    // -ccing: 1 syl, 

    // -ling,
    // -ying,
    // -ched: A3,
    // -shed: A3,
    // -ssed: A3,
    // -ches: A3,
    // -shes: A3,
    // -sses: A3,

    // -oed: A3,
    // -oes: A3,
    // -xed: A3,
    // -xes: A3,
    // -ied,
    // -ing,
    // -ies,
    // -led,
    
    // -cc: A1,
    // -ed,
    // -es,

    // -w|x|y: A1,
    // -e,
    // -s,

    // 5 last chars    
    if (sFormIn.endsWith('ching')) {
      sForm = sFormIn.slice(0, -5)
      // englverbA3.touch;touches;touched;tou-ching;touched,
      aFormsOut.push('englverbA1.' +sForm+'ch;' +sForm+'ches;' +sForm+'ched;' +sForm+'ching;' +sForm+'ched')
      return aFormsOut
    }
    else if (sFormIn.endsWith('shing')) {
      sForm = sFormIn.slice(0, -5)
      // englverbA3.wash;washes;washed;wa-shing;washed,
      aFormsOut.push('englverbA1.' +sForm+'sh;' +sForm+'shes;' +sForm+'shed;' +sForm+'shing;' +sForm+'shed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ssing')) {
      sForm = sFormIn.slice(0, -5)
      // englverbA3.miss;misses;missed;mi-ssing;missed,
      aFormsOut.push('englverbA1.' +sForm+'ss;' +sForm+'sses;' +sForm+'ssed;' +sForm+'ssing;' +sForm+'ssed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('lling')) {
      sForm = sFormIn.slice(0, -5)
      // englverbCA2.travel;travels;traveled|travelled;traveling|trave-lling;traveled|travelled,
      aFormsOut.push('englverbA3.' +sForm+'l;' +sForm+'ls;' +sForm+'led|' +sForm+'lled;' +sForm+'ling|' +sForm+'lling;' +sForm+'led|' +sForm+'lled')
      // englverbA1.call;calls;called;ca-lling;called
      aFormsOut.push('englverbA1.' +sForm+'ll;' +sForm+'lls;' +sForm+'lled;' +sForm+'lling;' +sForm+'lled')
      return aFormsOut
    }
    else if (sFormIn.endsWith('bbing') || // grab grabbing
             sFormIn.endsWith('dding') || // forbid forbidding
             sFormIn.endsWith('ffing') ||
             sFormIn.endsWith('gging') ||
             sFormIn.endsWith('hhing') ||
             sFormIn.endsWith('jjing') ||
             sFormIn.endsWith('kking') ||
             sFormIn.endsWith('mming') ||
             sFormIn.endsWith('nning') ||
             sFormIn.endsWith('pping') ||
             sFormIn.endsWith('qqing') ||
             sFormIn.endsWith('rring') ||
             sFormIn.endsWith('tting') ||
             sFormIn.endsWith('vving') ||
             sFormIn.endsWith('zzing') 
            ) {
      sForm = sFormIn.slice(0, -5)
      sChar = sFormIn(sFormIn.length - 5)
      // if first part is one syllable 
      if (/^[bcdfghjklmnpqrstvwxyz]+[aeiou]$/i.test(sForm)) {
      // englverbA2.stop;stops;stopped;stopping;stopped,
      aFormsOut.push('englverbA2.' +sForm+sChar+';' +sForm+sChar+'s;' +sForm+sChar+sChar+'ed;'
        +sForm+sChar+sChar+'ing;' +sForm+sChar+sChar+'ed')
      return aFormsOut
      }
      else if (/[bcdfghjklmnpqrstvwxyz]+[aeiou]$/i.test(sForm)) {
      // englverbA2.forbid;forbids;forbidded;forbidding;forbidded,
      aFormsOut.push('englverbA2.' +sForm+sChar+';' +sForm+sChar+'s;' +sForm+sChar+sChar+'ed;'
        +sForm+sChar+sChar+'ing;' +sForm+sChar+sChar+'ed: IF stress on last syllable')
      return aFormsOut
      }
    }

    // 4 last
    else if (sFormIn.endsWith('ched')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.touch;touches;tou-ched;touching;touched,
      aFormsOut.push('englverbA3.' +sForm+'ch;' +sForm+'ches;' +sForm+'ched;' +sForm+'ching;' +sForm+'ched')
      return aFormsOut
    }
    else if (sFormIn.endsWith('shed')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.wash;washes;wa-shed;washing;washed,
      aFormsOut.push('englverbA3.' +sForm+'sh;' +sForm+'shes;' +sForm+'shed;' +sForm+'shing;' +sForm+'shed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ssed')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.miss;misses;mi-ssed;missing;missed,
      aFormsOut.push('englverbA3.' +sForm+'ss;' +sForm+'sses;' +sForm+'ssed;' +sForm+'ssing;' +sForm+'ssed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ches')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.touch;tou-ches;touched;touching;touched,
      aFormsOut.push('englverbA3.' +sForm+'ch;' +sForm+'ches;' +sForm+'ched;' +sForm+'ching;' +sForm+'ched')
      return aFormsOut
    }
    else if (sFormIn.endsWith('shes')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.wash;wa-shes;washed;washing;washed,
      aFormsOut.push('englverbA3.' +sForm+'sh;' +sForm+'shes;' +sForm+'shed;' +sForm+'shing;' +sForm+'shed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('sses')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.miss;mi-sses;missed;missing;missed,
      aFormsOut.push('englverbA3.' +sForm+'ss;' +sForm+'sses;' +sForm+'ssed;' +sForm+'ssing;' +sForm+'ssed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('oing')) {
      sForm = sFormIn.slice(0, -4)
      // englverbA3.veto;vetoes;vetoed;vet-oing;vetoed,
      aFormsOut.push('englverbA3.' +sForm+'o;' +sForm+'oes;' +sForm+'oed;' +sForm+'oing;' +sForm+'oed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ling')) {
      // englverbCA2.travel;travels;traveled|travelled;trave-ling|travelling;traveled|travelled,
      sForm = sFormIn.slice(0, -4)
      aFormsOut.push('englverbCA2.' +sForm+'l;' +sForm+'ls;' +sForm+'led|' +sForm+'lled;' +sForm+'ling|' +sForm+'lling;' +sForm+'led|' +sForm+'lled')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ying')) {
      // englverbB2.y;ies;ied;ying;ied: study;studies;studied;stud-ying;studied,
      sForm = sFormIn.slice(0, -4)
      aFormsOut.push('englverbB2.' +sForm+'y;' +sForm+'ies;' +sForm+'ied;' +sForm+'ying;' +sForm+'ied')
      return aFormsOut
    }

    // 3 last chars
    else if (sFormIn.endsWith('oed')) {
      sForm = sFormIn.slice(0, -3)
      // englverbA3.veto;vetoes;vet-oed;vetoing;vetoed,
      aFormsOut.push('englverbA3.' +sForm+'o;' +sForm+'oes;' +sForm+'oed;' +sForm+'oing;' +sForm+'oed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('oes')) {
      sForm = sFormIn.slice(0, -3)
      // englverbA3.veto;vet-oes;vetoed;vetoing;vetoed,
      aFormsOut.push('englverbA3.' +sForm+'o;' +sForm+'oes;' +sForm+'oed;' +sForm+'oing;' +sForm+'oed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('xed')) {
      sForm = sFormIn.slice(0, -3)
      // englverbA3.mix;mixes;mi-xed;mixing;mixed,
      aFormsOut.push('englverbA3.' +sForm+'x;' +sForm+'xes;' +sForm+'xed;' +sForm+'xing;' +sForm+'xed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('xes')) {
      sForm = sFormIn.slice(0, -3)
      // englverbA3.mix;mi-xes;mixed;mixing;mixed,
      aFormsOut.push('englverbA3.' +sForm+'x;' +sForm+'xes;' +sForm+'xed;' +sForm+'xing;' +sForm+'xed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ies')) {
      sForm = sFormIn.slice(0, -3)
      // englverbB2.y;ies;ied;ying;ied: study;stud-ies;studied;studying;studied,
      aFormsOut.push('englverbB2.' +sForm+'y;' +sForm+'ies;' +sForm+'ied;' +sForm+'ying;' +sForm+'ied')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ied')) {
      // englverbB2.y;ies;ied;ying;ied: study;studies;stud-ied;studying;studied,
      sForm = sFormIn.slice(0, -3)
      aFormsOut.push('englverbB2.' +sForm+'y;' +sForm+'ies;' +sForm+'ied;' +sForm+'ying;' +sForm+'ied')
      return aFormsOut
    }
    else if (sFormIn.endsWith('led')) {
      sForm = sFormIn.slice(0, -3)
      // englverbA3.travel;travels;trave-led|travelled;traveling|travelling;traveled|travelled,
      aFormsOut.push('englverbA3.' +sForm+'l;' +sForm+'ls;' +sForm+'led|' +sForm+'lled;' +sForm+'ling|' +sForm+'lling;' +sForm+'led|' +sForm+'lled')
      return aFormsOut
    }
    else if (sFormIn.endsWith('ing')) {
      sForm = sFormIn.slice(0, -3)
      // englverbA1.∅;s;ed;ing;ed: climb;climbs;climbed;climb-ing;climbed,
      aFormsOut.push('englverbA1.' +sForm+';' +sForm+'s;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      // englverbA3.∅;es;ed;ing;ed: miss;misses;missed;miss-ing;missed,
      aFormsOut.push('englverbA3.' +sForm+';' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      // englverbB1.e;es;ed;ing;ed: like;likes;liked;lik-ing;liked,
      aFormsOut.push('englverbB2.' +sForm+'e;' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      return aFormsOut
    }

    // 2 last chars
    else if (/[bcdfghjklmnpqrstvyz]{2}$/i.test(sFormIn)) {
      // ends in two conconants no wxy
      // englverbA1.∅;s;ed;ing;ed: climb;climbs;climbed;climb-ing;climbed,
      aFormsOut.push('englverbA1.' +sFormIn+';' +sFormIn+'s;' +sFormIn+'ed;' +sFormIn+'ing;' +sFormIn+'ed:  ends in 2 consonants')
    }
    else if (sFormIn.endsWith('ed')) {
      sForm = sFormIn.slice(0, -2)
      // englverbA1.∅;s;ed;ing;ed: climb;climbs;climb-ed;climbing;climbed,
      aFormsOut.push('englverbA1.' +sForm+';' +sForm+'s;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      // englverbA3.∅;es;ed;ing;ed: miss;misses;miss-ed;missing;missed,
      aFormsOut.push('englverbA3.' +sForm+';' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      // englverbB1.e;es;ed;ing;ed: like;likes;lik-ed;liking;liked,
      aFormsOut.push('englverbB2.' +sForm+'e;' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('es')) {
      sForm = sFormIn.slice(0, -2)
      // englverbA3.∅;es;ed;ing;ed: miss;miss-es;missed;missing;missed,
      aFormsOut.push('englverbA3.' +sForm+';' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      // englverbB1.e;es;ed;ing;ed: like;lik-es;liked;liking;liked,
      aFormsOut.push('englverbB2.' +sForm+'e;' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      return aFormsOut
    }

    // 1 last char
    else if (sFormIn.endsWith('w')) {
      // englverbA1.sho-w;shows;showd;liking;showd,
      aFormsOut.push('englverbA1.' +sFormIn+';' +sFormIn+'s;' +sFormIn+'ed;' +sFormIn+'ing;' +sFormIn+'ed')
      return aFormsOut
    }
    else if (sFormIn.endsWith('e')) {
      sForm = sFormIn.slice(0, -1)
      // englverbB1.e;es;ed;ing;ed: lik-e;likes;liked;liking;liked,
      aFormsOut.push('englverbA1.' +sForm+'e;' +sForm+'es;' +sForm+'ed;' +sForm+'ing;' +sForm+'ed')
      return aFormsOut
    }

    // englverbA1-∅;s              car/cars
    else if (sFormIn.endsWith('s')) {
      aFormsOut.push('englverbA1.' + sFormIn.slice(0, -1) + ';' + sFormIn)
      aFormsOut.push('englverbA2.' + sFormIn + ';' + sFormIn + 'es')
      return aFormsOut
    } else if (/[a-zA-Z]$/.test(sFormIn)) {
      aFormsOut.push('englverbA1.' + sFormIn + ';' + sFormIn + 's')
      return aFormsOut
    }
  }
  return []
}

/**
 * DOING: test in input char is consonant, except 'y'
 * INPUT: sCharIn
 * OUTPUT: boolean
 */
function fIsConsonantExceptY(sCharIn) {
  sCharIn = sCharIn.toLowerCase();
  // Ensure input is a single letter
  if (typeof sCharIn !== 'string' || sCharIn.length !== 1 || sCharIn === 'y') return false;

  return /[a-z]/.test(sCharIn) && !/[aeiou]/.test(sCharIn)
}

//console.log(await fFindNounForms('tomato'))
//console.log(fIsConsonantExceptY('t'))

export {
  fFindKnownNounForms,
  fFindNounForms,
  fIsConsonantExceptY,
  fIsIrregularNoun,
  fIsIrregularVerb
}
