import { Pitch, SpelledNote } from "./notation";
export type IntervalQuality = "P" | "M" | "m" | "A" | "d";
export interface SpelledInterval {
    number: number;
    quality: IntervalQuality;
}
export declare function isPerfectNumber(number: number): boolean;
export declare function semiTonesInSpelledInterval(i: SpelledInterval): number;
export declare function intervalBetween(a: Pitch, b: Pitch): SpelledInterval;
export declare function transpose(p: Pitch, i: SpelledInterval, direction?: "up" | "down"): Pitch;
export declare function transposeNote(n: SpelledNote, i: SpelledInterval): SpelledNote;
export declare function intervalNumberName(number: number): string;
export declare function intervalShortName(i: SpelledInterval): string;
export declare function intervalName(i: SpelledInterval): string;
export declare function sameInterval(a: SpelledInterval, b: SpelledInterval): boolean;
export declare const letterNameOf: (n: SpelledNote) => string;
