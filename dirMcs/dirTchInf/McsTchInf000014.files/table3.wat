(module
  (type (;0;) (func (result i32)))
  (func (;0;) (type 0) (result i32)
    i32.const 42)
  (table (;0;) 1 anyfunc)
  (export "tbl" (table 0))
  (elem (i32.const 0) 0)
)