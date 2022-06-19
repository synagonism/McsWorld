/**
 * {2017-06-23}
 * Reads the-namidx.X.json files into oMws.aengX
 */
oMws = {
  //array to hold the-names of arrays of namidx.engfiles
  oIdxNam: {
    engA:'A', engB:'B', engC:'C', engD:'D', engE:'E', engF:'F',
    engG:'G', engH:'H', engI:'I', engJ:'J', engK:'K', engL:'L',
    engM:'M', engN:'N', engO:'O', engP:'P', engQ:'Q', engR:'R',
    engS:'S', engT:'T', engU:'U', engV:'V', engW:'W', engX:'X',
    engY:'Y', engZ:'Z',

    ellAl:'Α', ellBe:'Β', ellGa:'Γ', ellDe:'Δ', ellEp:'Ε', ellZe:'Ζ',
    ellEt:'Η', ellTh:'Θ', ellIo:'Ι', ellKa:'Κ', ellLa:'Λ', ellMu:'Μ',
    ellNu:'Ν', ellXi:'Ξ', ellOn:'Ο', ellPi:'Π', ellRh:'Ρ', ellSi:'Σ',
    ellTa:'Τ', ellUp:'Υ', ellPh:'Φ', ellCh:'Χ', ellPs:'Ψ', ellOm:'Ω',
    ZZZ:'ZZZ'
  },
  sDir: location.origin + location.pathname.substr(0,location.pathname.indexOf('dirMiwMcs/')+10)
}


for (var sK in oMws.oIdxNam) {
  (function(sK) {
    oMws['oXHR' + sK] = new XMLHttpRequest();
    oMws['oXHR' + sK].open('GET', oMws.sDir+'namidx.' + sK + '.json', true);
    oMws['oXHR' + sK].onreadystatechange = function () {
      if (oMws['oXHR' + sK].readyState === 4 && oMws['oXHR' + sK].status === 200) {
        oMws['a' + sK] = JSON.parse(oMws['oXHR' + sK].responseText);
      }
    }
    oMws['oXHR' + sK].send(null);
  })(sK)
}
