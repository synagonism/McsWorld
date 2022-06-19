const { readFileSync } = require("fs");

const fRun = async () => {
  const oModule = await WebAssembly.compile(readFileSync("loop.wasm"));
  const oModuleInst = await WebAssembly.instantiate(oModule);
  // We create a wrapper function for
  // read / write wasm memory.
  function fUpper(s) {
    const buf = Buffer.from(s)
    const nL = buf.length
    const aMem = new Uint8Array(oModuleInst.exports.wmem.buffer)

    aMem.set(buf)
    oModuleInst.exports.fWupper(nL)

    return Buffer.from(aMem).slice(0, nL)
  }

  const sTest = 'hApPy BiRtHdAy!'
  console.log('upper "%s" -> "%s"', sTest, fUpper(sTest))
  
  //console.log(Object.getOwnPropertyNames(WebAssembly.Memory.prototype).sort())
};

fRun();