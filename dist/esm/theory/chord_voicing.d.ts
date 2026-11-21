import { ParsedChord } from "./chord_parser";
export interface ChordVoicing {
    bass: number;
    voices: number[];
}
export declare function voiceChord(chord: ParsedChord, previous?: number[]): ChordVoicing;
export declare function voiceProgression(chords: (ParsedChord | undefined)[]): (ChordVoicing | undefined)[];
