import { KeySignature, Pitch, SpelledNote } from "./notation";
export type KeyMode = "major" | "minor";
export interface Key {
    tonic: SpelledNote;
    mode: KeyMode;
}
export declare function keyScale(k: Key): SpelledNote[];
export declare function keySignatureOf(k: Key): KeySignature;
export declare function keyName(k: Key): string;
export declare function sameKey(a: Key, b: Key): boolean;
export declare function majorKeys(): Key[];
export declare function minorKeys(): Key[];
export declare function keyForSignature(sig: KeySignature, mode?: KeyMode): Key;
export declare function scaleFrom(k: Key, startDegree: number, startOctave: number): Pitch[];
export declare function pitchesAscend(ps: Pitch[]): boolean;
