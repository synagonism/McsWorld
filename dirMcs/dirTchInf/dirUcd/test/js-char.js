/**
 * Create filMcsUblock.last.html files.
 *
 * Input: fil15-alpha.html
 * Output: filMcsUblock.last.html files
 * run: node js-char.js
 *
 * version.0-3-0.2018-06-25,
 * version.0-2-0.2018-06-24,
 * version.0-1-0.2018-06-23,
 */


var
  moFs = require('fs'),
  moUtil = require('js-moUtil.js'),
  sFileIn = 'fil15-alpha.html',
  sFileOut = 'filMcs', //filMcsU0080.last.html
  sOut,
  sOutLast, //html after sections of chas
  aLines = moFs.readFileSync(sFileIn).toString().split('\n'),
  //Directory of the-concept (dirCor or else)
  sDir = 'dirUcd',
  sDIR = 'DirUcd',
  sBname = 'Basic-Latin',
  sBcp1, //codepoint1 U+HHHH
  sBcp2,
  nBcp1, //number of block codepoint first
  nBcp2, //number of block codepoint last
  sBdsn, //element description
  sBchr,
  oBlockChars,
  //Name of the-title
  sN = 'block.U+0000/decimal/glyph..U+007F/decimal/glyph',
  //5. SHORT-name eg Dcc-net, Đnet, ĐEthereum,
  sNS = 'U+0000..U+007F',
  // FILE-name: shows relation of another file
  // Name for IDs eg Dtc, unique in this file.
  sNId = 'U0000',

  //char
  nChar = 0,
  sCout,
  sCId,
  sCcp, //U+HHHH
  sCcp2, //U+HHHH|decimal|glyph
  sCcp3, //decimal|U+HHHH|glyph
  sCname,
  sCdsn,
  sCnam;

//object with chars of blocks
oBlockChars = {
  "U+0000":128, "U+0080":128, "U+0100":128, "U+0180":208, "U+0250":96, "U+02B0":80, "U+0300":112, "U+0370":135, "U+0400":256, "U+0500":48, "U+0530":91, "U+0590":88, "U+0600":255, "U+0700":77, "U+0750":48, "U+0780":50, "U+07C0":62, "U+0800":61, "U+0840":29, "U+0860":11, "U+08A0":74, "U+0900":128, "U+0980":96, "U+0A00":80, "U+0A80":91, "U+0B00":90, "U+0B80":72, "U+0C00":97, "U+0C80":89, "U+0D00":117, "U+0D80":90, "U+0E00":87, "U+0E80":67, "U+0F00":211, "U+1000":160, "U+10A0":88, "U+1100":256, "U+1200":358, "U+1380":26, "U+13A0":92, "U+1400":640, "U+1680":29, "U+16A0":89, "U+1700":20, "U+1720":23, "U+1740":20, "U+1760":18, "U+1780":114, "U+1800":157, "U+18B0":70, "U+1900":68, "U+1950":35, "U+1980":83, "U+19E0":32, "U+1A00":30, "U+1A20":127, "U+1AB0":15, "U+1B00":121, "U+1B80":64, "U+1BC0":56, "U+1C00":74, "U+1C50":48, "U+1C80":9, "U+1C90":46, "U+1CC0":8, "U+1CD0":42, "U+1D00":128, "U+1D80":64, "U+1DC0":63, "U+1E00":256, "U+1F00":233, "U+2000":111, "U+2070":42, "U+20A0":32, "U+20D0":33, "U+2100":80, "U+2150":60, "U+2190":112, "U+2200":256, "U+2300":256, "U+2400":39, "U+2440":11, "U+2460":160, "U+2500":128, "U+2580":32, "U+25A0":96, "U+2600":256, "U+2700":192, "U+27C0":48, "U+27F0":16, "U+2800":256, "U+2900":128, "U+2980":128, "U+2A00":256, "U+2B00":250, "U+2C00":94, "U+2C60":32, "U+2C80":123, "U+2D00":40, "U+2D30":59, "U+2D80":79, "U+2DE0":32, "U+2E00":79, "U+2E80":115, "U+2F00":214, "U+2FF0":12, "U+3000":64, "U+3040":93, "U+30A0":96, "U+3100":43, "U+3130":94, "U+3190":16, "U+31A0":27, "U+31C0":36, "U+31F0":16, "U+3200":254, "U+3300":256, "U+3400":6582, "U+4DC0":64, "U+4E00":20976, "U+A000":1165, "U+A490":55, "U+A4D0":48, "U+A500":300, "U+A640":96, "U+A6A0":88, "U+A700":32, "U+A720":163, "U+A800":44, "U+A830":10, "U+A840":56, "U+A880":82, "U+A8E0":32, "U+A900":48, "U+A930":37, "U+A960":29, "U+A980":91, "U+A9E0":31, "U+AA00":83, "U+AA60":32, "U+AA80":72, "U+AAE0":23, "U+AB00":32, "U+AB30":54, "U+AB70":80, "U+ABC0":56, "U+AC00":11172, "U+D7B0":72, "U+D800":0, "U+DB80":0, "U+DC00":0, "U+E000":0, "U+F900":472, "U+FB00":58, "U+FB50":611, "U+FE00":16, "U+FE10":10, "U+FE20":16, "U+FE30":32, "U+FE50":26, "U+FE70":141, "U+FF00":225, "U+FFF0":5, "U+10000":88, "U+10080":123, "U+10100":57, "U+10140":79, "U+10190":13, "U+101D0":46, "U+10280":29, "U+102A0":49, "U+102E0":28, "U+10300":39, "U+10330":27, "U+10350":43, "U+10380":31, "U+103A0":50, "U+10400":80, "U+10450":48, "U+10480":40, "U+104B0":72, "U+10500":40, "U+10530":53, "U+10600":341, "U+10800":55, "U+10840":31, "U+10860":32, "U+10880":40, "U+108E0":26, "U+10900":29, "U+10920":27, "U+10980":32, "U+109A0":90, "U+10A00":68, "U+10A60":32, "U+10A80":32, "U+10AC0":51, "U+10B00":61, "U+10B40":30, "U+10B60":27, "U+10B80":29, "U+10C00":73, "U+10C80":108, "U+10D00":50, "U+10E60":31, "U+10F00":40, "U+10F30":42, "U+11000":109, "U+11080":67, "U+110D0":35, "U+11100":70, "U+11150":39, "U+11180":94, "U+111E0":20, "U+11200":62, "U+11280":38, "U+112B0":69, "U+11300":86, "U+11400":93, "U+11480":82, "U+11580":92, "U+11600":79, "U+11660":13, "U+11680":66, "U+11700":58, "U+11800":60, "U+118A0":84, "U+11A00":72, "U+11A50":81, "U+11AC0":57, "U+11C00":97, "U+11C70":68, "U+11D00":75, "U+11D60":63, "U+11EE0":25, "U+12000":922, "U+12400":116, "U+12480":196, "U+13000":1071, "U+14400":583, "U+16800":569, "U+16A40":43, "U+16AD0":36, "U+16B00":127, "U+16E40":91, "U+16F00":133, "U+16FE0":2, "U+17000":6130, "U+18800":755, "U+1B000":256, "U+1B100":31, "U+1B170":396, "U+1BC00":143, "U+1BCA0":4, "U+1D000":246, "U+1D100":231, "U+1D200":70, "U+1D2E0":20, "U+1D300":87, "U+1D360":25, "U+1D400":996, "U+1D800":672, "U+1E000":38, "U+1E800":213, "U+1E900":87, "U+1EC70":68, "U+1EE00":143, "U+1F000":44, "U+1F030":100, "U+1F0A0":82, "U+1F100":192, "U+1F200":64, "U+1F300":768, "U+1F600":80, "U+1F650":48, "U+1F680":108, "U+1F700":116, "U+1F780":89, "U+1F800":148, "U+1F900":213, "U+1FA00":14, "U+20000":42711, "U+2A700":4149, "U+2B740":222, "U+2B820":5762, "U+2CEB0":7473, "U+2F800":542, "U+E0000":97, "U+E0100":240, "U+F0000":0, "U+100000":0
}

