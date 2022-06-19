(module
  (import "oJs" "fImport1" (func $fImp1))
  (import "oJs" "fImport2" (func $fImp2))
  (func $fStart (call $fImp1))
  (start $fStart)
  (func (export "f") (call $fImp2))
)