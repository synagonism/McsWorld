/**
 * DOING: watch changes on files ending .last.html
 * INPUT:
 * OUTPUT:
 * RUN: node Mcsmgr/watch.mjs
 *
 * modified: 
 * created: {}
 */


import moFs from 'fs'
import moCrypto from 'crypto'

let 
  bFsWait = false,
  oHash = {},
  aFileMcsIn = []

moFs.watch('./', {recursive: true}, (eventType, filename) => {
  
  if (eventType === 'change' && filename.endsWith('.last.html')) {
    /*
    if (bFsWait) return
    bFsWait = setTimeout(() => {
      bFsWait = false
    }, 9)
    */
    const fileBuffer = moFs.readFileSync(filename)
    const hashSum = moCrypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const sHashCurrent = hashSum.digest('hex');

    if (oHash[filename]) {
      if (sHashCurrent === oHash[filename]) {
        return
      }
    }
    oHash[filename] = sHashCurrent;

    aFileMcsIn.push(filename)
    console.log(filename)

    setTimeout(() => console.log(aFileMcsIn), 1000)
  } 
});