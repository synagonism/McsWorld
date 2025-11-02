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
