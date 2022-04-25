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
 * DOING: it finds the-phonemic-notation of a-GreekAncient-text-word.
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
  //Ά|Α|ά|α|ἀ|ἁ|ἂ|ἃ|ἄ|ἅ|ἆ|ἇ|Ἀ|Ἁ|Ἂ|Ἃ|Ἄ|Ἅ|Ἆ|Ἇ|ὰ|ά|ᾀ|ᾁ|ᾂ|ᾃ|ᾄ|ᾅ|ᾆ|ᾇ|ᾈ|ᾉ|ᾊ|ᾋ|ᾌ|ᾍ|ᾎ|ᾏ|ᾰ|ᾱ|ᾲ|ᾳ|ᾴ|ᾶ|ᾷ|Ᾰ|Ᾱ|Ὰ|Ά|ᾼ
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
  //Έ|Ε|έ|ε|ἐ|ἑ|ἒ|ἓ|ἔ|ἕ|Ἐ|Ἑ|Ἒ|Ἓ|Ἔ|Ἕ|ὲ|έ|Ὲ|Έ
  sOut = sOut.replaceAll('ε', 'e') //
  //Ή|Η|ή|η|ἠ|ἡ|ἢ|ἣ|ἤ|ἥ|ἦ|ἧ|Ἠ|Ἡ|Ἢ|Ἣ|Ἤ|Ἥ|Ἦ|Ἧ|ὴ|ή|ᾐ|ᾑ|ᾒ|ᾓ|ᾔ|ᾕ|ᾖ|ᾗ|ᾘ|ᾙ|ᾚ|ᾛ|ᾜ|ᾝ|ᾞ|ᾟ|ῂ|ῃ|ῄ|ῆ|ῇ|Ὴ|Ή|ῌ
  sOut = sOut.replaceAll('ῇ', 'éì') //
  sOut = sOut.replaceAll('ῆ', 'éè') //
  sOut = sOut.replaceAll('ἧ', 'héè') //
  sOut = sOut.replaceAll('ἦ', 'éè') //
  sOut = sOut.replaceAll('ή', 'eé') //
  sOut = sOut.replaceAll('ἥ', 'heé') //
  sOut = sOut.replaceAll('ἡ', 'hee') //
  sOut = sOut.replaceAll('ἠ', 'ee') //
  sOut = sOut.replaceAll('η', 'ee') //
  //Ί|Ι|ί|ι|ἰ|ἱ|ἲ|ἳ|ἴ|ἵ|ἶ|ἷ|Ἰ|Ἱ|Ἲ|Ἳ|Ἴ|Ἵ|Ἶ|Ἷ|ὶ|ί|ῐ|ῑ|ῒ|ΐ|ῖ|ῗ|Ῐ|Ῑ|Ὶ|Ί
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
  //Ό|Ο|ο|ό|ὀ|ὁ|ὂ|ὃ|ὄ|ὅ|Ὀ|Ὁ|Ὂ|Ὃ|Ὄ|Ὅ|ὸ|ό|Ὸ|Ό
  sOut = sOut.replaceAll('ὁ', 'ho') //
  sOut = sOut.replaceAll('ό', 'ó') //
  sOut = sOut.replaceAll('ὸ', 'ò') //
  sOut = sOut.replaceAll('ο', 'o') //
  //Ύ|Υ|υ|ύ|ὐ|ὑ|ὒ|ὓ|ὔ|ὕ|ὖ|ὗ|Ὑ|Ὓ|Ὕ|Ὗ|ὺ|ύ|ῠ|ῡ|ῢ|ΰ|ῦ|ῧ|Ῠ|Ῡ|Ὺ|Ύ
  sOut = sOut.replaceAll('ὗ', 'húù') //
  sOut = sOut.replaceAll('ὖ', 'úù') //
  sOut = sOut.replaceAll('ῠ', 'u') //
  sOut = sOut.replaceAll('ῡ', 'uu') //
  sOut = sOut.replaceAll('υ', 'u') //
  //Ώ|Ω|ω|ώ|ὠ|ὡ|ὢ|ὣ|ὤ|ὥ|ὦ|ὧ|Ὠ|Ὡ|Ὢ|Ὣ|Ὤ|Ὥ|Ὦ|Ὧ|ὼ|ώ|ᾠ|ᾡ|ᾢ|ᾣ|ᾤ|ᾥ|ᾦ|ᾧ|ᾨ|ᾩ|ᾪ|ᾫ|ᾬ|ᾭ|ᾮ|ᾯ|ῲ|ῳ|ῴ|ῶ|ῷ|Ὼ|Ώ|ῼ
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

  return '/' + sOut + '/'
}

/*
 * DOING: it finds the-phonemic-notation of a-GreekAncient-text-word from GreekNew.
 * INPUT: βῆ
 * OUTPUT: /vi/
 */
