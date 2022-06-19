(module
  (func $f13 (result i32) (i32.const 13))
  (func $f42 (result i32) (i32.const 42))
  (table (export "tbl") anyfunc (elem $f13 $f42))
)