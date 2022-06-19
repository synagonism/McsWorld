const { readFileSync } = require("fs");

const fRun = async () => {
  const oModule = await WebAssembly.compile(readFileSync("loop.wasm"));
  const oModuleInst = await WebAssembly.instantiate(oModule);

  console.log(oModuleInst.exports.f(5));
  
};

fRun();