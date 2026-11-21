/**
 * @jest-environment jsdom
 */

import {render} from "@testing-library/react"

import {Duration, Measure, Pitch} from "../theory/notation"
import {p} from "../theory/test_pitches"
import {Stave, StaveLayout, positionAtY, positionY} from "./stave"

// oneBar puts notes of a duration a beat apart in one bar
function oneBar(pitches: (Pitch | undefined)[], duration = Duration.Quarter, dots?: number): Measure[] {
  return [{
    numBeats: pitches.length,
    events: pitches.map((pitch, i) => ({start: i, duration, pitch, dots, id: i})),
    beams: [],
    tuplets: [],
  }]
}

const attr = (e: Element | null | undefined, name: string) => Number(e?.getAttribute(name))

describe("Stave clefs and note values", () => {
  it("draws a bass clef and places notes for it", () => {
    let layout: StaveLayout | undefined
    const {container} = render(
      <Stave measures={oneBar([p("G2"), p("A3"), p("C4")])} keySignature={0} slotsPerBeat={1}
        clef="bass" overlay={(l) => { layout = l; return null }} />,
    )
    expect(container.querySelectorAll(".clef circle").length).toBe(3)
    expect(layout!.events.map((e) => e.pos)).toEqual([0, 8, 10])
    const heads = Array.from(container.querySelectorAll(".noteHead"))
    expect(heads.map((h) => attr(h, "cy"))).toEqual([positionY(0), positionY(8), positionY(10)])
  })

  it("writes the bass clef's key signature a third lower", () => {
    const sharps = (clef: "treble" | "bass") => {
      const {container} = render(<Stave measures={oneBar([])} keySignature={1} slotsPerBeat={1} clef={clef} />)
      return container.querySelector(".accidental line")!.getAttribute("y1")
    }
    expect(Number(sharps("bass")) - Number(sharps("treble"))).toBe(10)
  })

  it("draws semibreves open and without stems", () => {
    const {container} = render(<Stave measures={oneBar([p("E4")], Duration.Whole)} keySignature={0} slotsPerBeat={1} />)
    expect(container.querySelector(".noteHead.open.whole")).not.toBeNull()
    expect(container.querySelector(".stem")).toBeNull()
  })

  it("draws minims open, with stems", () => {
    const {container} = render(<Stave measures={oneBar([p("E4")], Duration.Half)} keySignature={0} slotsPerBeat={1} />)
    expect(container.querySelector(".noteHead.open")).not.toBeNull()
    expect(container.querySelector(".stem")).not.toBeNull()
  })

  it("moves the dot of a note on a line into the space above", () => {
    const {container} = render(<Stave measures={oneBar([p("E4"), p("F4")], Duration.Quarter, 1)} keySignature={0} slotsPerBeat={1} />)
    const dots = Array.from(container.querySelectorAll(".note .dot")).map((d) => attr(d, "cy"))
    expect(dots).toEqual([positionY(1), positionY(1)])
  })

  it("classes notes and rests by id", () => {
    const {container} = render(
      <Stave measures={oneBar([p("E4"), undefined])} keySignature={0} slotsPerBeat={1}
        noteClasses={{0: "wrong", 1: "ghost"}} />,
    )
    expect(container.querySelector(".note.wrong")).not.toBeNull()
    expect(container.querySelector(".restEvent.ghost")).not.toBeNull()
  })

  it("makes room for the extent asked for", () => {
    const {container} = render(<Stave measures={oneBar([p("E4")])} keySignature={0} slotsPerBeat={1} extent={[-6, 14]} />)
    const [, top, , height] = container.querySelector("svg")!.getAttribute("viewBox")!.split(" ").map(Number)
    expect(top).toBeLessThanOrEqual(positionY(14) - 6)
    expect(top + height).toBeGreaterThanOrEqual(positionY(-6) + 6)
  })

  it("turns a y back into the nearest position", () => {
    for (let pos = -6; pos <= 14; pos++) {
      expect(positionAtY(positionY(pos) + 1.5)).toBe(pos)
    }
  })
})
