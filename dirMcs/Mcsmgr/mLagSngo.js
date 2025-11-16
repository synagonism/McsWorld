/*
 * mLagSngo.js - module with misc util language functions.
 * The MIT License (MIT)
 *
 * Copyright (c) 2025 Kaseluris.Nikos.1959 (Synagonism)
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
  // contains the-versions of mLagSngo.js
  aVersion = [
    'mLagSngo.js.1-0-0.2025-11-09: fPickWeightedRandomElement',
    'mLagSngo.js.0-2-0.2025-11-09: fCreateNewWord',
    'mLagSngo.js.0-1-0.2025-11-08: creation'
  ],
  aVowl = ['a','e','i','o','u'],
  aCons = ['p','f','Θ','t','s','c','k','h','m','r','b','v','δ','d','z','j','g','y','n','l'],
  aSylb = [
    // english: C: 65%, Ø: 22%, CC: 12%, CCC: 1%
    // english: /s, t, p, k, b, d, f, m, n, r, l, w, h, g, j/
    // english: /pr, br, tr, dr, kr, gr, pl, bl, kl, gl/ /fl, fr/ /sp, st, sk/  /sl, sm, sn, sw/  /tw, dw, kw, gw/
    
    // slavic: plosives /p, t, k, b, d, g/ fricatives /s, v, z, ʃ/
    
    // Chinese: sh, j, zh, l** | ~5% - 7%
    // Chinese: y, d, b, z, w** | ~4% - 5%
    // Chinese: g, h, x, t, m, r** | ~3% - 4
    // Chinese: q, k, n, s, c** | ~2% - 3%
    // Chinese: f, p, ch** | ~1% - 2% 
    's;80','ss;70','z;74','zz;40','c;79','cc;69','j;69','jj;50','y;78','yy;68',
    'h;64','l;77','ll;67','t;76','b;75','p;64',
    'd;75','g;74','gg;40','k;64','m;73','n;72','nn;72','v;71','f;70','r;60',
    'δ;30','θ;30',
    'a;59','e;59','i;59','o;59','u;59',
    'pl;9','pll;9','pn;9','pr;9','ps;9','pt;5',
    'fl;9','fr;9','ft;9',
    'tr;9',
    'sf;4','sh;4','sk;9','sl;9','sn;9','sp;9','sr;9','st;9',
    'cn;9','cp;9','cr;9',
    'kl;9','kn;9','kr;9','ks;9','kt;9','kv;9',
    'hk;9','hl;9','hn;9','hp;9','hr;9','hs;9','ht;9',
    'mn;9',
    'gl;9','gll;9','gn;9','gr;9',
    'yr;9',
    'lv;9',
    'dr;9','dv;9',
    'skl;5','skr;5','spr;9','str;5',
    'vl;9','vr;9',
    'bl;9','bll;1','br;9',
    'δr;2','δyy;2',
    'θl;2','θn;2','θr;2'
  ],
  aSylb2 = [
    'p;74','f;74','θ;74','t;74','s;74','c;74','k;74','h;74','m;74','r;74',
    'b;74','v;74','δ;74','d;74','z;74','j;74','g;74','g;70','y;74','yy;70','n;74','nn;70','l;74','ll;70',
    'a;22','e;22','i;22','o;22','u;22','δ;22',
    'pc;9','pf;9','ph;9','phh;9','pk;9','pkk;9','pl;9','pll;9','pn;9','pnn;9','pr;9','ps;9','pt;9','pθ;9','pyy;9',
    'fc;9','fh;9','fhh;9','fk;9','fkk;9','fl;9','fn;9','fnn;9','fp;9','fr;9','fs;9','ft;9','fθ;9',
    'θc;9','θf;9','θh;9','θhh;9','θj;9','θk;9','θkk;9','θl;9','θll;9','θn;9','θnn;9','θr;9','θs;9','θt;9','θyy;9',
    'tf;9','tk;9','tkk;9','tl;9','tll;9','tn;9','tnn;9','tp;9','tr;9','tr;9','tθ;9',
    'sc;9','scc;9','sf;9','sh;9','sk;9','skl;9','skr;9','sl;9','sn;9','snn;9','sp;9','spr;9','sr;9','ss;9','st;9','sθ;9',
    'cf;9','ch;9','ck;9','cl;9','cn;9','cnn;9','cp;9','cr;9','ct;9','cθ;9',
    'kc;9','kf;9','kh;9','khh;9','kl;9','kll;9','kn;9','knn;9','kp;9','kr;9','ks;9','kt;9','kθ;9','kv;9',
    'hc;9','hf;9','hk;9','hkk;9','hl;9','hll;9','hn;9','hnn;9','hp;9','hr;9','hs;9','ht;9','hθ;9',
    'mb;9','mc;9','md;9','mδ;9','mf;9','mg;9','mgg;9','mh;9','mhh;9','mj;9','ml;9','mll;9','mn;9','mnn;9','mr;9','mθ;9','mv;9','my;9','myy;9','mz;9',
    'rb;9','rc;9','rd;9','rδ;9','rf;9','rg;9','rgg;9','rh;9','rhh;9','rj;9','rk;9','rkk;9','rl;9','rll;9','rm;9','rn;9','rnn;9','rp;9','rs;9','rt;9','rθ;9','rv;9','ry;9','ryy;9','rz;9',
    'bd;9','bδ;9','bg;9','bgg;9','bj;9','bl;9','bll;9','bn;9','bnn;9','br;9','bv;9','by;9','byy;9','bz;9',
    'vb;9','vd;9','vδ;9','vg;9','vgg;9','vj;9','vl;9','vll;9','vn;9','vnn;9','vr;9','vy;9','vyy;9','vz;9',
    'δb;9','δd;9','δg;9','δgg;9','δj;9','δl;9','δll;9','δn;9','δnn;9','δr;9','δv;9','δy;9','δyy;9',
    'dδ;9','dg;9','dgg;9','dj;9','dl;9','dll;9','dn;9','dnn;9','dr;9','dr;9','dv;9','dy;9','dyy;9','dz;9',
    'zc;9','zcc;9','zl;9','zn;9','znn;9','zr;9','zt;9','zθ;9',
    'jd;9','jδ;9','jg;9','jgg;9','jj;9','jl;9','jll;9','jn;9','jnn;9','jr;9','jy;9','jyy;9',
    'gd;9','gδ;9','gg;9','gl;9','gll;9','gn;9','gnn;9','gr;9','gv;9','gz;9',
    'yd;9','yδ;9','yg;9','ygg;9','yy;9','yl;9','yll;9','yn;9','ynn;9','yr;9','yv;9','yz;9',
    'nb;9','nc;9','nd;9','nδ;9','nf;9','ng;9','ngg;9','nh;9','nhh;9','nn;9','nk;9','nkk;9','nl;9','nll;9','nm;9','nn;9','np;9','nr;9','ns;9','nt;9','nθ;9','nv;9','ny;9','nyy;9','nz;9',
    'lb;9','lc;9','ld;9','lδ;9','lf;9','lg;9','lh;9','ll;9','lk;9','ll;9','ln;9','lp;9','lr;9','ls;9','lt;9','lθ;9','lv;9','ly;9','lz;9',
    'str;5'
  ]

/**
 * DOING: it creates a-new Sinago-word
 * INPUT: WordType, SyllableNumber, StartPart
 * OUTPUT: a-Sinago-word
 */
