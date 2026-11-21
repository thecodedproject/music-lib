import {
  SpelledInterval,
  intervalBetween,
  intervalName,
  intervalShortName,
  semiTonesInSpelledInterval,
  transpose,
} from "./interval"
import {p} from "./test_pitches"

const iv = (s: string): SpelledInterval => ({quality: s[0] as SpelledInterval["quality"], number: Number(s.slice(1))})

describe("intervalBetween", () => {
  it.each([
    ["C4", "C4", "P1"], ["C4", "D4", "M2"], ["E4", "F4", "m2"], ["C4", "E4", "M3"],
    ["E4", "G#4", "M3"], ["D4", "F4", "m3"], ["C4", "F4", "P4"], ["F4", "B4", "A4"],
    ["B4", "F5", "d5"], ["C4", "G4", "P5"], ["C4", "A4", "M6"], ["E4", "C5", "m6"],
    ["C4", "B4", "M7"], ["C#4", "Bb4", "d7"], ["C4", "C5", "P8"], ["C4", "E5", "M10"],
    ["C4", "E#4", "A3"], ["Cb4", "C4", "A1"],
  ])("%s to %s is %s", (a, b, want) => {
    expect(intervalShortName(intervalBetween(p(a), p(b)))).toBe(want)
  })

  it("is the same whichever pitch comes first", () => {
    expect(intervalBetween(p("G4"), p("C4"))).toEqual(iv("P5"))
  })
})

describe("transpose", () => {
  it.each([
    ["C4", "M3", "E4"], ["E4", "M3", "G#4"], ["F4", "A4", "B4"], ["B4", "d5", "F5"],
    ["Bb3", "P5", "F4"], ["G4", "m7", "F5"], ["A4", "P8", "A5"], ["D#4", "M3", "F##4"],
  ])("%s up a %s is %s", (from, i, want) => {
    expect(transpose(p(from), iv(i))).toEqual(p(want))
  })

  it("goes down", () => {
    expect(transpose(p("C4"), iv("m3"), "down")).toEqual(p("A3"))
    expect(transpose(p("E4"), iv("P5"), "down")).toEqual(p("A3"))
  })

  it("is undone by intervalBetween", () => {
    for (const from of ["C4", "F#3", "Bb4"]) {
      for (const i of ["m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7", "P8"]) {
        expect(intervalBetween(p(from), transpose(p(from), iv(i)))).toEqual(iv(i))
      }
    }
  })
})

describe("naming", () => {
  it("names intervals in full", () => {
    expect(intervalName(iv("M3"))).toBe("major 3rd")
    expect(intervalName(iv("P8"))).toBe("perfect octave")
    expect(intervalName(iv("A4"))).toBe("augmented 4th")
  })

  it("counts semitones", () => {
    expect(semiTonesInSpelledInterval(iv("A4"))).toBe(6)
    expect(semiTonesInSpelledInterval(iv("d5"))).toBe(6)
    expect(semiTonesInSpelledInterval(iv("P8"))).toBe(12)
    expect(semiTonesInSpelledInterval(iv("m10"))).toBe(15)
  })
})
