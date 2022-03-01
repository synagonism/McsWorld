/*
 * mLagUtil.js - module with misc util language functions.
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Kaseluris.Nikos.1959 (synagonism)
 * kaseluris.nikos@gmail.com
 * https://synagonism.net/
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

const
  // contains the-versions of mLagUtil.js
  aVersion = [
    'mLagUtil.js.0-5-2.2022-03-01: fGreekwordFindPhonemic',
    'mLagUtil.js.0-5-0.2022-02-27: fGreektonosIncrease',
    'mLagUtil.js.0-5-0.2022-02-26: fGreekwordHasSinizisi',
    'mLagUtil.js.0-4-1.2022-02-24: fGreekwordFindPhonemic',
    'mLagUtil.js.0-4-0.2022-02-23: fPhonemaRemoveTonos',
    'mLagUtil.js.0-3-0.2022-02-15: fGreekwordFindPhonemic',
    'mLagUtil.js.0-2-0.2022-01-18: translated from java',
    'mLagUtil.js.0-1-0.2022-01-17: creation'
  ]

/*
 * DOING: it removes the-tonos from a-phonema
 * INPUT: nífi
 * OUTPUT: nifi
 */
function fPhonemaRemoveTonos (sPhonemaIn) {
  if (sPhonemaIn.indexOf('á') != -1)
    return sPhonemaIn.replace('á','a')
  else if (sPhonemaIn.indexOf('é') != -1)
    return sPhonemaIn.replace('é','e')
  else if (sPhonemaIn.indexOf('í') != -1)
    return sPhonemaIn.replace('í','i')
  else if (sPhonemaIn.indexOf('ó') != -1)
    return sPhonemaIn.replace('ó','ο')
  else if (sPhonemaIn.indexOf('ú') != -1)
    return sPhonemaIn.replace('ú','u')
  else if (sPhonemaIn.indexOf('à') != -1)
    return sPhonemaIn.replace('à','a')
  else if (sPhonemaIn.indexOf('è') != -1)
    return sPhonemaIn.replace('è','e')
  else if (sPhonemaIn.indexOf('ì') != -1)
    return sPhonemaIn.replace('ì','i')
  else if (sPhonemaIn.indexOf('ò') != -1)
    return sPhonemaIn.replace('ò','ο')
  else if (sPhonemaIn.indexOf('ù') != -1)
    return sPhonemaIn.replace('ù','u')
  else
    return sPhonemaIn
}

/**
 * DOING: it returns the-chars of codepoints.
 * INPUT:
 *    sCpIn = a-string of codepoints separated with '-'.
 * OUTPUT:
 *    denoted chars.
 */
function fFindCharsIfCodepoints (sCpIn) {
  let
    aIn = sCpIn.split('-'),
    n,
    nIn,
    sOut = ''

  for (n = 0; n < aIn.length; n++) {
    nIn = Number(aIn[n])
    sOut = sOut + String.fromCodePoint(nIn)
  }
  return sOut
}

/**
 * DOING: it returns the-codepoints of chars
 * INPUT:
 *    sCharsIn = the-input chars.
 * OUTPUT:
 *    a-string of codepoints separated with '-'
 */
function fFindCodepointsIfChars (sCharsIn) {
  let
    sIn = sCharsIn,
    n,
    sOut = ''

  for (n = 0; n < sIn.length; n++) {
    if (sIn.charCodeAt(n) >= 55296 && sIn.charCodeAt(n) <= 56319) {
      //on high-surrogates do not count the low-surrogate
      sOut = sOut + sIn.codePointAt(n) + '-'
      n = n+1
    } else {
      sOut = sOut + sIn.codePointAt(n) + '-'
    }
  }
  return sOut.substring(0, sOut.length-1)
}

/**
 * DOING: it returns the-first letters of a-word.
 * INPUT:
 *    sWordIn = the-input word.
 *    nPrefixIn = the-number of first letters we want.
 */
function fFindLettersFirstIfPrefix (sWordIn, nPrefixIn) {
  return sWordIn.substring(0, nPrefixIn)
}

/**
 * DOING: it returns the-first letters of a-word, given suffix.
 * INPUT:
 *    sWordIn = the-input word.
 *    nSuffixIn = the-number of last letters given.
 */
function fFindLettersFirstIfSuffix (sWordIn, nSuffixIn) {
  return sWordIn.substring(0, sWordIn.length - nSuffixIn)
}

/**
 * DOING: it returns the-last letters of a-word.
 * INPUT:
 *    sWordIn = the-input word.
 *    nPrefixIn = the-number of first letters given.
 */
function fFindLettersLastIfPrefix (sWordIn, nPrefixIn) {
  return sWordIn.substring(nPrefixIn, sWordIn.length)
}

/**
 * DOING: it returns the-last letters of a-word.
 * INPUT:
 *    sWordIn = the-input word.
 *    nSuffixIn = the-number of last letters given.
 */
function fFindLettersLastIfSuffix (sWordIn, nSuffixIn) {
  return sWordIn.substring(sWordIn.length - nSuffixIn, sWordIn.length)
}

/**
 * DOING: it returns the-index of Greek-tonos.
 *    if a-phoneme has 2 letters, it returns the-index of first.
 *    to express that consequitive-vowels constitute one syllable
 *    we use 'j': βjά-ζο-μαι, βι-ο-λο-γί-α
 *
 *          ** τα ΔΙΨΗΦΑ ΦΩΝΗΕΝΤΑ
 *            εί,οί,αί,ού θεωρούνται μία συλλαβή.
 *          ** Οι συνδυασμοί αύ,εύ, θεωρούνται μία συλλαβή.
 *          ** Οι παρακάτω Καταχρηστικοί-δίφθογγοι κάνουν μία συλλαβή:
 *            ια    πιά-νω  | πιές
 *            υα    γυα-λί
 *            εια   θειά-φι/βοή-θεια
 *            οια   ποιά    | ποιές | ποιοί | ποιούς
 *          ** Οι ΔΙΦΘΟΓΓΟΙ κάνουν μία συλλαβή:
 *            αι  νε-ράι-δα
 *            αη  αη-δό-νι
 *            οι  ρόι-δι
 *            οη  βόη-θα
 */