function fEllawordFindPhonemaNew (sWordIn) {
  let
    nIndex,
    sOut = sWordIn

  //φωνήεντα
  sOut = sOut.replaceAll('αῖ', 'é') //
  sOut = sOut.replaceAll('αἷ', 'é') //
  sOut = sOut.replaceAll('αἶ', 'é') //
  sOut = sOut.replaceAll('αἵ', 'é') //
  sOut = sOut.replaceAll('αἴ', 'é') //
  sOut = sOut.replaceAll('αί', 'é') //
  sOut = sOut.replaceAll('αι', 'e') //
  sOut = sOut.replaceAll('εῖ', 'í') //
  sOut = sOut.replaceAll('εἷ', 'í') //
  sOut = sOut.replaceAll('εἶ', 'í') //
  sOut = sOut.replaceAll('εἵ', 'í') //
  sOut = sOut.replaceAll('εἴ', 'í') //
  sOut = sOut.replaceAll('εί', 'í') //
  sOut = sOut.replaceAll('ει', 'i') //
  sOut = sOut.replaceAll('οῖ', 'í') //
  sOut = sOut.replaceAll('οἷ', 'í') //
  sOut = sOut.replaceAll('οἶ', 'í') //
  sOut = sOut.replaceAll('οἵ', 'í') //
  sOut = sOut.replaceAll('οἴ', 'í') //
  sOut = sOut.replaceAll('οι', 'i') //
  sOut = sOut.replaceAll('οὗ', 'ú') //
  sOut = sOut.replaceAll('οὖ', 'ú') //
  sOut = sOut.replaceAll('οὕ', 'ú') //
  sOut = sOut.replaceAll('οὔ', 'ú') //
  sOut = sOut.replaceAll('ού', 'ú') //
  sOut = sOut.replaceAll('ου', 'u') //
  sOut = sOut.replaceAll('ᾷ', 'á') //
  sOut = sOut.replaceAll('ᾶ', 'á') //
  sOut = sOut.replaceAll('ἇ', 'á') //
  sOut = sOut.replaceAll('ἆ', 'á') //
  sOut = sOut.replaceAll('ἅ', 'á') //
  sOut = sOut.replaceAll('ἄ', 'á') //
  sOut = sOut.replaceAll('ά', 'á') //
  sOut = sOut.replaceAll('ἁ', 'a') //
  sOut = sOut.replaceAll('ἀ', 'a') //
  sOut = sOut.replaceAll('ᾰ', 'a') //
  sOut = sOut.replaceAll('ᾱ', 'a') //
  sOut = sOut.replaceAll('α', 'a') //
  sOut = sOut.replaceAll('ε', 'e') //
  sOut = sOut.replaceAll('ῇ', 'ì') //
  sOut = sOut.replaceAll('ῆ', 'ì') //
  sOut = sOut.replaceAll('ἧ', 'ì') //
  sOut = sOut.replaceAll('ἦ', 'ì') //
  sOut = sOut.replaceAll('ή', 'ì') //
  sOut = sOut.replaceAll('ἥ', 'ì') //
  sOut = sOut.replaceAll('ἡ', 'i') //
  sOut = sOut.replaceAll('ἠ', 'i') //
  sOut = sOut.replaceAll('η', 'i') //
  sOut = sOut.replaceAll('ἷ', 'í') //
  sOut = sOut.replaceAll('ἶ', 'í') //
  sOut = sOut.replaceAll('ἵ', 'í') //
  sOut = sOut.replaceAll('ἴ', 'í') //
  sOut = sOut.replaceAll('ί', 'í') //
  sOut = sOut.replaceAll('ἱ', 'i') //
  sOut = sOut.replaceAll('ἰ', 'i') //
  sOut = sOut.replaceAll('ῐ', 'i') //
  sOut = sOut.replaceAll('ῑ', 'i') //
  sOut = sOut.replaceAll('ι', 'i') //
  sOut = sOut.replaceAll('ὁ', 'o') //
  sOut = sOut.replaceAll('ό', 'ó') //
  sOut = sOut.replaceAll('ὸ', 'ó') //
  sOut = sOut.replaceAll('ο', 'o') //
  sOut = sOut.replaceAll('ὗ', '') //
  sOut = sOut.replaceAll('ὖ', 'í') //
  sOut = sOut.replaceAll('ῠ', 'i') //
  sOut = sOut.replaceAll('ῡ', 'i') //
  sOut = sOut.replaceAll('υ', 'i') //
  sOut = sOut.replaceAll('ῷ', 'ó') //
  sOut = sOut.replaceAll('ῶ', 'ó') //
  sOut = sOut.replaceAll('ὧ', 'ó') //
  sOut = sOut.replaceAll('ὦ', 'ó') //
  sOut = sOut.replaceAll('ώ', 'ó') //
  sOut = sOut.replaceAll('ω', 'o') //

  //σύμφωνα
  sOut = sOut.replaceAll('Β', 'v') //
  sOut = sOut.replaceAll('β', 'v') //
  sOut = sOut.replaceAll('Γ', 'y') //
  sOut = sOut.replaceAll('γ', 'y') //
  sOut = sOut.replaceAll('Δ', 'dh') //
  sOut = sOut.replaceAll('δ', 'dh') //
  sOut = sOut.replaceAll('Ζ', 'z') //
  sOut = sOut.replaceAll('ζ', 'z') //
  sOut = sOut.replaceAll('Θ', 'th') //
  sOut = sOut.replaceAll('θ', 'th') //
  sOut = sOut.replaceAll('Κ', 'k') //
  sOut = sOut.replaceAll('κ', 'k') //
  sOut = sOut.replaceAll('ΛΛ', 'l') // long l
  sOut = sOut.replaceAll('λλ', 'l') // long l
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
  sOut = sOut.replaceAll('Φ', 'f') //
  sOut = sOut.replaceAll('φ', 'f') //
  sOut = sOut.replaceAll('Χ', 'h') //
  sOut = sOut.replaceAll('χ', 'h') //
  sOut = sOut.replaceAll('Ψ', 'ps') //
  sOut = sOut.replaceAll('ψ', 'ps') //

  return '/' + sOut + '/'
}

export {
  fEllawordFindPhonema, fEllawordFindPhonemaNew
}