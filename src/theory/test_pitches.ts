// Helpers for writing pitches in tests.

import {Pitch} from "./notation"

// p reads a pitch from how it is written, e.g. "C4", "F#5", "Bb3", "Ebb2"
export function p(name: string): Pitch {
  const m = /^([A-G])(#{1,2}|b{1,2})?(-?\d)$/.exec(name)
  if (m == null) {
    throw Error("cannot read the pitch " + name)
  }
  const acc = m[2] == undefined ? 0 : (m[2][0] == "#" ? 1 : -1) * m[2].length
  return {letter: "CDEFGAB".indexOf(m[1]), accidental: acc, octave: Number(m[3])}
}
