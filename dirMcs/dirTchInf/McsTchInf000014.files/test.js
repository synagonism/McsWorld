const { readFileSync } = require("fs");

const fRun = async () => {
  const oModule = await WebAssembly.compile(readFileSync("test.wasm"));
  const oModuleInst = await WebAssembly.instantiate(oModule);
  console.log(oModuleInst.exports.f());
  console.log(oModuleInst.exports.f1());
  //console.log(Object.getOwnPropertyNames(Symbol).sort())
};

fRun();