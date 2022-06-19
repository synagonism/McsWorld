const { readFileSync } = require("fs");

const fRun = async () => {
    const oModule = await WebAssembly.compile(readFileSync("test.wasm"));
    const oModuleInst = await WebAssembly.instantiate(oModule);
    console.log(oModuleInst.exports.f(4)); //24
};

fRun();