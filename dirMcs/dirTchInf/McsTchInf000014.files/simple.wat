(module
  (func $fImp (import "oJs" "fImported") (param i32))
  (func (export "fExported")
    i32.const 42
    call $fImp
  )
)