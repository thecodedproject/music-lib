// NotePlayer plays short phrases of notes - a melody, an interval, a chord - for ear
// training, scheduling every note on the audio clock as soon as it is asked to play.

// Voice sounds one note. It is given the context, where to send its sound, when to start
// (on the audio clock), the MIDI note, how long it lasts in seconds and how loud it is
// (0 to 1).
export interface Voice {
  sound(ctx: BaseAudioContext, dest: AudioNode, time: number, midi: number, length: number, level: number): void
}

export const midiFrequency = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12)

// the partials of the struck voice, as multiples of the note's frequency, with how loud
// each starts and how quickly it dies away (higher partials die faster)
const partials: {ratio: number, level: number, decay: number}[] = [
  {ratio: 1, level: 1, decay: 1.6},
  {ratio: 2, level: 0.42, decay: 0.9},
  {ratio: 3, level: 0.16, decay: 0.55},
  {ratio: 4, level: 0.08, decay: 0.35},
]

// struckVoice is a soft, piano-ish tone: a few sine partials, struck and dying away. The
// pitch is clear enough to sing back without being harsh.
export const struckVoice: Voice = {
  sound(ctx, dest, time, midi, length, level) {
    const f = midiFrequency(midi)
    // high notes ring for less time, as on a piano
    const ring = Math.max(0.5, 1.4 - (midi - 60) / 40)
    const end = time + Math.max(length, 0.08) + 0.25
    const out = ctx.createGain()
    out.gain.setValueAtTime(1, time)
    // let go of the note when its time is up, damping it quickly
    out.gain.setValueAtTime(1, time + length)
    out.gain.exponentialRampToValueAtTime(0.001, end)
    out.connect(dest)

    for (const part of partials) {
      const pf = f * part.ratio
      if (pf > 12000) {
        continue
      }
      const osc = ctx.createOscillator()
      const env = ctx.createGain()
      const peak = 0.22 * level * part.level
      osc.type = "sine"
      osc.frequency.value = pf
      env.gain.setValueAtTime(0, time)
      env.gain.linearRampToValueAtTime(peak, time + 0.006)
      env.gain.exponentialRampToValueAtTime(Math.max(peak * 0.001, 1e-5), time + part.decay * ring)
      osc.connect(env).connect(out)
      osc.start(time)
      osc.stop(end + 0.02)
    }
  },
}

// SequenceNote is a step of a phrase: the notes sounded together (none for a rest), and
// how many beats it lasts.
export interface SequenceNote {
  midi: number[]
  beats: number
}

export interface PlayOptions {
  bpm?: number
  // called as each step of the phrase begins, with its index
  onStep?: (index: number) => void
}

// how long after being asked a phrase starts, so the first note is not clipped
const leadIn = 0.08

export class NotePlayer {
  private ctx?: AudioContext
  private out?: GainNode
  private timers: ReturnType<typeof setTimeout>[] = []
  private finish?: () => void
  volume = 0.8
  voice: Voice = struckVoice

  constructor(private newContext: () => AudioContext = newAudioContext) {}

  // ensure opens the audio, which browsers only allow in answer to a tap or click: call
  // it from one before the first sound is wanted.
  ensure(): AudioContext {
    if (this.ctx == undefined) {
      // on iOS, play even with the ringer switched off
      const nav = typeof navigator != "undefined" ? (navigator as any) : undefined
      if (nav?.audioSession != undefined) {
        try {
          nav.audioSession.type = "playback"
        } catch {
          // not supported here
        }
      }
      this.ctx = this.newContext()
      this.out = this.ctx.createGain()
      this.out.connect(this.ctx.destination)
    }
    if (this.ctx.state == "suspended") {
      this.ctx.resume()
    }
    this.out!.gain.value = this.volume
    return this.ctx
  }

  // playSequence plays the phrase, resolving once it has finished (or been stopped)
  playSequence(steps: SequenceNote[], opts: PlayOptions = {}): Promise<void> {
    this.stop()
    const ctx = this.ensure()
    const beat = 60 / (opts.bpm ?? 80)
    const start = ctx.currentTime + leadIn

    let t = 0
    steps.forEach((step, i) => {
      const length = step.beats * beat
      const level = 1 / Math.sqrt(Math.max(1, step.midi.length))
      for (const midi of step.midi) {
        this.voice.sound(ctx, this.out!, start + t, midi, length * 0.92, level)
      }
      if (opts.onStep != undefined) {
        const onStep = opts.onStep
        this.timers.push(setTimeout(() => onStep(i), (leadIn + t) * 1000))
      }
      t += length
    })

    return new Promise((resolve) => {
      this.finish = resolve
      this.timers.push(setTimeout(() => {
        this.finish = undefined
        resolve()
      }, (leadIn + t) * 1000 + 50))
    })
  }

  // playNote sounds a single note straight away, as when one is placed on the stave
  playNote(midi: number, seconds = 0.6) {
    const ctx = this.ensure()
    this.voice.sound(ctx, this.out!, ctx.currentTime + 0.01, midi, seconds, 1)
  }

  // stop cuts off whatever is playing
  stop() {
    this.timers.forEach(clearTimeout)
    this.timers = []
    if (this.ctx != undefined && this.out != undefined) {
      this.out.disconnect()
      this.out = this.ctx.createGain()
      this.out.gain.value = this.volume
      this.out.connect(this.ctx.destination)
    }
    const finish = this.finish
    this.finish = undefined
    finish?.()
  }

  // chime sounds a short rising tone for a right answer, or a falling one for a wrong one
  chime(correct: boolean) {
    const ctx = this.ensure()
    const now = ctx.currentTime + 0.01
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.type = correct ? "sine" : "triangle"
    if (correct) {
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.setValueAtTime(1320, now + 0.09)
    } else {
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.linearRampToValueAtTime(196, now + 0.25)
    }
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(0.18, now + 0.01)
    env.gain.exponentialRampToValueAtTime(0.001, now + (correct ? 0.3 : 0.35))
    osc.connect(env).connect(this.out!)
    osc.start(now)
    osc.stop(now + 0.4)
  }
}

// newAudioContext opens the browser's audio - under the older name Safari gave it, where
// that is the only one it has.
export function newAudioContext(): AudioContext {
  const Context = typeof AudioContext != "undefined"
    ? AudioContext
    : typeof window != "undefined" ? (window as any).webkitAudioContext : undefined
  if (Context == undefined) {
    throw new Error("this browser cannot play audio")
  }
  return new Context()
}
