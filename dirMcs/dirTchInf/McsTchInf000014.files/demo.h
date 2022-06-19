#ifndef DEMO_H_GENERATED_
#define DEMO_H_GENERATED_
#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>

#include "wasm-rt.h"

#ifndef WASM_RT_MODULE_PREFIX
#define WASM_RT_MODULE_PREFIX
#endif

#define WASM_RT_PASTE_(x, y) x ## y
#define WASM_RT_PASTE(x, y) WASM_RT_PASTE_(x, y)
#define WASM_RT_ADD_PREFIX(x) WASM_RT_PASTE(WASM_RT_MODULE_PREFIX, x)

#define WASM_RT_DEFINE_EXTERNAL(decl, target) decl = &target;

/* TODO(binji): only use stdint.h types in header */
typedef uint8_t u8;
typedef int8_t s8;
typedef uint16_t u16;
typedef int16_t s16;
typedef uint32_t u32;
typedef int32_t s32;
typedef uint64_t u64;
typedef int64_t s64;
typedef float f32;
typedef double f64;

extern void WASM_RT_ADD_PREFIX(init)(void);

/* import: 'oJs' 'fImport1' */
extern void (*Z_oJsZ_fImport1Z_vv)(void);
/* import: 'oJs' 'fImport2' */
extern void (*Z_oJsZ_fImport2Z_vv)(void);

/* export: 'f' */
extern void (*WASM_RT_ADD_PREFIX(Z_fZ_vv))(void);
#ifdef __cplusplus
}
#endif

#endif  /* DEMO_H_GENERATED_ */
