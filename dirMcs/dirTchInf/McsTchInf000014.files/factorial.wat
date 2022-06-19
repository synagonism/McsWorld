(module
  (func $factorial (export "f") (param i32) (result i32)
    (if (result i32) (i32.lt_s (get_local 0) (i32.const 1))
      ;; if input < 1, then output 1
      (then (i32.const 1))
      ;; else input * factorial(input-1)
      (else (i32.mul (get_local 0) (call $factorial (i32.sub (get_local 0) (i32.const 1)))))
    )
  )
)