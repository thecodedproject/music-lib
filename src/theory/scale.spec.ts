import {keyForSignature, keyName, keyScale, keySignatureOf, majorKeys, minorKeys, scaleFrom} from "./scale"
import {spelledNoteName} from "./notation"
import {p} from "./test_pitches"

const names = (ns: {letter: number, accidental: number}[]) => ns.map(spelledNoteName).join(" ")

describe("keyScale", () => {
  it("spells major scales", () => {
    expect(names(keyScale({tonic: {letter: 4, accidental: 0}, mode: "major"}))).toBe("G A B C D E F♯")
    expect(names(keyScale({tonic: {letter: 3, accidental: 0}, mode: "major"}))).toBe("F G A B♭ C D E")
    expect(names(keyScale({tonic: {letter: 0, accidental: 1}, mode: "major"}))).toBe("C♯ D♯ E♯ F♯ G♯ A♯ B♯")
  })

  it("spells natural minor scales", () => {
    expect(names(keyScale({tonic: {letter: 2, accidental: 0}, mode: "minor"}))).toBe("E F♯ G A B C D")
  })
})

describe("keys", () => {
  it("lists the major keys by key signature", () => {
    const ks = majorKeys()
    expect(ks.length).toBe(15)
    ks.forEach((k, i) => expect(keySignatureOf(k)).toBe(i - 7))
    expect(keyName(ks[0])).toBe("C♭ major")
    expect(keyName(ks[14])).toBe("C♯ major")
  })

  it("gives minor keys their relative major's signature", () => {
    minorKeys().forEach((k, i) => expect(keySignatureOf(k)).toBe(i - 7))
    expect(keyName(keyForSignature(1, "minor"))).toBe("E minor")
    expect(keyName(keyForSignature(-3, "minor"))).toBe("C minor")
  })
})

describe("scaleFrom", () => {
  it("plays G major from its sixth degree", () => {
    const g = keyForSignature(1)
    expect(scaleFrom(g, 6, 4)).toEqual(["E4", "F#4", "G4", "A4", "B4", "C5", "D5", "E5"].map(p))
  })

  it("crosses into the next octave at C", () => {
    const f = keyForSignature(-1)
    expect(scaleFrom(f, 1, 4)).toEqual(["F4", "G4", "A4", "Bb4", "C5", "D5", "E5", "F5"].map(p))
  })
})
