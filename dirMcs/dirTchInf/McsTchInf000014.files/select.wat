(func (export "f") (param $a i32) (param $b i32) (result i32)
  ;; return a > b ? a : b
  (select
    (get_local $a)
    (get_local $b)
    (i32.gt_s (get_local $a) (get_local $b))
  )
)