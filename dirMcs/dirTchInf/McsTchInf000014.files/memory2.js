const { readFileSync } = require("fs");

const fRun = async () => {
  const oModule = await WebAssembly.compile(readFileSync("memory2.wasm"));
  const oModuleInst = await WebAssembly.instantiate(oModule);
  function fUint8_to_string(aIn) {
    let s = "";
    for (let i = 0; i < 11; i++) {
      s += String.fromCharCode(aIn[i]);
    }
    return s;
  }
  let a = new Uint8Array(oModuleInst.exports.mem.buffer);
  console.log(fUint8_to_string(a)); //Hello World
  //console.log(Object.getOwnPropertyNames(Symbol).sort())
};

fRun();