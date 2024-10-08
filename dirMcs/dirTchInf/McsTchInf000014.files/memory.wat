(module
  (memory (import "oJs" "oMem") 1)
  (func (export "fAccumulate") (param $ptr i32) (param $ven i32) (result i32)
    (local $end i32)
    (local $sum i32)
    (set_local $end (i32.add (get_local $ptr) (i32.mul (get_local $ven) (i32.const 4))))
    (block $break (loop $top
      (br_if $break (i32.eq (get_local $ptr) (get_local $end)))
      (set_local $sum (i32.add (get_local $sum) (i32.load (get_local $ptr))))
      (set_local $ptr (i32.add (get_local $ptr) (i32.const 4)))
      (br $top)
    ))
    (get_local $sum)
  )
)