function fGreektonosFindIndex(sWordIn) {
  let
    nTonos = -1

  sWordIn = sWordIn.toLowerCase() 

  if (sWordIn.indexOf("ά") != -1) {
    if (sWordIn.indexOf("ά") != 0) {
      //δεν υπάρχει άλλος τρόπος να καταλάβει πότε ΠΡΟΦΕΡΕΤΑΙ μαζί. 2001-04-08
      //ΑΝ το άκουγε, ΤΟΤΕ θα το καταλάβαινε!!
      //ψηφιακό, δημόσια, ακρίβεια, σπάνια, τεράστια, τεράστιες,
      //για, έπιασα, χρόνια, μάτια, τεράστιες,
      if (sWordIn.charAt(sWordIn.indexOf("ά")-1) == 'j' ) //καταχρηστικός δίφθογγος.
        nTonos = sWordIn.indexOf("ά")-1
      else
        nTonos = sWordIn.indexOf("ά")
    }
    else
      nTonos = sWordIn.indexOf("ά")
  }
  else if (sWordIn.indexOf("έ") != -1) {
    if (sWordIn.indexOf("έ") != 0) {
      if (sWordIn.charAt(sWordIn.indexOf("έ")-1) == 'j' ) //καταχρηστικός δίφθογγος.
        nTonos = sWordIn.indexOf("έ")-1
      else
        nTonos = sWordIn.indexOf("έ")
    }
    else
      nTonos = sWordIn.indexOf("έ")
  }
  else if (sWordIn.indexOf("ή") != -1) {
    nTonos = sWordIn.indexOf("ή")
  }
  else if (sWordIn.indexOf("ί") != -1)  {
    if (sWordIn.indexOf("ί") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("ί")-1) == 'ε'    //ει
          ||sWordIn.charAt(sWordIn.indexOf("ί")-1) == 'ο'    //οι
          ||sWordIn.charAt(sWordIn.indexOf("ί")-1) == 'α' )  //αι
        nTonos = sWordIn.indexOf("ί")-1
      else
        nTonos = sWordIn.indexOf("ί")
    }
    else
      nTonos = sWordIn.indexOf("ί")
  }
  else if (sWordIn.indexOf("ό") != -1) {
    nTonos = sWordIn.indexOf("ό")
  }
  else if (sWordIn.indexOf("ύ") != -1) {
    if (sWordIn.indexOf("ύ") != 0)
    {
      //if previous letter o, decrease tonos.
      if (  sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.indexOf("ύ")-1) == 'ε' ) //εύ, απαγορεύεται
        nTonos = sWordIn.indexOf("ύ")-1
      else
        nTonos = sWordIn.indexOf("ύ")
    }
    else
      nTonos = sWordIn.indexOf("ύ")
  }
  else if (sWordIn.indexOf("ώ") != -1) {
    nTonos = sWordIn.indexOf("ώ")
  }
  else if (sWordIn.indexOf("ΰ") != -1) {
    nTonos = sWordIn.indexOf("ΰ")
  }
  else if (sWordIn.indexOf("ΐ") != -1) {
    nTonos = sWordIn.indexOf("ΐ")
  }
  return nTonos
}

/*
 * DOING: it removes the-tonos from a-word.
 */
function fGreektonosRemove (sWordIn) {
  if (sWordIn.indexOf("ά") != -1)
    return sWordIn.replace('ά','α')
  else if (sWordIn.indexOf("έ") != -1)
    return sWordIn.replace('έ','ε')
  else if (sWordIn.indexOf("ή") != -1)
    return sWordIn.replace('ή','η')
  else if (sWordIn.indexOf("ί") != -1)
    return sWordIn.replace('ί','ι')
  else if (sWordIn.indexOf("ό") != -1)
    return sWordIn.replace('ό','ο')
  else if (sWordIn.indexOf("ύ") != -1)
    return sWordIn.replace('ύ','υ')
  else if (sWordIn.indexOf("ώ") != -1)
    return sWordIn.replace('ώ','ω')
  else if (sWordIn.indexOf("ΰ") != -1)
    return sWordIn.replace('ΰ','ϋ')
  else if (sWordIn.indexOf("ΐ") != -1)
    return sWordIn.replace('ΐ','ϊ')
  else
    return sWordIn
}

/*
 * DOING: it removes the-first tonos from a-word.
 *    we need this method in cases where we create a-word-member, and the-word
 *    has 2 tonos the-old (from stem) and the-new (from suffix).
 */
