import { Note, ScaleType } from "./chord_anthology";
export declare const letterNames: string[];
export interface SpelledNote {
    letter: number;
    accidental: number;
}
export interface Pitch extends SpelledNote {
    octave: number;
}
export declare function accidentalSymbol(accidental: number): string;
export declare function spelledNoteName(n: SpelledNote): string;
export declare function spellNote(n: Note): SpelledNote;
export declare function diatonicNumber(p: Pitch): number;
export declare function midiNumber(p: Pitch): number;
export declare function trebleStavePosition(p: Pitch): number;
export type KeySignature = number;
export declare function majorKeySignature(tonic: SpelledNote): KeySignature;
export interface ScaleSpelling {
    notes: SpelledNote[];
    keySignature: KeySignature;
}
export declare function spellScale(ionianRoot: Note, scaleType: ScaleType, startingScaleDegree: number): ScaleSpelling;
export declare function scaleDegreePitch(scale: SpelledNote[], degree: number, tonicOctave: number): Pitch;
export declare function trebleOctave(scale: SpelledNote[], degrees: number[]): number;
export declare function keySignatureLetters(k: KeySignature): number[];
export declare function keySignatureAccidental(k: KeySignature, letter: number): number;
export declare enum Duration {
    Whole = "Whole",
    Half = "Half",
    Quarter = "Quarter",
    Eighth = "Eighth",
    Sixteenth = "Sixteenth"
}
export declare function beamsForDuration(d: Duration): number;
export interface ScoreEvent {
    start: number;
    duration: Duration;
    pitch?: Pitch;
    accidental?: number;
    dots?: number;
    id?: number;
}
export interface Tuplet {
    first: number;
    last: number;
}
export interface Measure {
    numBeats: number;
    events: ScoreEvent[];
    beams: number[][];
    tuplets: Tuplet[];
}
export interface GridNote {
    slot: number;
    pitch: Pitch;
    length?: number;
}
export interface GridLayout {
    slotsPerBeat: number;
    beatsPerBar: number;
    numBars: number;
    keySignature: KeySignature;
    fillWithRests?: boolean;
}
export declare function scoreFromGrid(notes: GridNote[], layout: GridLayout): Measure[];
