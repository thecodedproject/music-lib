// Small replacements for the lodash helpers the theory code once used, so the library
// has no runtime dependencies.

// cloneDeep copies plain data - objects, arrays and primitives - all the way down
export function cloneDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(cloneDeep) as unknown as T
  }
  if (value !== null && typeof value == "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = cloneDeep(v)
    }
    return out as T
  }
  return value
}

// isEqual compares plain data - objects, arrays and primitives - by value
export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length != b.length) {
      return false
    }
    return a.every((v, i) => isEqual(v, b[i]))
  }
  if (a === null || b === null || typeof a != "object" || typeof b != "object") {
    return false
  }
  const ak = Object.keys(a as object)
  const bk = Object.keys(b as object)
  if (ak.length != bk.length) {
    return false
  }
  return ak.every(k =>
    Object.prototype.hasOwnProperty.call(b, k) &&
    isEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]))
}