var oBlockScripts={
  "U+0000":"Latin (52 characters), Common (76 characters)", "U+0080":"Latin (64 characters), Common (64 characters)", "U+0100":"Latin", "U+0180":"Latin", "U+0250":"Latin", "U+02B0":"Bopomofo (2 characters), Latin (14 characters), Common (64 characters)", "U+0300":"Inherited", "U+0370":"Coptic (14 characters), Greek (117 characters), Common (4 characters)", "U+0400":"Cyrillic (254 characters), Inherited (2 characters)", "U+0500":"Cyrillic", "U+0530":"Armenian (90 characters), Common (1 character)", "U+0590":"Hebrew", "U+0600":"Arabic (237 characters), Common (6 characters), Inherited (12 characters)", "U+0700":"Syriac", "U+0750":"Arabic", "U+0780":"Thaana", "U+07C0":"Nko", "U+0800":"Samaritan", "U+0840":"Mandaic", "U+0860":"Syriac", "U+08A0":"Arabic (73 characters), Common (1 character)", "U+0900":"Devanagari (124 characters), Common (2 characters), Inherited (2 characters)", "U+0980":"Bengali", "U+0A00":"Gurmukhi", "U+0A80":"Gujarati", "U+0B00":"Oriya", "U+0B80":"Tamil", "U+0C00":"Telugu", "U+0C80":"Kannada", "U+0D00":"Malayalam", "U+0D80":"Sinhala", "U+0E00":"Thai (86 characters), Common (1 character)", "U+0E80":"Lao", "U+0F00":"Tibetan (207 characters), Common (4 characters)", "U+1000":"Myanmar", "U+10A0":"Georgian (87 characters), Common (1 character)", "U+1100":"Hangul", "U+1200":"Ethiopic", "U+1380":"Ethiopic", "U+13A0":"Cherokee", "U+1400":"Canadian Aboriginal", "U+1680":"Ogham", "U+16A0":"Runic (86 characters), Common (3 characters)", "U+1700":"Tagalog", "U+1720":"Hanunoo (21 characters), Common (2 characters)", "U+1740":"Buhid", "U+1760":"Tagbanwa", "U+1780":"Khmer", "U+1800":"Mongolian (154 characters), Common (3 characters)", "U+18B0":"Canadian Aboriginal", "U+1900":"Limbu", "U+1950":"Tai Le", "U+1980":"New Tai Lue", "U+19E0":"Khmer", "U+1A00":"Buginese", "U+1A20":"Tai Tham", "U+1AB0":"Inherited", "U+1B00":"Balinese", "U+1B80":"Sundanese", "U+1BC0":"Batak", "U+1C00":"Lepcha", "U+1C50":"Ol Chiki", "U+1C80":"Cyrillic", "U+1C90":"Georgian", "U+1CC0":"Sundanese", "U+1CD0":"Common (15 characters), Inherited (27 characters)", "U+1D00":"Cyrillic (2 characters), Greek (15 characters), Latin (111 characters)", "U+1D80":"Greek (1 character), Latin (63 characters)", "U+1DC0":"Inherited", "U+1E00":"Latin", "U+1F00":"Greek", "U+2000":"Common (109 characters), Inherited (2 characters)", "U+2070":"Latin (15 characters), Common (27 characters)", "U+20A0":"Common", "U+20D0":"Inherited", "U+2100":"Greek (1 character), Latin (4 characters), Common (75 characters)", "U+2150":"Latin (41 characters), Common (19 characters)", "U+2190":"Common", "U+2200":"Common", "U+2300":"Common", "U+2400":"Common", "U+2440":"Common", "U+2460":"Common", "U+2500":"Common", "U+2580":"Common", "U+25A0":"Common", "U+2600":"Common", "U+2700":"Common", "U+27C0":"Common", "U+27F0":"Common", "U+2800":"Braille", "U+2900":"Common", "U+2980":"Common", "U+2A00":"Common", "U+2B00":"Common", "U+2C00":"Glagolitic", "U+2C60":"Latin", "U+2C80":"Coptic", "U+2D00":"Georgian", "U+2D30":"Tifinagh", "U+2D80":"Ethiopic", "U+2DE0":"Cyrillic", "U+2E00":"Common", "U+2E80":"Han", "U+2F00":"Han", "U+2FF0":"Common", "U+3000":"Han (15 characters), Hangul (2 characters), Common (43 characters), Inherited (4 characters)", "U+3040":"Hiragana (89 characters), Common (2 characters), Inherited (2 characters)", "U+30A0":"Katakana (93 characters), Common (3 characters)", "U+3100":"Bopomofo", "U+3130":"Hangul", "U+3190":"Common", "U+31A0":"Bopomofo", "U+31C0":"Common", "U+31F0":"Katakana", "U+3200":"Hangul (62 characters), Katakana (47 characters), Common (145 characters)", "U+3300":"Katakana (88 characters), Common (168 characters)", "U+3400":"Han", "U+4DC0":"Common", "U+4E00":"Han", "U+A000":"Yi", "U+A490":"Yi", "U+A4D0":"Lisu", "U+A500":"Vai", "U+A640":"Cyrillic", "U+A6A0":"Bamum", "U+A700":"Common", "U+A720":"Latin (158 characters), Common (5 characters)", "U+A800":"Syloti Nagri", "U+A830":"Common", "U+A840":"Phags Pa", "U+A880":"Saurashtra", "U+A8E0":"Devanagari", "U+A900":"Kayah Li (47 characters), Common (1 character)", "U+A930":"Rejang", "U+A960":"Hangul", "U+A980":"Javanese (90 characters), Common (1 character)", "U+A9E0":"Myanmar", "U+AA00":"Cham", "U+AA60":"Myanmar", "U+AA80":"Tai Viet", "U+AAE0":"Meetei Mayek", "U+AB00":"Ethiopic", "U+AB30":"Latin (52 characters), Greek (1 character), Common (1 character)", "U+AB70":"Cherokee", "U+ABC0":"Meetei Mayek", "U+AC00":"Hangul", "U+D7B0":"Hangul", "U+D800":"none", "U+DB80":"none", "U+DC00":"none", "U+E000":"none", "U+F900":"Han", "U+FB00":"Armenian (5 characters), Hebrew (46 characters), Latin (7 characters)", "U+FB50":"Arabic (609 characters), Common (2 characters)", "U+FE00":"Inherited", "U+FE10":"Common", "U+FE20":"Cyrillic (2 characters), Inherited (14 characters)", "U+FE30":"Common", "U+FE50":"Common", "U+FE70":"Arabic (140 characters), Common (1 character)", "U+FF00":"Hangul (52 characters), Katakana (55 characters), Latin (52 characters), Common (66 characters)", "U+FFF0":"Common", "U+10000":"Linear B", "U+10080":"Linear B", "U+10100":"Common", "U+10140":"Greek", "U+10190":"Greek (1 character), Common (12 characters)", "U+101D0":"Common (45 characters), Inherited (1 character)", "U+10280":"Lycian", "U+102A0":"Carian", "U+102E0":"Common (27 characters), Inherited (1 character)", "U+10300":"Old Italic", "U+10330":"Gothic", "U+10350":"Old Permic", "U+10380":"Ugaritic", "U+103A0":"Old Persian", "U+10400":"Deseret", "U+10450":"Shavian", "U+10480":"Osmanya", "U+104B0":"Osage", "U+10500":"Elbasan", "U+10530":"Caucasian Albanian", "U+10600":"Linear A", "U+10800":"Cypriot", "U+10840":"Imperial Aramaic", "U+10860":"Palmyrene", "U+10880":"Nabataean", "U+108E0":"Hatran", "U+10900":"Phoenician", "U+10920":"Lydian", "U+10980":"Meroitic Hieroglyphs", "U+109A0":"Meroitic Cursive", "U+10A00":"Kharoshthi", "U+10A60":"Old South Arabian", "U+10A80":"Old North Arabian", "U+10AC0":"Manichaean", "U+10B00":"Avestan", "U+10B40":"Inscriptional Parthian", "U+10B60":"Inscriptional Pahlavi", "U+10B80":"Psalter Pahlavi", "U+10C00":"Old Turkic", "U+10C80":"Old Hungarian", "U+10D00":"Hanifi Rohingya", "U+10E60":"Arabic", "U+10F00":"Old Sogdian", "U+10F30":"Sogdian", "U+11000":"Brahmi", "U+11080":"Kaithi", "U+110D0":"Sora Sompeng", "U+11100":"Chakma", "U+11150":"Mahajani", "U+11180":"Sharada", "U+111E0":"Sinhala", "U+11200":"Khojki", "U+11280":"Multani", "U+112B0":"Khudawadi", "U+11300":"Grantha (85 characters), Inherited (1 character)", "U+11400":"Newa", "U+11480":"Tirhuta", "U+11580":"Siddham", "U+11600":"Modi", "U+11660":"Mongolian", "U+11680":"Takri", "U+11700":"Ahom", "U+11800":"Dogra", "U+118A0":"Warang Citi", "U+11A00":"Zanabazar Square", "U+11A50":"Soyombo", "U+11AC0":"Pau Cin Hau", "U+11C00":"Bhaiksuki", "U+11C70":"Marchen", "U+11D00":"Masaram Gondi", "U+11D60":"Gunjala Gondi", "U+11EE0":"Makasar", "U+12000":"Cuneiform", "U+12400":"Cuneiform", "U+12480":"Cuneiform", "U+13000":"Egyptian Hieroglyphs", "U+14400":"Anatolian Hieroglyphs", "U+16800":"Bamum", "U+16A40":"Mro", "U+16AD0":"Bassa Vah", "U+16B00":"Pahawh Hmong", "U+16E40":"Medefaidrin", "U+16F00":"Miao", "U+16FE0":"Nushu (1 character), Tangut (1 character)", "U+17000":"Tangut", "U+18800":"Tangut", "U+1B000":"Hiragana (255 characters), Katakana (1 character)", "U+1B100":"Hiragana", "U+1B170":"Nushu", "U+1BC00":"Duployan", "U+1BCA0":"Common", "U+1D000":"Common", "U+1D100":"Common (209 characters), Inherited (22 characters)", "U+1D200":"Greek", "U+1D2E0":"Common", "U+1D300":"Common", "U+1D360":"Common", "U+1D400":"Common", "U+1D800":"SignWriting", "U+1E000":"Glagolitic", "U+1E800":"Mende Kikakui", "U+1E900":"Adlam", "U+1EC70":"Common", "U+1EE00":"Arabic", "U+1F000":"Common", "U+1F030":"Common", "U+1F0A0":"Common", "U+1F100":"Common", "U+1F200":"Hiragana (1 character), Common (63 characters)", "U+1F300":"Common", "U+1F600":"Common", "U+1F650":"Common", "U+1F680":"Common", "U+1F700":"Common", "U+1F780":"Common", "U+1F800":"Common", "U+1F900":"Common", "U+1FA00":"Common", "U+20000":"Han", "U+2A700":"Han", "U+2B740":"Han", "U+2B820":"Han", "U+2CEB0":"Han", "U+2F800":"Han", "U+E0000":"Common", "U+E0100":"Inherited", "U+F0000":"none", "U+100000":"none"
}

