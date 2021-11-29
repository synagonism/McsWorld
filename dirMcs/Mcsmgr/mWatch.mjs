/**
 * DOING: watch changes on files ending .last.html
 * INPUT:
 * OUTPUT:
 * RUN: node Mcsmgr/mWatch.mjs pwd
 *
 * modified: 
 * created: {2021-11-28}
 *
 * TODO:
 * 1) store hash of Mcs, so when we read the-file do nothing.
 */

import moFs from 'fs'
import moCrypto from 'crypto'
import moPath from 'path'
import mfReadlines from 'n-readlines' // npm install n-readlines
import {fNamidx} from './mNamidx.mjs'
import mfClient from 'ssh2-sftp-client'
import mfEs6_promise_pool from 'es6-promise-pool'
import {oSftp, fSftp} from './mSftp.mjs'
import {fWriteJsonArray} from './mUtil.mjs'

let
  oMcs_Hash = {},
  aFileMcsIn = [],
  sCwd = process.cwd() + moPath.sep

sCwd = sCwd.replace(/\\/g, '/')
if (process.argv[2]) {
  oSftp.password = process.argv[2]
} else {
  console.log('type password after mWatch.mjs')
  process.exit()
}

moFs.watch(sCwd, {recursive: true}, (eventType, sFilename) => {
  if (sFilename && eventType === 'change' && sFilename.endsWith('.last.html')) {
    sFilename = sFilename.replace(/\\/g, '/')
    let sFileResolved = moPath.resolve(sCwd+sFilename)
    console.log(sFilename)
    console.log('>>>RESOLVED: '+sFileResolved)
    const fileBuffer = moFs.readFileSync(sFileResolved)
    const hashSum = moCrypto.createHash('sha256')
    hashSum.update(fileBuffer);
    const sHashCurrent = hashSum.digest('hex');

    if (oMcs_Hash[sFilename]) {
      if (sHashCurrent === oMcs_Hash[sFilename]) {
        return
      }
    }
    oMcs_Hash[sFilename] = sHashCurrent;

    //aFileMcsIn.push(sFilename)
    //setTimeout(() => console.log(aFileMcsIn), 1000)

    fNamidx(sFilename, fSftp)
  } 
})
