var oImport = {
  oJs: {fImported: arg => console.log(arg)}
};

onmessage = function(e) {
  console.log('module received from main thread');
  var mod = e.data;

  WebAssembly.instantiate(mod, oImport).then(function(instance) {
    instance.exports.fExported();
  });

  var exports = WebAssembly.Module.exports(mod);
  console.log(exports[0]);
};