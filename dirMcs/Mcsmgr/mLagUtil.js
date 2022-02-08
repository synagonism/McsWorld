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
    'mLagUtil.js.0-2-0.2022-01-18: translated from java',
    'mLagUtil.js.0-1-0.2022-01-17: creation'
  ]

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
  return = sOut
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
  return = sOut.substring(0, sOut.length-1)
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
function fFindLaststLettersIfSuffix (sWordIn, nSuffixIn) {
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
function fGreek_tonosFindIndex(sWordIn) {
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
function fGreek_tonosRemove (sWordIn) {
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
function fGreek_tonosRemoveFirst (sWordIn) {
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
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'έ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ε"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ή')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"η"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ί')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ι"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ό')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ο"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ύ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"υ"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ώ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ω"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ΰ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"υ"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
  else if (sChar == 'ΐ')
    return  sWordIn.substring(0, sWordIn.indexOf(nIndexFirst))
            +"ι"
            +sWordIn.substring(sWordIn.indexOf(nIndexFirst)+1, sWordIn.length())
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
function fGreek_tonosFindSyllable (sWordIn) {
  sWordIn = sWordIn.toLowerCase()
  let
    nTonos = fGreek_tonosFindIndex(sWordIn),
    nLiyusa =-1,
    nParaliyusa =-1,
    nProparaliyusa =-1

  sWordIn = fGreek_tonosRemove(sWordIn)
  nLiyusa = fGreek_vowel_indexFindLast(sWordIn)
  if (nLiyusa != -1)
    nParaliyusa = fGreek_vowel_indexFindLast(sWordIn.substring(0, nLiyusa))
  if (nParaliyusa != -1)
    nProparaliyusa = fGreek_vowel_indexFindLast(sWordIn.substring(0, nParaliyusa))

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
function fGreek_tonosSetOnLiyusa (sWordIn) {
  let
    nVowelLast

  sWordIn = sWordIn.toLowerCase()
  //find the MAX index of vowels.
  nVowelLast = greekVowel_IndexFindLast(sWordIn)

  return fGreek_tonosSetOnIndex(sWordIn, nVowelLast)
}

/*
 * DOING: it set the-tonos on paraliyusa.
 * INPUT: the-word has no tonos.
 */
function fGreek_tonosSetOnParaliyusa (sWordIn) {
  let
    nVowelLast,
    sWord2

  sWordIn = sWordIn.toLowerCase()
  nVowelLast = greekVowel_IndexFindLast(sWordIn)
  sWord2 = sWordIn.substring(0, nVowelLast)
  nVowelLast = greekVowel_IndexFindLast(sWord2)
  return fGreek_tonosSetOnIndex(sWordIn, nVowelLast)
}

/*
 * DOING: it set the-tonos on index.
 * INPUT: the-word has no tonos.
 */
function fGreek_tonosSetOnIndex (sWordIn, nVowelLast) {
  let
    sChar

  sChar = sWordIn.charAt(nVowelLast)

  if (sChar == 'α')
  {
    //if α is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length()-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length())
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length())
      else
        return sWordIn.substring(0, nVowelLast) +"ά" +sWordIn.substring(nVowelLast+1, sWordIn.length())
    }
    else
      return sWordIn.substring(0, nVowelLast) +"ά" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  }
  else if (sChar == 'ε')
  {
    //if ε is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length()-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length())
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length())
      else
        return sWordIn.substring(0, nVowelLast) +"έ" +sWordIn.substring(nVowelLast+1, sWordIn.length())
    }
    else
      return sWordIn.substring(0, nVowelLast) +"έ" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  }
  else if (sChar == 'ο')
  {
    //if ο is **NOT** the last-vowel
    if (nVowelLast != sWordIn.length()-1)
    {
      if (sWordIn.charAt(nVowelLast+1) == 'ι')
        return sWordIn.substring(0, nVowelLast+1) +"ί" +sWordIn.substring(nVowelLast+2, sWordIn.length())
      else if (sWordIn.charAt(nVowelLast+1) == 'υ')
        return sWordIn.substring(0, nVowelLast+1) +"ύ" +sWordIn.substring(nVowelLast+2, sWordIn.length())
      else
        return sWordIn.substring(0, nVowelLast) +"ό" +sWordIn.substring(nVowelLast+1, sWordIn.length())
    }
    else
      return sWordIn.substring(0, nVowelLast) +"ό" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  }
  else if (sChar == 'η')
    return  sWordIn.substring(0, nVowelLast) +"ή" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  else if (sChar == 'ι')
    return  sWordIn.substring(0, nVowelLast) +"ί" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  else if (sChar == 'υ')
    return  sWordIn.substring(0, nVowelLast) +"ύ" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  else if (sChar == 'ω')
    return  sWordIn.substring(0, nVowelLast) +"ώ" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  else if (sChar == 'ϋ')
    return  sWordIn.substring(0, nVowelLast) +"ΰ" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  else if (sChar == 'ϊ')
    return  sWordIn.substring(0, nVowelLast) +"ΐ" +sWordIn.substring(nVowelLast+1, sWordIn.length())
  else
    return sWordIn
}

/*
 * DOING: it decrease the-tonos: υποκόσμου = >  υπόκοσμου
 */
