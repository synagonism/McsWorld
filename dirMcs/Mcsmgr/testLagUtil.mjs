import * as omLagUtil from './mLagUtil.js'

let
  a = [["a","b"],["c","d"]]


//console.log(omLagUtil.fGreektonosIncrease('εύελπις'))
//console.log(omLagUtil.fGreekwordHasSyllableOne('θεια-η/thhho-i/'))
console.log('θεια = ' + omLagUtil.fGreektonosFindSyllable('θα',true))
console.log('νους = ' + omLagUtil.fGreektonosFindSyllable('νους'))