/**
 * for each line
 */
for (var n = 0; n < aLines.length; n++) {
  var
    sLn = aLines[n];

  if ( sLn.indexOf('#EOF')===0) {
    moFs.writeFileSync(sFileOut, sOut+sCout+sOutLast);
    console.log(sFileOut+', chars: '+nChar)
    sCout=''
    nChar = 0
  }

  if (sLn.indexOf('..') === 6 || sLn.indexOf('..') === 7) {
    //found BLOCK

    //1. create Mcs of previous block.
    if ( n !== 0 ) {
      moFs.writeFileSync(sFileOut, sOut+sCout+sOutLast);
      console.log(sFileOut+', chars: '+nChar)
      sCout=''
      nChar = 0
    }

    //sBname= 'Basic-Latin'
    if (sLn.indexOf(' ::@')!==-1){
      sBname= sLn.substring(sLn.indexOf('  ')+2, sLn.indexOf(' ::@'))
    } else {
      sBname= sLn.substring(sLn.indexOf('  ')+2)
    }
    //sN= block.U+0000/decimal/glyph..U+007F/decimal/glyph
    sN= moUtil.fUcdAddGlyph('block.' + sLn.substring(0, sLn.indexOf('  ')))
    //sNS = 'U+0000..U+007F',
    sNS= sLn.substring(0, sLn.indexOf('  '))
    //sNId = 'U0000',
    sNId= 'U' +sLn.substring(2, sLn.indexOf('..'))
    //
    sFileOut= 'filMcs' +sNId +'.last.html'
    //description
    if (sLn.indexOf(' ::@+') !==-1) {
      sBdsn= sLn.substring(sLn.indexOf('::@+  ')+6, sLn.indexOf(' ::@specific'))
    }
    //nBcp
    nBcp1= parseInt(sNS.substring(2, sNS.indexOf('..U')), 16)
    nBcp2= parseInt(sNS.substring(sNS.indexOf('..U')+4), 16)
    sBcp1= sNS.substring(0, sNS.indexOf('..U'))
    sBcp2= sNS.substring(sNS.indexOf('..U')+2)
    //sBchr
    if (sLn.indexOf(' ::@specific * ')!== -1){
      sBchr= sLn.substring(sLn.indexOf(' ::@specific * ')+15)
      sBchr= fCreateSpc(sBchr)
    } else {
      sBchr=''
    }

    sOut =
      '<!DOCTYPE html>\n' +
      '<html>\n' +
      '<head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '  <title>Mcs.' + sN + ' (' + sNS + '.0-1-0.' + moUtil.fDateYMD() + ' draft)</title>\n' +
      '  <meta name="keywords" content="' + sN + ', ' + ', ModelConceptStructured, Mcs, Synagonism">\n' +
      '  <link rel="stylesheet" href="https://synagonism.github.io/hitp/hitp.css">\n' +
      '</head>\n' +
      '\n' +
      '<body>\n' +
      '<header id="idHeader">\n' +
      '  <p></p>\n' +
      '  <h1 id="idHeaderH1">structured-concept:\n' +
      '    <br>' +sN +'\n' +
      '    <br>' +sBname +' (' +sNS + ')\n' +
      '    </h1>\n' +
      '  <p id="idHeadercrd">concept-created: {' + moUtil.fDateYMD() + '}\n' +
      '    <a class="clsHide" href="#idHeadercrd"></a></p>\n' +
      '</header>\n' +
      '\n' +
      '<section id="idDescriptionFT">\n' +
      '  <h1 id="idDescriptionFTH1">description of ' + sNS + '\n' +
      '    <a class="clsHide" href="#idDescriptionFTH1"></a></h1>\n' +
      '  <p id="idDescriptionP1">description::\n' +
      '    <br>· Unicode-block-name= ' +sBname +'\n' +
      '    <br>· range= ' +sN.substring(6) +'\n' +
      '    <br>· <a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcpPlane">plane</a>= ' +moUtil.fUcdFindPlane(sBcp1) +'\n' +
      '    <br>· quantity-of-<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcp">code-points</a>= ' + (nBcp2 - nBcp1 + 1) +'\n' +
      '    <br>· quantity-of-<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idDescriptionFT">chars</a>= ' + oBlockChars[sBcp1] +'\n' +
      '    <br>· <a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdScrpt">script</a>= ' + oBlockScripts[sBcp1] +'\n'
    if (sBdsn) {
      sOut = sOut +'    <br>· ' +sBdsn +'\n'
    }
    sOut = sOut +
      '    <br>[https://en.wikipedia.org/wiki/Unicode_character_property#Block]' +'\n' +
      '    <br>[ftp://www.unicode.org/Public/UCD/latest/ucd/]' +'\n' +
      '    <a class="clsHide" href="#idDescriptionP1"></a></p>\n' +
      '  <p id="idName">name::\n' +
      '    <br>* cpt.filMcs' + sNId + '.last.html,\n' +
      '    <br>* cpt.' + sDir +'/filMcs' + sNId + '.last.html,\n' +
      '    <br>* cpt.' + sN + '-' + sBname + ',\n' +
      '    <br>* cpt.' + sN.substring(6) + '-' + sBname + ',\n' +
      '    <br>* cpt.' + sBname + '--Unicode-block,\n' +
      '    <br>* cpt.Unicode\'block.' + sBname +'-' +sN.substring(6) + ',\n' +
      '    <a class="clsHide" href="#idName"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="id' + sNId + 'chr">\n' +
      '  <h1 id="id' + sNId + 'chrH1">char of ' + sNS + '\n' +
      '    <a class="clsHide" href="#id' + sNId + 'chrH1"></a></h1>\n' +
      '  <p id="id' + sNId + 'chrdsn">description::\n' +
      '    <br>· all or some <a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcp">code-points</a> of a-block are-assigned to chars.\n' +
      '    <a class="clsHide" href="#id' + sNId + 'chrdsn"></a></p>\n' +
      '  <p id="id' + sNId + 'chrnam">name::\n' +
      '    <br>* cpt.' + sN + '\'char,\n' +
      '    <br>* cpt.' + sNS + 'ApChar,\n' +
      '    <a class="clsHide" href="#id' + sNId + 'chrnam"></a></p>\n';
    if (sBchr){
      sOut = sOut + sBchr
    }
    sOut = sOut +
      '</section>\n';

    sOutLast=
      '\n' +
      '<section id="id' + sNId + 'rscFT">\n' +
      '  <h1 id="id' + sNId + 'rscFTH1">resource of ' + sNS + '\n' +
      '    <a class="clsHide" href="#id' + sNId + 'rscFTH1"></a></h1>\n' +
      '  <p id="id' + sNId + 'rscnam">Name::\n' +
      '    <br>* cpt.' + sNS + '\'resource,\n' +
      '    <br>* cpt.' + sNS + 'AeResource,\n' +
      '    <a class="clsHide" href="#id' + sNId + 'rscnam"></a></p>\n' +
      '  <p id="id' + sNId + 'rscwpa">addressWpg::\n' +
      '    <br>* ftp://www.unicode.org/Public/UCD/latest/ucd/,\n' +
      '    <br>* http://www.unicode.org/versions/latest/,\n' +
      '    <a class="clsHide" href="#id' + sNId + 'rscwpa"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="id' + sNId + 'gncFT">\n' +
      '  <h1 id="id' + sNId + 'gncFTH1">GENERIC of ' + sNS + '\n' +
      '    <a class="clsHide" href="#id' + sNId + 'gncFTH1"></a></h1>\n' +
      '  <p id="id' + sNId + 'gncchn">Generic-chain::\n' +
      '    <br>* <a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcpBlock">Unicode-block</a>,\n' +
      '    <br>...\n' +
      '    <br>* entity,\n' +
      '    <a class="clsHide" href="#id' + sNId + 'gncchn"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="id' + sNId + 'EvgFT">\n' +
      '  <h1 id="id' + sNId + 'EvgFTH1">' + sNS + '\.EVOLUTING\n' +
      '    <a class="clsHide" href="#id' + sNId + 'EvgFTH1"></a></h1>\n' +
      '  <p id="id' + sNId + 'Evgnam">name::\n' +
      '    <br>* cpt.' + sNS + '.evoluting,\n' +
      '    <a class="clsHide" href="#id' + sNId + 'Evgnam"></a></p>\n' +
      '  <p id="id' + sNId + 'Evg">{time.' + moUtil.fDateYMD() + '}::\n' +
      '    <br>=== webpage creation:\n' +
      '    <a class="clsHide" href="#id' + sNId + 'Evg"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="idMeta">\n' +
      '  <h1 id="idMetaH1">meta-info\n' +
      '    <a class="clsHide" href="#idMetaH1"></a></h1>\n' +
      '  <p id="idMetaCounter" class="clsCenter">dirUcd was-visited\n' +
      '    <span class="clsColorRed">\n' +
      '    <script src="../../../dirPgm/dirCntr/counter.php?page=Mws-dirTchInfDirUcd"></script>\n' +
      '    </span>\n' +
      '    times since {2018-06-23}</p>\n' +
      '  <!-- the content of page-path paragraph is displayed as it is on top of toc -->\n' +
      '  <p id="idMetaWebpage_path"><span class="clsB clsColorGreen">page-path</span>:\n' +
      '    <a class="clsPreview" href="../../../#idDescription">synagonism.net</a> /\n' +
      '    <a class="clsPreview" href="../../FilMcsw.Last.html#idDescription">Mcs-worldview</a> /\n' +
      '    <a class="clsPreview" href="../filMcsDirTchInf.last.html#idDescription">dirTchInf</a> /\n' +
      '    <a class="clsPreview" href="filMcsDirUcd.last.html#idDescription">dirUcd</a> /\n' +
      '    ' + sN + '\n' +
      '    </p>\n' +
      '  <p id="idMetaP1">SEARCH::\n' +
      '    <br>· this page uses \'<span class="clsColorRed">locator-names</span>\', names that when you find them, you find the-LOCATION of the-concept they denote.\n' +
      '    <br>• <strong>LOCAL-SEARCH</strong>:\n' +
      '    <br>· TYPE <span class="clsColorRed">CTRL+F "cpt.words-of-concept\'s-name"</span>, to go to the-LOCATION of the-concept.\n' +
      '    <br>• <strong>GLOBAL-SEARCH</strong>:\n' +
      '    <br>· clicking on the-green-TITLE of a-page you have access to the-global--locator-names of my-site.\n' +
      '    <br>· a-preview of the-description of a-global-name makes reading fast.\n' +
      '    <a class="clsHide" href="#idMetaP1"></a></p>\n' +
      '  <p id="idFooterP1">footer::\n' +
      '    <br>• author: <a class="clsPreview" href="../../../#idAboutme">Kaseluris.Nikos.1959</a>\n' +
      '    <br>• email:\n' +
      '    <br> &nbsp;<img src="../../../dirRsc/dirImg/mail.png" alt="imgMail">\n' +
      '    <br>• twitter: <a href="https://twitter.com/synagonism">@synagonism</a>\n' +
      '    <br>• steemit: <a href="https://steemit.com/synagonism">https://steemit.com/@synagonism</a>\n' +
      '    <a class="clsHide" href="#idFooterP1"></a></p>\n' +
      '  <!--                              -->\n' +
      '  <p id="idMetaVersion">webpage-versions::\n' +
      '    <br>• version.last.dynamic: <a href="filMcs' + sNId + '.last.html">filMcs' + sNId + '.last.html</a>,\n' +
      '    <br>• version.0-1-0.' + moUtil.fDateYMD() + '.created: filMcs' + sNId + '.0-1-0.' + moUtil.fDateYMD() + '.html,\n' +
      '    <a class="clsHide" href="#idMetaVersion"></a></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="idSupport">\n' +
      '  <h1 id="idSupportH1">support (<a class="clsPreview" href="../../#idSupport">link</a>)</h1>\n' +
      '  <p></p>\n' +
      '</section>\n' +
      '\n' +
      '<section id="idComment">\n' +
      '  <h1 id="idCommentH1">comments</h1>\n' +
      '  <p>on <a class="clsPreview" href="Disqus-dirUcd.html#idDescription">Disqus</p>\n' +
      '</section>\n' +
      '\n' +
      '<script>\n' +
      '  (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n' +
      '  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
      '  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
      '  })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n' +
      '  ga(\'create\', \'UA-19285371-5\', \'synagonism.net\');\n' +
      '  ga(\'send\', \'pageview\');\n' +
      '</script>\n' +
      '\n' +
      '<script src="https://synagonism.github.io/hitp/hitp.js"></script>\n' +
      '</body>\n' +
      '</html>';
  } else if (sLn.indexOf('.;') === 6 || sLn.indexOf('.;') === 7) {
    //found CHAR
    nChar = nChar + 1
    sCcp= sLn.substring(0, sLn.indexOf('.;'))
    sCId= sNId +'U' + sCcp.substring(2)
    sCcp2= moUtil.fUcdAddGlyph(sCcp)
    sCcp3 = sCcp2.replace(/(U\+[^|]+)\|([0-9]+)(.*)/, '$2|$1$3')
    sCname= sLn.substring(sLn.indexOf('.;')+2, sLn.indexOf(' ·'))
    sCdsn= sLn.substring(sLn.indexOf(' ·')+2)
    sCdsn= sCdsn.replace(/·/g, '\n    <br>·')
    sCdsn= moUtil.fUcdAddLink(sCdsn, 'ds')
    //links for properties
    if (sCdsn.indexOf('Age=') !==-1) {
      sCdsn= sCdsn.replace('Age=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdage">Age=</a>')
    }
    if (sCdsn.indexOf('Alphabetic=') !==-1) {
      sCdsn= sCdsn.replace('Alphabetic=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdalfc">Alphabetic=</a>')
    }
    if (sCdsn.indexOf('Bidi_Class=') !==-1) {
      sCdsn= sCdsn.replace('Bidi_Class=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdbdcls">Bidi_Class=</a>')
    }
    if (sCdsn.indexOf('Bidi_Mirrored=') !==-1) {
      sCdsn= sCdsn.replace('Bidi_Mirrored=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdbdmr">Bidi_Mirrored=</a>')
    }
    if (sCdsn.indexOf('Bidi_Mirroring=') !==-1) {
      sCdsn= sCdsn.replace('Bidi_Mirroring=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdbmg">Bidi_Mirroring=</a>')
    }
    if (sCdsn.indexOf('Bidi_Paired_Bracket=') !==-1) {
      sCdsn= sCdsn.replace('Bidi_Paired_Bracket=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdbpbp">Bidi_Paired_Bracket=</a>')
    }
    if (sCdsn.indexOf('Bidi_Paired_Bracket_Type=') !==-1) {
      sCdsn= sCdsn.replace('Bidi_Paired_Bracket_Type=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdbpbtp">Bidi_Paired_Bracket_Type=</a>')
    }
    if (sCdsn.indexOf('Case_Folding=') !==-1) {
      sCdsn= sCdsn.replace('Case_Folding=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcsfg">Case_Folding=</a>')
    }
    if (sCdsn.indexOf('Cased=') !==-1) {
      sCdsn= sCdsn.replace('Cased=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcaseCsd">Cased=</a>')
    }
    if (sCdsn.indexOf('Decomposition_Mapping=') !==-1) {
      sCdsn= sCdsn.replace('Decomposition_Mapping=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcddnmg">Decomposition_Mapping=</a>')
    }
    if (sCdsn.indexOf('East_Asian_Width=') !==-1) {
      sCdsn= sCdsn.replace('East_Asian_Width=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdeaw">East_Asian_Width=</a>')
    }
    if (sCdsn.indexOf('General_Category=') !==-1) {
      sCdsn= sCdsn.replace('General_Category=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdglcr">General_Category=</a>')
    }
    if (sCdsn.indexOf('Joining_Group=') !==-1) {
      sCdsn= sCdsn.replace('Joining_Group=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdjggp">Joining_Group=</a>')
    }
    if (sCdsn.indexOf('Joining_Type=') !==-1) {
      sCdsn= sCdsn.replace('Joining_Type=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdjgtp">Joining_Type=</a>')
    }
    if (sCdsn.indexOf('Line_Break=') !==-1) {
      sCdsn= sCdsn.replace('Line_Break=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdlnbk">Line_Break=</a>')
    }
    if (sCdsn.indexOf('Lowercase=') !==-1) {
      sCdsn= sCdsn.replace('Lowercase=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcaseLwr">Lowercase=</a>')
    }
    if (sCdsn.indexOf('Math=') !==-1) {
      sCdsn= sCdsn.replace('Math=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdmth">Math=</a>')
    }
    if (sCdsn.indexOf('Numeric_Type=') !==-1) {
      sCdsn= sCdsn.replace('Numeric_Type=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdnctp">Numeric_Type=</a>')
    }
    if (sCdsn.indexOf('Numeric_Value=') !==-1) {
      sCdsn= sCdsn.replace('Numeric_Value=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdncvl">Numeric_Value=</a>')
    }
    if (sCdsn.indexOf('Titlecase=') !==-1) {
      sCdsn= sCdsn.replace('Titlecase=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcaseTtl">Titlecase=</a>')
    }
    if (sCdsn.indexOf('Uppercase=') !==-1) {
      sCdsn= sCdsn.replace('Uppercase=', '<a class="clsPreview" href="../../dirLag/filMcsChar.last.html#idCharUcdcaseUpr">Uppercase=</a>')
    }
    sCdsn=
      '    <br>·' +sCdsn +'\n    <br>[ftp://www.unicode.org/Public/UCD/latest/ucd/]\n'
    sCnam=
      '  <p id="id' + sCId + 'nam">name::\n' +
      '    <br>* cpt.char.' +sCcp2 +'-' +sCname +',\n' +
      '    <br>* cpt.char.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.' +sCname +'-' +sCcp2 +',\n'
    if (sCdsn.indexOf('Math=</a>') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.math.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.math.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> Sc-C') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.currency.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.currency.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> S') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.symbol.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.symbol.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> L') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.letter.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.letter.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> N') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.number.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.number.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> Z') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.separator.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.separator.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> P') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.punctuation.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.punctuation.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> M') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.mark.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.mark.' +sCname +'-' +sCcp3 +',\n'
    } else if (sCdsn.indexOf('General_Category=</a> Cf') !==-1) {
      sCnam= sCnam +
      '    <br>* cpt.char.format.' +sCcp3 +'-' +sCname +',\n' +
      '    <br>* cpt.char.format.' +sCname +'-' +sCcp3 +',\n'
    } else {
      sCnam= sCnam +
      '    <a class="clsHide" href="#id' + sCId + 'nam"></a></p>\n'
    }

    sCout= sCout +
      '\n' +
      '<section id="id' + sCId + '">\n' +
      '  <h1 id="id' + sCId + 'H1">char.' +sCcp2 +'-' +sCname +',\n' +
      '    <a class="clsHide" href="#id' +sCId +'H1"></a></h2>\n' +
      '  <p id="id' + sCId + 'dsn">description::\n' +
      sCdsn +
      '    <a class="clsHide" href="#id' + sCId + 'dsn"></a></p>\n' +
      sCnam +
      '</section>\n'
  }
}

