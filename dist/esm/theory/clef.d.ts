import { KeySignature, Pitch } from "./notation";
export type Clef = "treble" | "bass";
export declare function clefBottomLine(clef: Clef): Pitch;
export declare function stavePosition(p: Pitch, clef: Clef): number;
export declare function pitchAtPosition(pos: number, clef: Clef, keySignature?: KeySignature): Pitch;
export declare function ledgerLines(pos: number): number[];