function fGreek_tonosDecrease (sWordIn) {
  let
    nIndexTonos,
    nVowelLast,
    sWord2 = ''

  sWordIn = sWordIn.toLowerCase()
  nIndexTonos = fGreek_tonosFindIndex(sWordIn)
  sWordIn = fGreek_tonosRemove(sWordIn)

  try {sWord2 = sWordIn.substring(0, nIndexTonos)}
  catch (error){console.error('fGreek_tonosDecrease')}
  nVowelLast = fGreek_vowel_indexFindLast(sWord2)
  sWordIn = fGreek_tonosSetOnIndex(sWordIn, nVowelLast)

  return sWordIn
}

/*
 * DOING: it finds the-index of the-first vowel of a-word without tonos.
 */
function fGreek_vowel_indexFindFirst (sWordIn) {
  let
    minVowel = 1000

  sWordIn = greekTonosRemove(sWordIn)
  if (sWordIn.indexOf("α") < minVowel && sWordIn.indexOf("α") != -1)
    minVowel = sWordIn.indexOf("α")
  if (sWordIn.indexOf("ε") < minVowel && sWordIn.indexOf("ε") != -1)
    minVowel = sWordIn.indexOf("ε")
  if (sWordIn.indexOf("ο") < minVowel && sWordIn.indexOf("ο") != -1)
    minVowel = sWordIn.indexOf("ο")
  if (sWordIn.indexOf("η") < minVowel && sWordIn.indexOf("η") != -1)
    minVowel = sWordIn.indexOf("η")
  if (sWordIn.indexOf("ω") < minVowel && sWordIn.indexOf("ω") != -1)
    minVowel = sWordIn.indexOf("ω")
  if (sWordIn.indexOf("ι") < minVowel && sWordIn.indexOf("ι") != -1) {
    if (sWordIn.indexOf("ι") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'ε'   //ει
          ||sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'ο'   //οι
          ||sWordIn.charAt(sWordIn.indexOf("ι")-1) == 'α' ) //αι
        minVowel = sWordIn.indexOf("ι")-1
      else
        minVowel = sWordIn.indexOf("ι")
    }
    else
      minVowel = sWordIn.indexOf("ι")
  }
  if (sWordIn.indexOf("υ") < minVowel && sWordIn.indexOf("υ") != -1) {
    if (sWordIn.indexOf("υ") != 0) {
      if (  sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'ο'   //ού
          ||sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'α'   //αύ
          ||sWordIn.charAt(sWordIn.indexOf("υ")-1) == 'ε' ) //εύ, απαγορεύεται
        minVowel = sWordIn.indexOf("υ")-1
      else
        minVowel = sWordIn.indexOf("υ")
    }
    else
      minVowel = sWordIn.indexOf("υ")
  }
  if (sWordIn.indexOf("ϋ") < minVowel && sWordIn.indexOf("ϋ") != -1)
    minVowel = sWordIn.indexOf("ϋ")
  if (sWordIn.indexOf("ϊ") < minVowel && sWordIn.indexOf("ϊ") != -1)
    minVowel = sWordIn.indexOf("ϊ")

  return minVowel
}

/*
 * DOING: it finds the-index of the-last vowel of a-sWordIn without tonos.
 */
function fGreek_vowel_indexFindLast (sWordIn) {
  let
    nVowelLast = -1

  sWordIn = fGreek_tonosRemove(sWordIn)

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
  sWordIn = greekTonosRemove(sWordIn)
  int nVowelLast=-1

  if (sWordIn.lastIndexOf("α") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("α")
  if (sWordIn.lastIndexOf("ε") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ε")
  if (sWordIn.lastIndexOf("ο") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ο")

  if (sWordIn.lastIndexOf("η") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("η")
  if (sWordIn.lastIndexOf("ω") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ω")

  if (sWordIn.lastIndexOf("ι") > nVowelLast)
  {
    if (sWordIn.lastIndexOf("ι") > 0)
    {
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

  if (sWordIn.lastIndexOf("υ") > nVowelLast)
  {
    if (sWordIn.lastIndexOf("υ") != 0)
    {
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

  if (sWordIn.lastIndexOf("ϋ") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ϋ")
  if (sWordIn.lastIndexOf("ϊ") > nVowelLast)
    nVowelLast = sWordIn.lastIndexOf("ϊ")

  return nVowelLast
}

/*
 * DOING: it finds the-number of vowels (αι,ει,οι,ου,αυ,ευ counts one)
 *    of a-word, ie its syllables.
 */
function fGreek_vowel_numberFind (sWordIn) {
  let
    nSyllable = 0,
    nIndex = -1

  while (sWordIn.length() > 0) {
    nIndex = greekVowel_IndexFindLast(sWordIn)
    if (nIndex != -1) {
      nSyllable++
      sWordIn = sWordIn.substring(0, nIndex)
    }
    else break
  }

  return nSyllable
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
function fIsLetterVowelGreek(sCharIn)
{
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

export {fFindCharsIfCodepoints, fFindCodepointsIfChars,
        fFindLettersFirstIfPrefix, fFindLettersFirstIfSuffix, fFindLettersLastIfPrefix,
        fFindLettersLastIfSuffix, fGreek_tonosFindSyllable, fGreek_tonosRemove,
        fGreek_tonosRemoveFirst, fGreek_tonosSetOnIndex, fGreek_tonosSetOnLiyusa,
        fGreek_tonosSetOnParaliyusa, fGreek_tonosDecrease, fGreek_vowel_indexFindFirst,
        fGreek_vowel_indexFindLast, fGreek_vowel_numberFind, fIsLetterConsonantEnglish,
        fIsLetterVowelEnglish, fIsLetterVowelGreek}
