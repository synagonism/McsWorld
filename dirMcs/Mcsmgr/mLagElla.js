/*
 * mLagElla.js - module with misc GreekAncient functions.
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
  // contains the-versions of mLagElla.js
  aVersion = [
    'mLagElla.js.0-1-0.2022-04-23: creation'
  ]

/*
 * DOING: it finds the-phonemic-notation of a-Greek-text-word.
 * INPUT: βῆ
 * OUTPUT: /béè/
 */
function fEllawordFindPhonema (sWordIn) {
  let
    nIndex,
    sOut = sWordIn

  //φωνήεντα
  sOut = sOut.replaceAll('αῖ', 'áì') //
  sOut = sOut.replaceAll('αἷ', 'háì') //
  sOut = sOut.replaceAll('αἶ', 'áì') //
  sOut = sOut.replaceAll('αἵ', 'haí') //
  sOut = sOut.replaceAll('αἴ', 'aí') //
  sOut = sOut.replaceAll('αι', 'ai') //
  sOut = sOut.replaceAll('αί', 'aí') //
  sOut = sOut.replaceAll('εῖ', 'éì') //
  sOut = sOut.replaceAll('εἷ', 'héì') //
  sOut = sOut.replaceAll('εἶ', 'éì') //
  sOut = sOut.replaceAll('εἵ', 'heí') //
  sOut = sOut.replaceAll('εἴ', 'eí') //
  sOut = sOut.replaceAll('εί', 'eí') //
  sOut = sOut.replaceAll('ει', 'ei') //
  sOut = sOut.replaceAll('οῖ', 'óì') //
  sOut = sOut.replaceAll('οἷ', 'hóì') //
  sOut = sOut.replaceAll('οἶ', 'óì') //
  sOut = sOut.replaceAll('οἵ', 'hoí') //
  sOut = sOut.replaceAll('οἴ', 'oí') //
  sOut = sOut.replaceAll('οι', 'oi') //
  sOut = sOut.replaceAll('οὗ', 'hóù') //
  sOut = sOut.replaceAll('οὖ', 'oi') //
  sOut = sOut.replaceAll('οὕ', 'hoú') //
  sOut = sOut.replaceAll('οὔ', 'oú') //
  sOut = sOut.replaceAll('ᾷ', 'áì') //
  sOut = sOut.replaceAll('ᾶ', 'áà') //
  sOut = sOut.replaceAll('ἇ', 'háà') //
  sOut = sOut.replaceAll('ἆ', 'áà') //
  sOut = sOut.replaceAll('ἅ', 'há') //
  sOut = sOut.replaceAll('ἄ', 'á') //
  sOut = sOut.replaceAll('ά', 'á') //
  sOut = sOut.replaceAll('ἁ', 'ha') //
  sOut = sOut.replaceAll('ἀ', 'a') //
  sOut = sOut.replaceAll('ᾰ', 'a') //
  sOut = sOut.replaceAll('ᾱ', 'aa') //
  sOut = sOut.replaceAll('α', 'a') //
  sOut = sOut.replaceAll('ε', 'e') //
  sOut = sOut.replaceAll('ῇ', 'éì') //
  sOut = sOut.replaceAll('ῆ', 'éè') //
  sOut = sOut.replaceAll('ἧ', 'héè') //
  sOut = sOut.replaceAll('ἦ', 'éè') //
  sOut = sOut.replaceAll('ή', 'eé') //
  sOut = sOut.replaceAll('ἥ', 'heé') //
  sOut = sOut.replaceAll('ἡ', 'hee') //
  sOut = sOut.replaceAll('ἠ', 'ee') //
  sOut = sOut.replaceAll('η', 'ee') //
  sOut = sOut.replaceAll('ἷ', 'híì') //
  sOut = sOut.replaceAll('ἶ', 'íì') //
  sOut = sOut.replaceAll('ἵ', 'hí') //
  sOut = sOut.replaceAll('ἴ', 'í') //
  sOut = sOut.replaceAll('ί', 'í') //
  sOut = sOut.replaceAll('ἱ', 'hi') //
  sOut = sOut.replaceAll('ἰ', 'i') //
  sOut = sOut.replaceAll('ῐ', 'i') //
  sOut = sOut.replaceAll('ῑ', 'ii') //
  sOut = sOut.replaceAll('ι', 'i') //
  sOut = sOut.replaceAll('ὁ', 'ho') //
  sOut = sOut.replaceAll('ό', 'ó') //
  sOut = sOut.replaceAll('ὸ', 'ò') //
  sOut = sOut.replaceAll('ο', 'o') //
  sOut = sOut.replaceAll('ὗ', 'húù') //
  sOut = sOut.replaceAll('ὖ', 'úù') //
  sOut = sOut.replaceAll('ῠ', 'u') //
  sOut = sOut.replaceAll('ῡ', 'uu') //
  sOut = sOut.replaceAll('υ', 'u') //
  sOut = sOut.replaceAll('ῷ', 'óì') //
  sOut = sOut.replaceAll('ῶ', 'óò') //
  sOut = sOut.replaceAll('ὧ', 'hóò') //
  sOut = sOut.replaceAll('ὦ', 'óò') //
  sOut = sOut.replaceAll('ώ', 'oó') //
  sOut = sOut.replaceAll('ω', 'oo') //

  //σύμφωνα
  sOut = sOut.replaceAll('Β', 'b') //
  sOut = sOut.replaceAll('β', 'b') //
  sOut = sOut.replaceAll('Γ', 'g') //
  sOut = sOut.replaceAll('γ', 'g') //
  sOut = sOut.replaceAll('Δ', 'd') //
  sOut = sOut.replaceAll('δ', 'd') //
  sOut = sOut.replaceAll('Ζ', 'zd') //
  sOut = sOut.replaceAll('ζ', 'zd') //
  sOut = sOut.replaceAll('Θ', 'tʰ') //
  sOut = sOut.replaceAll('θ', 'tʰ') //
  sOut = sOut.replaceAll('Κ', 'k') //
  sOut = sOut.replaceAll('κ', 'k') //
  sOut = sOut.replaceAll('ΛΛ', 'l2') // long l
  sOut = sOut.replaceAll('λλ', 'l2') // long l
  sOut = sOut.replaceAll('Λ', 'l') //
  sOut = sOut.replaceAll('λ', 'l') //
  sOut = sOut.replaceAll('Μ', 'm') //
  sOut = sOut.replaceAll('μ', 'm') //
  sOut = sOut.replaceAll('Ν', 'n') //
  sOut = sOut.replaceAll('ν', 'n') //
  sOut = sOut.replaceAll('Ξ', 'ks') //
  sOut = sOut.replaceAll('ξ', 'ks') //
  sOut = sOut.replaceAll('Π', 'p') //
  sOut = sOut.replaceAll('π', 'p') //
  sOut = sOut.replaceAll('Ρ', 'r') //
  sOut = sOut.replaceAll('ρ', 'r') //
  sOut = sOut.replaceAll('Σ', 's') //
  sOut = sOut.replaceAll('σ', 's') //
  sOut = sOut.replaceAll('Τ', 't') //
  sOut = sOut.replaceAll('τ', 't') //
  sOut = sOut.replaceAll('Φ', 'pʰ') //
  sOut = sOut.replaceAll('φ', 'pʰ') //
  sOut = sOut.replaceAll('Χ', 'kʰ') //
  sOut = sOut.replaceAll('χ', 'kʰ') //
  sOut = sOut.replaceAll('Ψ', 'ps') //
  sOut = sOut.replaceAll('ψ', 'ps') //

  return sOut
}

export {
  fEllawordFindPhonema
}