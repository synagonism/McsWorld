(module
  (memory (export "wmem") 1)

  (func (export "fWupper") (param $length i32)
    ;; var i = 0
    (local $i i32)    ;; store loop index
    (local $sbl i32)  ;; store char code

    (block $Lbreak
      ;; while(true)
      (loop $Lloop
        ;; if (i >= length) break
        (br_if $Lbreak (i32.ge_u (get_local $i) (get_local $length)))
        ;; sbl = $memory[i]
        (set_local $sbl (i32.load8_u (get_local $i)))
        
        ;; if (sbl >= 97 && sbl <= 122)
        (if (i32.ge_u (get_local $sbl) (i32.const 97))
          (if (i32.le_u (get_local $sbl) (i32.const 122))
            ;; $memory[i] = sbl - 32, upper-case
            (i32.store8 (get_local $i) (i32.sub (get_local $sbl) (i32.const 32)))
          )
        )

        ;; ++i
        (set_local $i (i32.add (get_local $i) (i32.const 1)))
        ;; continue
        (br $Lloop)
      )
    )
  )
)