(func (export "f") (param $a i32) (param $b i32) (result i32)
  ;; return a > b ? a : b
  get_local 0
  get_local 1
  get_local 0
  get_local 1
  i32.gt_s
  select
)