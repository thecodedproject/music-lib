"use strict";
// Small replacements for the lodash helpers the theory code once used, so the library
// has no runtime dependencies.
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = cloneDeep;
exports.isEqual = isEqual;
// cloneDeep copies plain data - objects, arrays and primitives - all the way down
function cloneDeep(value) {
    if (Array.isArray(value)) {
        return value.map(cloneDeep);
    }
    if (value !== null && typeof value == "object") {
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            out[k] = cloneDeep(v);
        }
        return out;
    }
    return value;
}
// isEqual compares plain data - objects, arrays and primitives - by value
function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length != b.length) {
            return false;
        }
        return a.every((v, i) => isEqual(v, b[i]));
    }
    if (a === null || b === null || typeof a != "object" || typeof b != "object") {
        return false;
    }
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    if (ak.length != bk.length) {
        return false;
    }
    return ak.every(k => Object.prototype.hasOwnProperty.call(b, k) &&
        isEqual(a[k], b[k]));
}
