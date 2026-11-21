import {NotePlayer, midiFrequency} from "./note_player"

// a stand-in for the browser's audio that records each oscillator started
class FakeContext {
  currentTime = 10
  state = "running"
  destination = {}
  started: {time: number, frequency: number}[] = []
  param() {
    return {value: 1, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {}}
  }
  createGain() {
    return {gain: this.param(), connect: (n: any) => n, disconnect() {}}
  }
  createOscillator() {
    const ctx = this
    const osc = {
      type: "sine",
      frequency: {...this.param(), value: 0},
      connect: (n: any) => n,
      start(time: number) { ctx.started.push({time, frequency: osc.frequency.value}) },
      stop() {},
    }
    return osc
  }
  resume() { return Promise.resolve() }
}

describe("NotePlayer", () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  const fundamentals = (ctx: FakeContext) => {
    // the fundamental of each note is the lowest frequency started at its time
    const byTime = new Map<number, number>()
    for (const s of ctx.started) {
      byTime.set(s.time, Math.min(byTime.get(s.time) ?? Infinity, s.frequency))
    }
    return [...byTime.entries()].sort((a, b) => a[0] - b[0])
  }

  it("plays each step at its time, on the beat", async () => {
    const ctx = new FakeContext()
    const player = new NotePlayer(() => ctx as unknown as AudioContext)
    const steps: number[] = []
    const done = player.playSequence(
      [{midi: [60], beats: 1}, {midi: [], beats: 1}, {midi: [64], beats: 2}],
      {bpm: 60, onStep: (i) => steps.push(i)},
    )
    jest.runAllTimers()
    await done

    const notes = fundamentals(ctx)
    expect(notes.map(([, f]) => f)).toEqual([midiFrequency(60), midiFrequency(64)])
    expect(notes[1][0] - notes[0][0]).toBeCloseTo(2)
    expect(steps).toEqual([0, 1, 2])
  })

  it("resolves a phrase straight away when it is stopped", async () => {
    const ctx = new FakeContext()
    const player = new NotePlayer(() => ctx as unknown as AudioContext)
    const done = player.playSequence([{midi: [60], beats: 8}])
    player.stop()
    await expect(done).resolves.toBeUndefined()
  })

  it("swaps in a fresh context, on the next tap, for one cut off in the background", () => {
    const contexts: FakeContext[] = []
    const player = new NotePlayer(() => {
      const ctx = new FakeContext()
      contexts.push(ctx)
      return ctx as unknown as AudioContext
    })
    player.ensure()
    // a running context is kept
    player.revive()
    expect(contexts.length).toBe(1)

    // iOS suspends it and won't resume it
    const old = contexts[0] as any
    old.close = () => Promise.resolve()
    old.resume = () => Promise.resolve()
    old.state = "suspended"
    old.onstatechange()
    player.revive()
    expect(contexts.length).toBe(2)

    player.playNote(60)
    expect(contexts[1].started.length).toBeGreaterThan(0)
    expect(contexts[0].started.length).toBe(0)
  })
})
