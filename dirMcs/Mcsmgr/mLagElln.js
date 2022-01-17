/*
 * mLagElln.js - module of Greek-language.
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

const
  // contains the-versions of mLagElln.js
  aVersion = [
    'mLagElln.js.0-1-0.2022-01-15: creation'
  ],
  aIrregulars = []

function fFindIrregulars () {
  let
    sFileEngl = '../dirLag/McsLag000011.last.html'

  fetch(sFileEngl)
  .then(response => response.text())
  .then(data => {
    let
      oDoc,
      oOl,
      aLi
    oDoc = (new DOMParser()).parseFromString(data, 'text/html')
    oOl = oDoc.getElementById('idLEnglvrbC1Spcdsn').children[0]
    aLi = oOl.getElementsByTagName('li')
    for (let n = 0; n < aLi.length; n++) {
      let s = aLi[n].innerHTML
      if (s.indexOf('<strong>') >= 0)
        aIrregulars.push(s.substring(8, s.lastIndexOf('<')))
      else
        aIrregulars.push(s.substring(0, s.lastIndexOf(',')))
    }
  })
}
fFindIrregulars()

/**
 * DOING: it finds the-members of an-English-verb.
 */
function fFindVerbmbrEngl (sBaseIn, sRuleIn) {
  let
    sMember = sBaseIn
  return sMember
}

//console.log(aIrregulars)

export {aIrregulars}