function fCreateNewWord (sTypeIn, nSylbIn, sStartIn) {
  let
    sSylb1 = '',
    sSylb2 = '',
    sSylb3 = '',
    sSylb4 = '',
    sSylb5 = '',
    nSylbStart = 0,
    sWordOut = ''

  nSylbIn = Number(nSylbIn)
  // create the-syllables asked
  if (sTypeIn === 'noun') {
    sSylb1 = fPickNounSylb()
    sSylb2 = fPickNounSylb()
    sSylb3 = fPickNounSylb()
    sSylb4 = fPickNounSylb()
    sSylb5 = fPickNounSylb()
  } else if (sTypeIn === 'verb') {
    sSylb1 = fPickVerbSylb()
    sSylb2 = fPickVerbSylb()
    sSylb3 = fPickVerbSylb()
    sSylb4 = fPickVerbSylb()
    sSylb5 = fPickVerbSylb()
  } else if (sTypeIn === 'conjunction') {
    sSylb1 = fPickConjSylb()
    sSylb2 = fPickConjSylb()
    sSylb3 = fPickConjSylb()
    sSylb4 = fPickConjSylb()
    sSylb5 = fPickConjSylb()
  }
  console.log(sSylb1)
  if (sStartIn !== '' && !'aeiou'.includes(sStartIn.slice(-1))
      && (sStartIn.length === 1 && 'aeiou'.includes(sStartIn))) {
    if (sTypeIn === 'noun') sStartIn = sStartIn + fPickNounVowel()
    else if (sTypeIn === 'verb') sStartIn = sStartIn + fPickVerbVowel()
    else if (sTypeIn === 'conjunction') sStartIn = sStartIn + fPickConjVowel()
  }
  nSylbStart = fCountSyllables(sStartIn)
  //console.log(sStartIn)
  if (nSylbIn <= nSylbStart) {
    sWordOut = fPickFirstSyllables(sStartIn, nSylbIn)
  } else if (nSylbIn - nSylbStart === 1) {
    sWordOut = sStartIn + sSylb1
  } else if (nSylbIn - nSylbStart === 2) {
    sWordOut = sStartIn + sSylb1 + sSylb2
  } else if (nSylbIn - nSylbStart === 3) {
    sWordOut = sStartIn + sSylb1 + sSylb2 + sSylb3
  } else if (nSylbIn - nSylbStart === 4) {
    sWordOut = sStartIn + sSylb1 + sSylb2 + sSylb3 + sSylb4
  } else if (nSylbIn - nSylbStart === 5) {
    sWordOut = sStartIn + sSylb1 + sSylb2 + sSylb3 + sSylb4 + sSylb5
  } 
  // make word match type
  if (sTypeIn === 'noun') sWordOut = sWordOut.slice(0, -1) + 'o'
  else if (sTypeIn === 'verb') sWordOut = sWordOut.slice(0, -1) + 'i'
  else if (sTypeIn === 'conjunction') sWordOut = sWordOut.slice(0, -1) + 'a'
  // clear
  sWordOut = sWordOut.replace('cci', 'ci')
  sWordOut = sWordOut.replace('cce', 'ce')
  sWordOut = sWordOut.replace('jji', 'ji')
  sWordOut = sWordOut.replace('jje', 'je')
  sWordOut = sWordOut.replace('kki', 'ki')
  sWordOut = sWordOut.replace('kke', 'ke')
  sWordOut = sWordOut.replace('ggi', 'gi')
  sWordOut = sWordOut.replace('gge', 'ge')
  sWordOut = sWordOut.replace('hhi', 'hi')
  sWordOut = sWordOut.replace('hhe', 'he')
  sWordOut = sWordOut.replace('yyi', 'yi')
  sWordOut = sWordOut.replace('yye', 'ye')
  sWordOut = sWordOut.replace('lli', 'li')
  sWordOut = sWordOut.replace('lle', 'le')
  sWordOut = sWordOut.replace('nni', 'ni')
  sWordOut = sWordOut.replace('nne', 'ne')
  sWordOut = sWordOut.replace('ssi', 'si')
  sWordOut = sWordOut.replace('sse', 'se')
  sWordOut = sWordOut.replace('zzi', 'zi')
  sWordOut = sWordOut.replace('zze', 'ze')
  return sWordOut
}

