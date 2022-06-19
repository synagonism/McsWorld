const { readFileSync } = require("fs");

const fRun = async () => {
  const oModule = await WebAssembly.compile(readFileSync("test-r.wasm"));
  const oModuleInst = await WebAssembly.instantiate(oModule);
  console.log(oModuleInst.exports.f(6,5));
};

fRun();