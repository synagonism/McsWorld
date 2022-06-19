(func $isPrime (export "f") (param $p0 i32) (result i32)
  (local $l0 i32) (local $l1 i32)
  ;; set l0 = 1
  (set_local $l0 (i32.const 1))
  block $B0
    block $B1
      ;; if p < 3, go B1
      (br_if $B1 (i32.lt_u (get_local $p0)(i32.const 3)))
      ;; set l1 = 2
      (set_local $l1 (i32.const 2))
      loop $L2
        ;; if p:2 rem 0, go B0
        (br_if $B0 (i32.eqz (i32.rem_u (get_local $p0)(get_local $l1))))
        (i32.add (get_local $l1)(i32.const 1))
        ;; if l1 < p go L2
        (br_if $L2 (i32.lt_u (tee_local $l1)(get_local $p0)))
      end
    end
    get_local $l0
    return
  end
  get_local $l1
)