/*
 * creates the specifics of a block's char
 * <p>specific::
 * <h2>categories
 */
function fCreateSpc(sIn) {
  var
    sO='',
    sO1='', //<p> specific
    sO2='', //<h2> categories
    a = sIn.split(' * ');

  sO1=
    '  <p id="id' + sNId + 'chrSpc">specific::\n';

  //categories
  for (var n = 0; n < a.length; n++) {
    var a2 = a[n].split(' ** '),
      sCg1, sCg2;
    if (a2[0].indexOf(':') !== -1) {
      sCg1= a2[0].substring(0, a2[0].indexOf(':'))
      sCg2= a2[0].substring(a2[0].indexOf(':')+2)
    } else {
      sCg1= a2[0]
    }
    sCg1= sCg1.replace(' ', '-')

    //add categories on <p>
    sO1= sO1 +
      '    <br>* ' +sCg1 +',\n';

    sO= sO +
      '\n' +
      '  <section id="id' + sNId + 'chr' +n +'">\n' +
      '  <h2 id="id' + sNId + 'chr' +n +'H2">char.' +sCg1 +'\n' +
      '    <a class="clsHide" href="#id' + sNId + 'chr' +n +'H2"></a></h2>\n'
    if (sCg2) {
      sO= sO +
      '  <p id="id' + sNId + 'chr' +n +'dsn">description::\n' +
      '    <br>' + sCg2 +'\n' +
      '    <br>[ftp://www.unicode.org/Public/UCD/latest/ucd/]\n' +
      '    <a class="clsHide" href="#id' + sNId + 'chr' +n +'dsn"></a></p>\n'
    }
    sO= sO +
      '  <p id="id' + sNId + 'chr' +n +'Spc">specific::\n'
    //chars
    sO2= ''
    sCg2= ''
    for (var n2 = 1; n2 < a2.length; n2++) {
      sO2= sO2 +
        '    <br>* <a class="clsPreview" href="#id' +sNId +'U' +a2[n2].substring(2) +
        '">' +moUtil.fUcdAddGlyph(a2[n2]) +'</a>,\n'
    }
    sO= sO +sO2 +
      '    <a class="clsHide" href="#id' + sNId + 'chr' +n +'Spc"></a></p>\n' +
      '  </section>\n'
  }
  return sO1 +
    '    <a class="clsHide" href="#id' + sNId + 'chrSpc"></a></p>\n' +
    sO;
}
/*
 * output treeUl
 */
function fCreateTree(sIn) {
  var
    sO,
    a = sIn.split(' * ');
  sO= '    <ul class="clsTreeUl">\n' +
    '      <li>block-chars:\n' +
    '        <ul>'//8
  for (var n = 0; n < a.length; n++) {
    var a2 = a[n].split(' ** ');
    sO= sO +'          <li>' +a2[0] +'\n' +
      '            <ul>\n' //12
    for (var n2 = 1; n2 < a2.length; n2++) {
      sO= sO +
        '              <li>' +moUtil.fUcdAddGlyph(a2[n2]) +'\n' //14
    }
    sO= sO +'            </ul>\n' //12
  }
  return sO= sO + '        </ul>\n' +
    '      </li>' +
    '    </ul>'
}


//console.log(moUtil.fUcdFindBlock('U+1053f'))