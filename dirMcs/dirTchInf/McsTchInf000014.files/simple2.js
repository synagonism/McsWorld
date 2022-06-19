const { readFileSync } = require("fs");

const fRun = async () => {
  const oModule = await WebAssembly.compile(readFileSync("simple2.wasm"));
  const oModuleInst = await WebAssembly.instantiate(oModule);
  console.log(oModuleInst.exports.f59());
};

fRun();