/**
 * DOING: it counts the-vowels, same with syllables
 */
function fCountSyllables(sIn) {
  const sVowels = 'aeiouAEIOU';
  let nCount = 0;
  for (let sChar of sIn) {
    if (sVowels.includes(sChar)) {
      nCount++;
    }
  }
  return nCount;
}

/**
 * DOING: check if
 *        - nouns end in -o and have no -o internally
 *        - verbs end in -i and have no -i internally
 *        - conjunctions end in -a and have no -a internally
 * INPUT: a-word and its type
 * OUPT: a) yes, b) no: reason
 */
function fIsValidWord(sIn, sTypeIn) {
  let sChar = ''
  for (let n = 0; n < sIn.length; n++) {
    sChar = sIn[n]
    if (sTypeIn === 'noun') {
      if (n === sIn.length - 1) {
        //last letter
        if (sChar !== 'o') return 'no: last char must-be -o'
      } else if (sChar === 'o') {
        return 'no: internal char must-NOT-be -o'
      }
    }
    else if (sTypeIn === 'verb') {
      if (n === sIn.length - 1) {
        if (sChar !== 'i') return 'no: last char must-be -i'
      } else if (sChar === 'i') {
        return 'no: internal char must-NOT-be -i'
      }
    }
    else if (sTypeIn === 'conjunction') {
      if (n === sIn.length - 1) {
        if (sChar !== 'a') return 'no: last char must-be -a'
      } else if (sChar === 'a') {
        return 'no: internal char must-NOT-be -a'
      }
    }
    else if (sTypeIn === undefined || sStartIn === '') {
      return 'no: invalid type'
    }
  }
  return 'yes'
}

