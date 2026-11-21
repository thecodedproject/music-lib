import {ledgerLines, pitchAtPosition, stavePosition} from "./clef"
import {trebleStavePosition} from "./notation"
import {p} from "./test_pitches"

describe("stavePosition", () => {
  it("agrees with trebleStavePosition on the treble stave", () => {
    for (const name of ["C4", "E4", "F5", "A5", "C6", "G3"]) {
      expect(stavePosition(p(name), "treble")).toBe(trebleStavePosition(p(name)))
    }
  })

  it("places the bass stave's lines on G B D F A", () => {
    expect(["G2", "B2", "D3", "F3", "A3"].map((n) => stavePosition(p(n), "bass"))).toEqual([0, 2, 4, 6, 8])
  })

  it("puts middle C a ledger line from either stave", () => {
    expect(stavePosition(p("C4"), "treble")).toBe(-2)
    expect(stavePosition(p("C4"), "bass")).toBe(10)
  })

  it("ignores accidentals", () => {
    expect(stavePosition(p("F#5"), "treble")).toBe(stavePosition(p("F5"), "treble"))
  })
})

describe("pitchAtPosition", () => {
  it("is the inverse of stavePosition for both clefs", () => {
    for (const clef of ["treble", "bass"] as const) {
      for (let pos = -8; pos <= 16; pos++) {
        expect(stavePosition(pitchAtPosition(pos, clef), clef)).toBe(pos)
      }
    }
  })

  it("applies the key signature", () => {
    expect(pitchAtPosition(8, "treble", 1)).toEqual(p("F#5"))
    expect(pitchAtPosition(4, "treble", -1)).toEqual(p("Bb4"))
    expect(pitchAtPosition(2, "treble", -1)).toEqual(p("G4"))
  })

  it("finds pitches below the bass stave", () => {
    expect(pitchAtPosition(-2, "bass")).toEqual(p("E2"))
  })
})

describe("ledgerLines", () => {
  it("is empty on the stave", () => {
    expect(ledgerLines(-1)).toEqual([])
    expect(ledgerLines(9)).toEqual([])
  })
  it("lists lines out to the note", () => {
    expect(ledgerLines(-2)).toEqual([-2])
    expect(ledgerLines(-5)).toEqual([-2, -4])
    expect(ledgerLines(12)).toEqual([10, 12])
  })
})
