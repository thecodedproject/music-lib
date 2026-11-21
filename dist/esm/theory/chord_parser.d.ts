import { SpelledNote } from "./notation";
export interface ParsedChord {
    root: SpelledNote;
    semitones: number[];
    bass?: SpelledNote;
    display: string;
    rootName: string;
    suffix: string;
    bassName?: string;
}
export declare function intervalsForSuffix(suffix: string): number[] | undefined;
export declare function parseChord(text: string): ParsedChord | undefined;
export declare function normaliseChord(text: string): string;
export declare function pitchClass(n: SpelledNote): number;