/**
 * DOING: returns a-random element of a-waited-array ['a;74','b;8']
 */
function fPickWeightedRandomElement(aIn) {
  const
    nTotalWeight = aIn.reduce((nTotal, sItem) => nTotal + Number(sItem.split(';')[1]), 0),
    // normalize array to sum 1
    aInNrm = aIn.map(w => w.split(';')[0]+';'+w.split(';')[1]/nTotalWeight)
  let
    nIdx = 0,
    nP = Math.random(),
    nSum = 0

  if (aIn.length === 0) {
    return null; // Handle empty array
  }
  for (let n = 0; n < aInNrm.length; n++) {
    if (nSum < nP && nP <= nSum + Number(aInNrm[n].split(';')[1])) return aInNrm[n].split(';')[0]
    nSum = nSum + Number(aInNrm[n].split(';')[1])
  }
  // Fallback (should rarely happen)
  return aInNrm[5].split(';')[0];
}

/**
 * DOING: returns a-random element of an-array
 */
function fPickRandomElement(aIn) {
  if (aIn.length === 0) {
    return null; // Handle empty array
  }
  const nRandomIndex = Math.floor(Math.random() * aIn.length);
  return aIn[nRandomIndex];

  /* 
  let
    nRandomIndex = 0,
    nP = Math.random(),
    nSum = 0
  for (let n = 0; n < aIn.length; n++) {
    if (nSum < nP && nP <= nSum + (1.0/aIn.length)) nRandomIndex = n
    nSum = nSum + (1.0/aIn.length);
  }
  return aIn[nRandomIndex]
  */
}

/**
 * DOING: returns a-random a,e,i,u
 */
function fPickNounVowel() {
  return fPickRandomElement(['a','e','i','u'])
}
function fPickNounSylb() {
  let sSylb = fPickWeightedRandomElement(aSylb)
  if (sSylb.length === 1 && 'aeiou'.includes(sSylb))
    return fPickRandomElement(['a','e','i','u'])
  else
    return sSylb + fPickRandomElement(['a','e','i','u'])
}

/**
 * DOING: returns a-random a,e,o,u
 */
function fPickVerbVowel() {
  return fPickRandomElement(['a','e','o','u'])
}
function fPickVerbSylb() {
  let sSylb = fPickWeightedRandomElement(aSylb)
  if (sSylb.length === 1 && 'aeiou'.includes(sSylb))
    return fPickRandomElement(['a','e','o','u'])
  else
    return sSylb + fPickRandomElement(['a','e','o','u'])
}

/**
 * DOING: returns a-random e,i,o,u
 */
function fPickConjVowel() {
  return fPickRandomElement(['e','i','o','u'])
}
function fPickConjSylb() {
  let sSylb = fPickWeightedRandomElement(aSylb)
  if (sSylb.length === 1 && 'aeiou'.includes(sSylb))
    return fPickRandomElement(['e','i','o','u'])
  else
    return sSylb + fPickRandomElement(['e','i','o','u'])
}

/**
 * DOING: returns first syllables of a-string
 */
function fPickFirstSyllables(sIn, nSylbIn) {
  let
    n,
    nCounter = 0,
    sOut = '',
    sSylbOut

  for (n = 0; n < sIn.length; n++) {
    sOut = sOut + sIn[n]
    if ('aeiou'.includes(sIn[n])) {
      // found vowel
      nCounter = nCounter + 1
      sSylbOut = sOut
      if (nCounter === nSylbIn) return sSylbOut
    }
  }
  // return only syllables
  return sSylbOut
}

//ΒβΓγΔδζΘθΚκΛλΜμΝνΞξΠπΡρΣσςΤτΦφΧχΨψ
//ΑΆαάΒβΓγΔδΕΈεέΖζΗΉηήΘθΙΊιίϊΐΚκΛλΜμΝνΞξΟΌοόΠπΡρΣσςΤτΥΎυύϋΰΦφΧχΨψΩΏωώ
export {
  fCreateNewWord
}