function fGreektonosRemoveFirst (sWordIn) {
  let
    nIndexFirst,
    nIndexOne=-1,
    nIndexTwo=-1,
    sChar

  sWordIn = sWordIn.toLowerCase()

  //find first tonos-index
  if (sWordIn.indexOf("ά") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ά")
    else nIndexTwo = sWordIn.indexOf("ά")
  else if (sWordIn.indexOf("έ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("έ")
    else nIndexTwo = sWordIn.indexOf("έ")
  else if (sWordIn.indexOf("ή") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ή")
    else nIndexTwo = sWordIn.indexOf("ή")
  else if (sWordIn.indexOf("ί") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ί")
    else nIndexTwo = sWordIn.indexOf("ί")
  else if (sWordIn.indexOf("ό") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ό")
    else nIndexTwo = sWordIn.indexOf("ό")
  else if (sWordIn.indexOf("ύ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ύ")
    else nIndexTwo = sWordIn.indexOf("ύ")
  else if (sWordIn.indexOf("ώ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ώ")
    else nIndexTwo = sWordIn.indexOf("ώ")
  else if (sWordIn.indexOf("ΰ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ΰ")
    else nIndexTwo = sWordIn.indexOf("ΰ")
  else if (sWordIn.indexOf("ΐ") != -1)
    if (nIndexOne != -1) nIndexOne = sWordIn.indexOf("ΐ")
    else nIndexTwo = sWordIn.indexOf("ΐ")
  if (nIndexOne < nIndexTwo)
    nIndexFirst = nIndexOne
  else
    nIndexFirst = nIndexTwo

  //find the letter of first tonos.
  sChar = sWordIn.charAt(nIndexFirst)

  if (sChar == 'ά')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"α"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'έ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ε"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ή')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"η"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ί')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ι"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ό')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ο"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ύ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"υ"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ώ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ω"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ΰ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"υ"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else if (sChar == 'ΐ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ι"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length)
  else
    return sWordIn
}

/*
 * DOING: it finds the-syllable of tonos and returns it.
 * OUTPUT: 
 *       1 for ligousa
 *       2 for paraligousa
 *       3 for proparaligousa
 *       -1 for a mistake
 */
function fGreektonosFindSyllable (sWordIn) {
  sWordIn = sWordIn.toLowerCase()
  let
    nTonos = fGreektonosFindIndex(sWordIn),
    nLiyusa =-1,
    nParaliyusa =-1,
    nProparaliyusa =-1

  sWordIn = fGreektonosRemove(sWordIn)
  nLiyusa = fGreekvowelindexFindLast(sWordIn)
  if (nLiyusa != -1)
    nParaliyusa = fGreekvowelindexFindLast(sWordIn.substring(0, nLiyusa))
  if (nParaliyusa != -1)
    nProparaliyusa = fGreekvowelindexFindLast(sWordIn.substring(0, nParaliyusa))

  if (nTonos == nLiyusa)
    return 1
  else if (nTonos == nParaliyusa)
    return 2
  else if (nTonos == nProparaliyusa)
    return 3
  else
    return -1 //in case of a-mistake.
}

/*
 * DOING: it sets the-tonos on liyusa.
 * INPUT: the-word has no tonos.
 */
function fGreektonosSetOnLiyusa (sWordIn) {
  let
    nVowelLast

  sWordIn = sWordIn.toLowerCase()
  //find the MAX index of vowels.
  nVowelLast = fGreekvowelindexFindLast(sWordIn)

  return fGreektonosSetOnIndex(sWordIn, nVowelLast)
}

/*
 * DOING: it set the-tonos on paraliyusa.
 * INPUT: the-word has no tonos.
 */
function fGreektonosSetOnParaliyusa (sWordIn) {
  let
    nVowelLast,
    sWord2

  sWordIn = sWordIn.toLowerCase()
  nVowelLast = fGreekvowelindexFindLast(sWordIn)
  sWord2 = sWordIn.substring(0, nVowelLast)
  nVowelLast = fGreekvowelindexFindLast(sWord2)
  return fGreektonosSetOnIndex(sWordIn, nVowelLast)
}

/*
 * DOING: it set the-tonos on index.
 * INPUT: the-word has no tonos.
 */
function fGreektonosSetOnIndex (sWordIn, nVowelLast) {
  let
    sChar

  sChar = sWordIn.charAt(nVowelLast)

  if (sChar == 'α')
  {
    //if α is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else
        return sWordIn.substring(0, nVowelLast) +"ά" +sWordIn.substring(nVowelLast+1, sWordIn.length)
    }
    else
      return sWordIn.substring(0, nVowelLast) +"ά" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  }
  else if (sChar == 'ε')
  {
    //if ε is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else
        return sWordIn.substring(0, nVowelLast) +"έ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
    }
    else
      return sWordIn.substring(0, nVowelLast) +"έ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  }
  else if (sChar == 'ο')
  {
    //if ο is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length)
      else
        return sWordIn.substring(0, nVowelLast) +"ό" +sWordIn.substring(nVowelLast+1, sWordIn.length)
    }
    else
      return sWordIn.substring(0, nVowelLast) +"ό" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  }
  else if (sChar == 'η')
    return  sWordIn.substring(0, nVowelLast) +"ή" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ι')
    return  sWordIn.substring(0, nVowelLast) +"ί" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'υ')
    return  sWordIn.substring(0, nVowelLast) +"ύ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ω')
    return  sWordIn.substring(0, nVowelLast) +"ώ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ϋ')
    return  sWordIn.substring(0, nVowelLast) +"ΰ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else if (sChar == 'ϊ')
    return  sWordIn.substring(0, nVowelLast) +"ΐ" +sWordIn.substring(nVowelLast+1, sWordIn.length)
  else
    return sWordIn
}

/*
 * DOING: it decrease the-tonos: υποκόσμου = >  υπόκοσμου
 */
function fGreektonosDecrease (sWordIn) {
  let
    nIndexTonos,
    nVowelLast,
    sWord2 = ''

  sWordIn = sWordIn.toLowerCase()
  nIndexTonos = fGreektonosFindIndex(sWordIn)
  sWordIn = fGreektonosRemove(sWordIn)

  try {sWord2 = sWordIn.substring(0, nIndexTonos)}
  catch (error){console.error('fGreektonosDecrease')}
  nVowelLast = fGreekvowelindexFindLast(sWord2)
  sWordIn = fGreektonosSetOnIndex(sWordIn, nVowelLast)

  return sWordIn
}

/*
 * DOING: it decrease the-tonos: υπόκοσμου => υποκόσμου
 */
function fGreektonosIncrease (sWordIn) {
  let
    nIndexTonos,
    nVowelFirst,
    sWord1 = '',
    sWord2 = ''

  sWordIn = sWordIn.toLowerCase()
  nIndexTonos = fGreektonosFindIndex(sWordIn)
  sWordIn = fGreektonosRemove(sWordIn)

  sWord1 = sWordIn.substring(0, nIndexTonos+1)
  try {sWord2 = sWordIn.substring(nIndexTonos+1)}
  catch (error){console.error('fGreektonosIncrease')}
  nVowelFirst = fGreekvowelindexFindFirst(sWord2)
  sWord2 = fGreektonosSetOnIndex(sWord2, nVowelFirst)

  return sWord1 + sWord2
}

/*
 * DOING: it finds the-index of the-first vowel of a-word without tonos.
 *    IF ει,οι,αι,ου,αυ,ευ, returns the-index of the-first vowel.
 */
function fGreekvowelindexFindFirst (sWordIn) {
  let
    nVowelMin = 1000

  sWordIn = sWordIn.toLowerCase()
  sWordIn = fGreektonosRemove(sWordIn)
  if (sWordIn.indexOf("α") < nVowelMin && sWordIn.indexOf("α") != -1)
    nVowelMin = sWordIn.indexOf("α")
  if (sWordIn.indexOf("ε") < nVowelMin && sWordIn.indexOf("ε") != -1)
    nVowelMin = sWordIn.indexOf("ε")
  if (sWordIn.indexOf("ο") < nVowelMin && sWordIn.indexOf("ο") != -1)
    nVowelMin = sWordIn.indexOf("ο")
  if (sWordIn.indexOf("η") < nVowelMin && sWordIn.indexOf("η") != -1)
    nVowelMin = sWordIn.indexOf("η")
  if (sWordIn.indexOf("ω") < nVowelMin && sWordIn.indexOf("ω") != -1)
    nVowelMin = sWordIn.indexOf("ω")
  if (sWordIn.indexOf("ι") < nVowelMin && sWordIn.indexOf("ι") != -1) {
    if (sWordIn.indexOf("ι") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'ε'   //ει
          ||sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'ο'   //οι
          ||sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'α' ) //αι
        nVowelMin = sWordIn.indexOf("ι")-1
      else
        nVowelMin = sWordIn.indexOf("ι")
    }
    else
      nVowelMin = sWordIn.indexOf("ι")
  }
  if (sWordIn.indexOf("υ") < nVowelMin && sWordIn.indexOf("υ") != -1) {
    if (sWordIn.indexOf("υ") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'ε' ) //εύ, απαγορεύεται
        nVowelMin = sWordIn.indexOf("υ")-1
      else
        nVowelMin = sWordIn.indexOf("υ")
    }
    else
      nVowelMin = sWordIn.indexOf("υ")
  }
  if (sWordIn.indexOf("ϋ") < nVowelMin && sWordIn.indexOf("ϋ") != -1)
    nVowelMin = sWordIn.indexOf("ϋ")
  if (sWordIn.indexOf("ϊ") < nVowelMin && sWordIn.indexOf("ϊ") != -1)
    nVowelMin = sWordIn.indexOf("ϊ")

  return nVowelMin
}

/*
 * DOING: it finds the-index of the-LAST vowel of a-sWordIn without tonos.
 *    IF ει,οι,αι,ου,αυ,ευ, returns the-index of the-first vowel.
 */
function fGreekvowelindexFindLast (sWordIn) {
  let
    nVowelLast = -1

  sWordIn = sWordIn.toLowerCase()
  sWordIn = fGreektonosRemove(sWordIn)

  if (sWordIn.lastIndexOf("α")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("α")
  if (sWordIn.lastIndexOf("ε")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ε")
  if (sWordIn.lastIndexOf("ο")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ο")
  if (sWordIn.lastIndexOf("η")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("η")
  if (sWordIn.lastIndexOf("ω")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ω")

  if (sWordIn.lastIndexOf("ι")  >  nVowelLast) {
    if (sWordIn.lastIndexOf("ι")  >  0) {
      if (  (sWordIn.charAt(sWordIn.lastIndexOf("ι")-1) == 'ε')   //ει
          ||(sWordIn.charAt(sWordIn.lastIndexOf("ι")-1) == 'ο')   //οι
          ||(sWordIn.charAt(sWordIn.lastIndexOf("ι")-1) == 'α') ) //αι
        nVowelLast = sWordIn.lastIndexOf("ι")-1
      else
        nVowelLast = sWordIn.lastIndexOf("ι")
    }
    else
      nVowelLast = sWordIn.lastIndexOf("ι")
  }

  if (sWordIn.lastIndexOf("υ")  >  nVowelLast) {
    if (sWordIn.lastIndexOf("υ") != 0) {
      if (  sWordIn.charAt(sWordIn.lastIndexOf("υ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.lastIndexOf("υ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.lastIndexOf("υ")-1) == 'ε' ) //εύ, απαγορεύεται
        nVowelLast = sWordIn.lastIndexOf("υ")-1
      else
        nVowelLast = sWordIn.lastIndexOf("υ")
    }
    else
      nVowelLast = sWordIn.lastIndexOf("υ")
  }

  if (sWordIn.lastIndexOf("ϋ")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ϋ")
  if (sWordIn.lastIndexOf("ϊ")  >  nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ϊ")

  return nVowelLast
}

/*
 * DOING: it finds the-number of vowels (αι,ει,οι,ου,αυ,ευ counts one)
 *    of a-word, ie its syllables.
 */
function fGreekvowelnumberFind (sWordIn) {
  let
    nSyllable = 0,
    nIndex = -1

  while (sWordIn.length > 0) {
    nIndex = fGreekvowelindexFindLast(sWordIn)
    if (nIndex != -1) {
      nSyllable++
      sWordIn = sWordIn.substring(0, nIndex)
    }
    else break
  }

  return nSyllable
}

/*
 * DOING: it finds the-phonemic-notation of a-Greek-text-word.
 * INPUT: αυταρχικός
 * OUTPUT: /aftarhikós/
 */
function fGreekwordFindPhonemic (sWordIn, bSinizisi) {
  let
    nIndex,
    sOut = sWordIn

  sOut = sOut.replaceAll('γυα', 'yya') //γυαλιάς
  sOut = sOut.replaceAll('ουά', 'uá') //Μπουρζουάς

  //αια
  sOut = sOut.replaceAll('αιά', 'eá') //Πειραιάς
  sOut = sOut.replaceAll('αια', 'ea') //Παιανιώτης
  sOut = sOut.replaceAll('αιου', 'eu') //ελαιουργός
  sOut = sOut.replaceAll('αιο', 'eo') //ελαιοπυρήνας

  //εια
  if (sOut.indexOf('βεια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βεια', 'vyya') //ακρίβεια
  if (sOut.indexOf('θεια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('θεια', 'thhha') //βοήθεια
  if (sOut.indexOf('λειά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λειά', 'llá') //δουλειά
  sOut = sOut.replaceAll('εια', '111') //άδεια, ακρίβεια
  sOut = sOut.replaceAll('ειά', '111') //παντρειά, δουλειά

  //ειο
  sOut = sOut.replaceAll('γγειο', 'gio') //αγγειοχειρουργός
  sOut = sOut.replaceAll('γειο', 'yio') //αγειορίτης
  if (sOut.indexOf('δειο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('δειο', 'dhyyo') //άδειος
  sOut = sOut.replaceAll('δειο', 'dhio') //δειο
  sOut = sOut.replaceAll('χειο', 'hio')
  sOut = sOut.replaceAll('ειο', '111') //βόρειο, άδειος
  sOut = sOut.replaceAll('ειό', '111') //

  //οια
  if (sOut.indexOf('νοια') != -1 && bSinizisi) //έγνοια
    sOut = sOut.replaceAll('νοια', 'nna')
  sOut = sOut.replaceAll('οια', 'ia') //έννοια, έγνοια
  sOut = sOut.replaceAll('οιά', 'iá') //χροιά,

  //οιο
  if (sOut.indexOf('τοιο') != -1 && bSinizisi)
    sOut = sOut.replaceAll('οιο', 'tyyo') //τέτοιος
  sOut = sOut.replaceAll('οιο', 'io')

  //ιαι
  sOut = sOut.replaceAll('ιαι', 'ie')

  //ια
  if (sOut.startsWith('ια'))
    sOut = sOut.replace('ια', 'ia') //ιατρός
  if (sOut.startsWith('Ια'))
    sOut = sOut.replace('Ια', 'ia') //Ιατρός
  if (sOut.indexOf('βιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βιά', 'vyyá') //βιάζομαι
  sOut = sOut.replaceAll('βιά', 'vyyá') //βιάζομαι
  if (sOut.indexOf('βια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βια', 'vyya') //βιασύνη
  sOut = sOut.replaceAll('βια', 'via') //βιaσμός
  sOut = sOut.replaceAll('γιά', 'yyá') //γιαγιά
  sOut = sOut.replaceAll('Γιά', 'yyá') //γιαγιά
  sOut = sOut.replaceAll('Για', 'yya') //Γιαννιώτης
  sOut = sOut.replaceAll('για', 'yya') //γιαγιά
  if (sOut.indexOf('διά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('διά', 'dhyyá') //καρδιά
  sOut = sOut.replaceAll('διά', 'dhiá') //διάμετρος
  if (sOut.startsWith('δια'))
    sOut = sOut.replace('δια', 'dhia') //διαμέρισμα
  if (sOut.indexOf('δια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('δια', 'dhyya') //άδιασμα
  sOut = sOut.replaceAll('δια', 'dhia') //διαγώνισμα
  if (sOut.indexOf('κιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('κιά', 'kka') //κακιά
  sOut = sOut.replaceAll('κιά', 'kiá') //
  if (sOut.indexOf('λιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιά', 'llá') //
  sOut = sOut.replaceAll('λιά', 'liá') //Αλιάγας
  if (sOut.indexOf('λια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λια', 'lla') //
  sOut = sOut.replaceAll('λια', 'lia') //
  if (sOut.indexOf('μπια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μπια', 'byya') //
  sOut = sOut.replaceAll('μπια', 'bia') //
  if (sOut.indexOf('μιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μιά', 'mnná') //
  sOut = sOut.replaceAll('μιά', 'miá') //
  if (sOut.indexOf('μια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μια', 'mnna') //
  sOut = sOut.replaceAll('μια', 'mia') //
  if (sOut.indexOf('νιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νιά', 'nná') //
  sOut = sOut.replaceAll('νιά', 'niá') //
  if (sOut.indexOf('νια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('νια', 'nna') //
  sOut = sOut.replaceAll('νια', 'nia') //
  if (sOut.indexOf('ριά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ριά', 'ryyá') //
  sOut = sOut.replaceAll('ριά', 'riá') //
  if (sOut.indexOf('ρια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('ρια', 'ryya') //
  sOut = sOut.replaceAll('ρια', 'ria') //
  if (sOut.indexOf('σιά') != -1 && bSinizisi)
    sOut = sOut.replaceAll('σιά', 'ssá') //
  sOut = sOut.replaceAll('σιά', 'siá') //
  if (sOut.indexOf('σια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('σια', 'ssa') //
  sOut = sOut.replaceAll('σια', 'sia') //
  if (sOut.indexOf('τζια') != -1 && bSinizisi)
    sOut = sOut.replaceAll('τζια', 'jja') //
  sOut = sOut.replaceAll('τζια', 'jia') //
  sOut = sOut.replaceAll('ια', '111') //Ολυμπιακός, κάμπια
  sOut = sOut.replaceAll('ιά', '111') //γαβριάς, πιάσιμο

  //ιει
  sOut = sOut.replaceAll('ιει', 'ii') // υγιεινιστής

  //ιε
  if (sOut.startsWith('ιε'))
    sOut = sOut.replace('ιε', 'ie') //ιερέας
  if (sOut.indexOf('βιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('βιέ', 'vyyé') //λεβιές
  sOut = sOut.replaceAll('βιέ', 'vié') //Βιένη
  sOut = sOut.replaceAll('ζιέ', 'zé') //μπουλντοζιέρης
  sOut = sOut.replaceAll('κιέ', 'ké') //περουκιέρης
  sOut = sOut.replaceAll('μπιέ', 'byyé') //κουραμπιές
  sOut = sOut.replaceAll('μπιε', 'bie') //
  sOut = sOut.replaceAll('πιέ', 'pyyé') //κουτουπιές
  sOut = sOut.replaceAll('πιε', 'pie') //πιεστής
  sOut = sOut.replaceAll('τσιέ', 'cé') //σπετσιέρης
  if (sOut.indexOf('φιέ') != -1 && bSinizisi)
    sOut = sOut.replaceAll('φιέ', 'fhhé') //χαφιές
  sOut = sOut.replaceAll('φιέ', 'fié') //
  sOut = sOut.replaceAll('ιε', '111') //ταμιευτήρας, καριερίστας

  //ιου
  if (sOut.startsWith('ιου'))
    sOut = sOut.replace('ιου', 'iu') //
  sOut = sOut.replaceAll('γιου', 'yyu') 
  if (sOut.indexOf('μπιού') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μπιού', 'byyú') //κομπιούτερ
  sOut = sOut.replaceAll('μπιού', 'biú') //
  if (sOut.indexOf('μπιου') != -1 && bSinizisi)
    sOut = sOut.replaceAll('μπιου', 'byyu') //κομπιουτεράκιας
  sOut = sOut.replaceAll('νιου', 'nnu') //καπετάνιους|καπετάνιων
  sOut = sOut.replaceAll('σιού', 'ssú ') //
  sOut = sOut.replaceAll('τσιού', 'ccú ') //

  //ιο
  sOut = sOut.replaceAll('γκιο', 'ggó') //καραγκιοζοπαίκτης
  sOut = sOut.replaceAll('γιό', 'yyó') //
  sOut = sOut.replaceAll('Γιό', 'yyó') //
  sOut = sOut.replaceAll('γιο', 'yyo') //
  if (sOut.indexOf('λιό') != -1 && bSinizisi)
    sOut = sOut.replaceAll('λιό', 'lló') //βουρλιόγκας
  sOut = sOut.replaceAll('λιό', 'lió') //
  sOut = sOut.replaceAll('ριο', 'rio') //άγριος
  sOut = sOut.replaceAll('ιό', '111') //, πιόσιμο
  sOut = sOut.replaceAll('ιο', '111') //βιολί, βιολογία

  //ιω
  if (sOut.startsWith('ιω'))
    sOut = sOut.replace('ιω', 'io') //
  if (sOut.startsWith('Ιω'))
    sOut = sOut.replace('Ιω', 'io') //Ιωάννινα
  sOut = sOut.replaceAll('βιώ', 'vyyó')
  sOut = sOut.replaceAll('γιώ', 'yyó')
  sOut = sOut.replaceAll('γιω', 'yyo')
  sOut = sOut.replaceAll('διώ', 'dhyyó')
  sOut = sOut.replaceAll('ζιώ', 'zzó')
  sOut = sOut.replaceAll('κιώ', 'kkó') //Αμπελακιώτης
  sOut = sOut.replaceAll('λλιώ', 'lló') //Βρυξελλιώτης
  sOut = sOut.replaceAll('λιώ', 'lló') //αμυγδαλιώνας
  sOut = sOut.replaceAll('μιώ', 'mnnó') //καλαμιώνας
  sOut = sOut.replaceAll('ννιώ', 'nnó') //Γιαννιώτης
  sOut = sOut.replaceAll('ντζιώ', 'njjó') //Καλεντζιώτης
  sOut = sOut.replaceAll('νιώ', 'nnó') //λιμνιώνας
  sOut = sOut.replaceAll('νιω', 'nno')
  sOut = sOut.replaceAll('πιώ', 'pyyó') //Αμπελοκιπιώτης
  sOut = sOut.replaceAll('ριώ', 'ryyó') // Αλιβεριώτης
  sOut = sOut.replaceAll('τιώ', 'tyyó') // Αετιώτης

  //υα
  sOut = sOut.replaceAll('μυα', 'mnna') //μυαλό

  sOut = sOut.replaceAll('ού', 'ú')
  sOut = sOut.replaceAll('Ού', 'ú')
  sOut = sOut.replaceAll('αί', 'é')
  sOut = sOut.replaceAll('Αί', 'é')
  sOut = sOut.replaceAll('εί', 'í')
  sOut = sOut.replaceAll('Εί', 'í')
  sOut = sOut.replaceAll('οί', 'í')
  sOut = sOut.replaceAll('Οί', 'í')
  sOut = sOut.replaceAll('αύα', 'áva') //ναύαρχος
  sOut = sOut.replaceAll('αυα', 'ava') //
  sOut = sOut.replaceAll('αύγ', 'ávy') //αύγουστος
  sOut = sOut.replaceAll('Αύγ', 'ávy') //αύγουστος
  sOut = sOut.replaceAll('αυγ', 'avy') //
  sOut = sOut.replaceAll('αύδ', 'ávdh') //Κλαύδιος
  sOut = sOut.replaceAll('αυδ', 'avdh') //
  sOut = sOut.replaceAll('αύε', 'áve') //αύε
  sOut = sOut.replaceAll('αυε', 'ave') //
  sOut = sOut.replaceAll('αύλ', 'ávl') //ναύλος
  sOut = sOut.replaceAll('αυλ', 'avl') //
  sOut = sOut.replaceAll('Αυλ', 'avl') //Αυλώνας
  sOut = sOut.replaceAll('αύμ', 'ávm') //θαύμα
  sOut = sOut.replaceAll('αυμ', 'avm') //
  sOut = sOut.replaceAll('αύν', 'ávn') //αύν
  sOut = sOut.replaceAll('αυν', 'avn') //
  sOut = sOut.replaceAll('αυπ', 'afp') //ναυπηγός
  sOut = sOut.replaceAll('αύρ', 'ávr') //Σταύρος
  sOut = sOut.replaceAll('αυρ', 'avr') //
  sOut = sOut.replaceAll('αύθ', 'áfth') //αύθ
  sOut = sOut.replaceAll('αυθ', 'afth') //
  sOut = sOut.replaceAll('αύκ', 'áfk') //καύκασος
  sOut = sOut.replaceAll('αυκ', 'afk') //
  sOut = sOut.replaceAll('αύλ', 'ávl') //
  sOut = sOut.replaceAll('αυλ', 'avl') //αυλή
  sOut = sOut.replaceAll('αύξ', 'áfks') //αύξ
  sOut = sOut.replaceAll('αυξ', 'afks') //
  sOut = sOut.replaceAll('αύρ', 'ávr') //αύριο
  sOut = sOut.replaceAll('αυπ', 'afp') //ναυπηγός
  sOut = sOut.replaceAll('αύσ', 'áfs') //ναύσταθμος
  sOut = sOut.replaceAll('αυσ', 'afs') //καυστήρας
  sOut = sOut.replaceAll('Αυσ', 'afs') //Αυστραλός
  sOut = sOut.replaceAll('αύτ', 'áft') //ναύτης
  sOut = sOut.replaceAll('αυτ', 'aft') //
  sOut = sOut.replaceAll('αύχ', 'áfh') //αύχ
  sOut = sOut.replaceAll('αυχ', 'afh') //
  sOut = sOut.replaceAll('εύα', 'éva') //εύα
  sOut = sOut.replaceAll('ευα', 'eva') //
  sOut = sOut.replaceAll('Ευα', 'eva') //Ευαγγελισμός
  sOut = sOut.replaceAll('ευά', 'evá') //
  sOut = sOut.replaceAll('εύγ', 'évy') //εύγ
  sOut = sOut.replaceAll('ευγ', 'evy') //
  sOut = sOut.replaceAll('Ευγ', 'evy') //
  sOut = sOut.replaceAll('εύδ', 'évdh') //εύδ
  sOut = sOut.replaceAll('ευδ', 'evdh') //
  sOut = sOut.replaceAll('εύε', 'éve') //εύε
  sOut = sOut.replaceAll('ευε', 'eve') //
  sOut = sOut.replaceAll('εύζ', 'évz') //εύζωνας
  sOut = sOut.replaceAll('ευζ', 'evz') //
  sOut = sOut.replaceAll('εύθ', 'éfth') //εύθ
  sOut = sOut.replaceAll('ευθ', 'efth') //
  sOut = sOut.replaceAll('ευί', 'eví') //λευίτης
  sOut = sOut.replaceAll('εύκ', 'éfk') //εύκ
  sOut = sOut.replaceAll('ευκ', 'efk') //
  sOut = sOut.replaceAll('εύλ', 'évl') //εύλ
  sOut = sOut.replaceAll('ευλ', 'avl') //
  sOut = sOut.replaceAll('εύμ', 'évm') //εύμ
  sOut = sOut.replaceAll('ευμ', 'evm') //
  sOut = sOut.replaceAll('εύν', 'évn') //εύν
  sOut = sOut.replaceAll('ευν', 'evn') //
  sOut = sOut.replaceAll('εύξ', 'éfks') //εύξ
  sOut = sOut.replaceAll('ευξ', 'efks') //
  sOut = sOut.replaceAll('εύου', 'évu') //καθαρεύουσα
  sOut = sOut.replaceAll('εύο', 'évo') //
  sOut = sOut.replaceAll('ευου', 'evu') //καθαρευουσιάνος
  sOut = sOut.replaceAll('ευπ', 'efp') //ευπατρίδης
  sOut = sOut.replaceAll('εύρ', 'évr') //εύρ
  sOut = sOut.replaceAll('ευρ', 'evr') //
  sOut = sOut.replaceAll('Ευρ', 'evr') //Ευριπίδης
  sOut = sOut.replaceAll('εύσ', 'éfs') //εύσ
  sOut = sOut.replaceAll('ευσ', 'efs') //ευσ
  sOut = sOut.replaceAll('εύτ', 'éft') //εύτ
  sOut = sOut.replaceAll('ευτ', 'eft') //ευτ
  sOut = sOut.replaceAll('ευφ', 'ef') //ευφημισμός
  sOut = sOut.replaceAll('ευχ', 'efh') //ευχέτης
  sOut = sOut.replaceAll('Ευω', 'evo') //
  sOut = sOut.replaceAll('ευω', 'evo') //
  sOut = sOut.replaceAll('έ', 'é')
  sOut = sOut.replaceAll('Έ', 'é')
  sOut = sOut.replaceAll('ή', 'í')
  sOut = sOut.replaceAll('Ή', 'í')
  sOut = sOut.replaceAll('ί', 'í')
  sOut = sOut.replaceAll('ΐ', 'í')
  sOut = sOut.replaceAll('Ί', 'í')
  sOut = sOut.replaceAll('ύ', 'í')
  sOut = sOut.replaceAll('ΰ', 'í')
  sOut = sOut.replaceAll('Ύ', 'í')
  sOut = sOut.replaceAll('ό', 'ó')
  sOut = sOut.replaceAll('Ό', 'ó')
  sOut = sOut.replaceAll('ώ', 'ó')
  sOut = sOut.replaceAll('Ώ', 'ó')
  sOut = sOut.replaceAll('ά', 'á')
  sOut = sOut.replaceAll('Ά', 'á')

  sOut = sOut.replaceAll('ντζ', 'nj')
  sOut = sOut.replaceAll('μπ', 'b')
  sOut = sOut.replaceAll('Μπ', 'b')
  sOut = sOut.replaceAll('ντ', 'd')
  sOut = sOut.replaceAll('Ντ', 'd')
  sOut = sOut.replaceAll('γκ', 'g')
  sOut = sOut.replaceAll('Γκ', 'g')
  sOut = sOut.replaceAll('γγ', 'g')
  sOut = sOut.replaceAll('γχ', 'gh')
  sOut = sOut.replaceAll('σβ', 'zv')
  sOut = sOut.replaceAll('σμ', 'zm')
  sOut = sOut.replaceAll('τζ', 'j')
  sOut = sOut.replaceAll('Τζ', 'j')
  sOut = sOut.replaceAll('τσ', 'c')
  sOut = sOut.replaceAll('Τσ', 'c')
  sOut = sOut.replaceAll('ββ', 'v')
  sOut = sOut.replaceAll('β', 'v')
  sOut = sOut.replaceAll('Β', 'v')
  sOut = sOut.replaceAll('γ', 'y')
  sOut = sOut.replaceAll('Γ', 'y')
  sOut = sOut.replaceAll('δδ', 'dh')
  sOut = sOut.replaceAll('δ', 'dh')
  sOut = sOut.replaceAll('Δ', 'dh')
  sOut = sOut.replaceAll('ζ', 'z')
  sOut = sOut.replaceAll('Ζ', 'z')
  sOut = sOut.replaceAll('θ', 'th')
  sOut = sOut.replaceAll('Θ', 'th')
  sOut = sOut.replaceAll('κκ', 'k')
  sOut = sOut.replaceAll('κ', 'k')
  sOut = sOut.replaceAll('Κ', 'k')
  sOut = sOut.replaceAll('λλ', 'l')
  sOut = sOut.replaceAll('λ', 'l')
  sOut = sOut.replaceAll('Λ', 'l')
  sOut = sOut.replaceAll('μμ', 'm')
  sOut = sOut.replaceAll('μ', 'm')
  sOut = sOut.replaceAll('Μ', 'm')
  sOut = sOut.replaceAll('νν', 'n')
  sOut = sOut.replaceAll('ν', 'n')
  sOut = sOut.replaceAll('Ν', 'n')
  sOut = sOut.replaceAll('ξ', 'ks')
  sOut = sOut.replaceAll('Ξ', 'ks')
  sOut = sOut.replaceAll('ππ', 'p')
  sOut = sOut.replaceAll('π', 'p')
  sOut = sOut.replaceAll('Π', 'p')
  sOut = sOut.replaceAll('ρρ', 'r')
  sOut = sOut.replaceAll('ρ', 'r')
  sOut = sOut.replaceAll('Ρ', 'r')
  sOut = sOut.replaceAll('σσ', 's')
  sOut = sOut.replaceAll('σ', 's')
  sOut = sOut.replaceAll('Σ', 's')
  sOut = sOut.replaceAll('ς', 's')
  sOut = sOut.replaceAll('ττ', 't')
  sOut = sOut.replaceAll('τ', 't')
  sOut = sOut.replaceAll('Τ', 't')
  sOut = sOut.replaceAll('φφ', 'f')
  sOut = sOut.replaceAll('φ', 'f')
  sOut = sOut.replaceAll('Φ', 'f')
  sOut = sOut.replaceAll('χ', 'h')
  sOut = sOut.replaceAll('Χ', 'h')
  sOut = sOut.replaceAll('ψ', 'ps')
  sOut = sOut.replaceAll('Ψ', 'ps')

  sOut = sOut.replaceAll('ου', 'u')
  sOut = sOut.replaceAll('Ου', 'u')
  sOut = sOut.replaceAll('αι', 'e')
  sOut = sOut.replaceAll('Αι', 'e')
  sOut = sOut.replaceAll('ει', 'i')
  sOut = sOut.replaceAll('Ει', 'i')
  sOut = sOut.replaceAll('οι', 'i')
  sOut = sOut.replaceAll('Οι', 'i')
  sOut = sOut.replaceAll('ε', 'e')
  sOut = sOut.replaceAll('Ε', 'e')
  sOut = sOut.replaceAll('η', 'i')
  sOut = sOut.replaceAll('Η', 'i')
  sOut = sOut.replaceAll('ι', 'i')
  sOut = sOut.replaceAll('Ι', 'i')
  sOut = sOut.replaceAll('ϊ', 'i')
  sOut = sOut.replaceAll('υ', 'i')
  sOut = sOut.replaceAll('Υ', 'i')
  sOut = sOut.replaceAll('ϋ', 'i')
  sOut = sOut.replaceAll('ο', 'o')
  sOut = sOut.replaceAll('Ο', 'o')
  sOut = sOut.replaceAll('ω', 'o')
  sOut = sOut.replaceAll('Ω', 'o')
  sOut = sOut.replaceAll('α', 'a')
  sOut = sOut.replaceAll('Α', 'a')

  return '/' +sOut +'/'
}

/*
 * DOING: it finds if phonemic-notation has συνίζηση/sinizisi/
 * INPUT: /aftarhikós/
 * OUTPUT: boolean
 */
function fGreekwordHasSinizisi(sPhonemaIn) {
  if (sPhonemaIn.indexOf('yy') ||
      sPhonemaIn.indexOf('gg') || //γκια
      sPhonemaIn.indexOf('zz') ||
      sPhonemaIn.indexOf('hh') ||
      sPhonemaIn.indexOf('kk') ||
      sPhonemaIn.indexOf('ll') ||
      sPhonemaIn.indexOf('nn') ||
      sPhonemaIn.indexOf('ss') ||
      sPhonemaIn.indexOf('jj') ||
      sPhonemaIn.indexOf('cc')
     ) return true
  else return false
}

/*
 * DOING: it finids if a-character is English.
 * OUTPUT: boolean.
 */
function fIsLetterEnglish(sCharIn) {
  sCharIn = sCharIn.toLowerCase()

  if (sCharIn == 'a' ||
      sCharIn == 'b' ||
      sCharIn == 'c' ||
      sCharIn == 'd' ||
      sCharIn == 'e' ||
      sCharIn == 'f' ||
      sCharIn == 'g' ||
      sCharIn == 'h' ||
      sCharIn == 'i' ||
      sCharIn == 'j' ||
      sCharIn == 'k' ||
      sCharIn == 'l' ||
      sCharIn == 'm' ||
      sCharIn == 'n' ||
      sCharIn == 'o' ||
      sCharIn == 'p' ||
      sCharIn == 'q' ||
      sCharIn == 'r' ||
      sCharIn == 's' ||
      sCharIn == 't' ||
      sCharIn == 'u' ||
      sCharIn == 'v' ||
      sCharIn == 'w' ||
      sCharIn == 'x' ||
      sCharIn == 'y' ||
      sCharIn == 'z'
    )
    return true
  else
    return false
}

/*
 * DOING: it finids if a-character is English-consonant.
 * OUTPUT: boolean.
 */
function fIsLetterConsonantEnglish(sCharIn) {
  //what u/w/y?
  if (sCharIn == 'b' ||
      sCharIn == 'c' ||
      sCharIn == 'd' ||
      sCharIn == 'f' ||
      sCharIn == 'g' ||
      sCharIn == 'h' ||
      sCharIn == 'j' ||
      sCharIn == 'k' ||
      sCharIn == 'l' ||
      sCharIn == 'm' ||
      sCharIn == 'n' ||
      sCharIn == 'p' ||
      sCharIn == 'q' ||
      sCharIn == 'r' ||
      sCharIn == 's' ||
      sCharIn == 't' ||
      sCharIn == 'v' ||
      sCharIn == 'x' ||
      sCharIn == 'z' ||

      sCharIn == 'B' ||
      sCharIn == 'C' ||
      sCharIn == 'D' ||
      sCharIn == 'F' ||
      sCharIn == 'G' ||
      sCharIn == 'H' ||
      sCharIn == 'J' ||
      sCharIn == 'K' ||
      sCharIn == 'L' ||
      sCharIn == 'M' ||
      sCharIn == 'N' ||
      sCharIn == 'P' ||
      sCharIn == 'Q' ||
      sCharIn == 'R' ||
      sCharIn == 'S' ||
      sCharIn == 'T' ||
      sCharIn == 'V' ||
      sCharIn == 'X' ||
      sCharIn == 'Z'
    )
    return true
  else
    return false
}

/**
 * modified:
 * created: {2001-03-14}
 *
 */
function fIsLetterVowelEnglish(sCharIn) {
  //what about w/u/y?
  if (sCharIn == 'a' ||
      sCharIn == 'A' ||
      sCharIn == 'e' ||
      sCharIn == 'E' ||
      sCharIn == 'o' ||
      sCharIn == 'O' ||
      sCharIn == 'i' ||
      sCharIn == 'I'    )
    return true
  else
    return false
}

/**
 * modified:
 * created: 2001.03.15
 * @author nikkas
 *
 */
function fIsLetterVowelGreek(sCharIn) {
  if (sCharIn == 'α' ||
      sCharIn == 'ά' ||
      sCharIn == 'A' ||
      sCharIn == 'Ά' ||
      sCharIn == 'ε' ||
      sCharIn == 'έ' ||
      sCharIn == 'Ε' ||
      sCharIn == 'Έ' ||
      sCharIn == 'η' ||
      sCharIn == 'ή' ||
      sCharIn == 'Η' ||
      sCharIn == 'Ή' ||
      sCharIn == 'ι' ||
      sCharIn == 'ί' ||
      sCharIn == 'Ι' ||
      sCharIn == 'Ί' ||
      sCharIn == 'ϊ' ||
      sCharIn == 'Ϊ' ||
      sCharIn == 'ΐ' ||
      sCharIn == 'ο' ||
      sCharIn == 'ό' ||
      sCharIn == 'Ο' ||
      sCharIn == 'Ό' ||
      sCharIn == 'υ' ||
      sCharIn == 'ύ' ||
      sCharIn == 'Υ' ||
      sCharIn == 'Ύ' ||
      sCharIn == 'ϋ' ||
      sCharIn == 'ΰ' ||
      sCharIn == 'Ϋ' ||
      sCharIn == 'ω' ||
      sCharIn == 'ώ' ||
      sCharIn == 'Ω' ||
      sCharIn == 'Ώ'  )
    return true
  else
    return false
}

export {
  fPhonemaRemoveTonos,
  fFindCharsIfCodepoints, fFindCodepointsIfChars,
  fFindLettersFirstIfPrefix, fFindLettersFirstIfSuffix,
  fFindLettersLastIfPrefix, fFindLettersLastIfSuffix,
  fGreektonosFindSyllable, fGreektonosRemove,
  fGreektonosRemoveFirst, fGreektonosSetOnIndex, fGreektonosSetOnLiyusa,
  fGreektonosSetOnParaliyusa, 
  fGreektonosDecrease, fGreektonosIncrease,
  fGreekvowelindexFindFirst, fGreekvowelindexFindLast, fGreekvowelnumberFind,
  fGreekwordFindPhonemic, fGreekwordHasSinizisi,
  fIsLetterConsonantEnglish, fIsLetterVowelEnglish, fIsLetterVowelGreek
}