import {noteLabel} from "./solfege"

it("names notes by letter or syllable", () => {
  expect(noteLabel({letter: 3, accidental: 1}, "letters")).toBe("F♯")
  expect(noteLabel({letter: 3, accidental: 1}, "solfege")).toBe("Fa♯")
  expect(noteLabel({letter: 6, accidental: -1}, "solfege")).toBe("Ti♭")
})
