(module
  (type (;0;) (func (param i32)))
  (func (;0;) (type 0) (param i32)
    (local i32 i32)
    block  ;; label = @1
      loop  ;; label = @2
        get_local 1
        get_local 0
        i32.ge_u
        br_if 1 (;@1;)
        get_local 1
        i32.load8_u
        set_local 2
        get_local 2
        i32.const 97
        i32.ge_u
        if  ;; label = @3
          get_local 2
          i32.const 122
          i32.le_u
          if  ;; label = @4
            get_local 1
            get_local 2
            i32.const 32
            i32.sub
            i32.store8
          end
        end
        get_local 1
        i32.const 1
        i32.add
        set_local 1
        br 0 (;@2;)
      end
    end)
  (memory (;0;) 1)
  (export "wmem" (memory 0))
  (export "fWupper" (func 0)))
