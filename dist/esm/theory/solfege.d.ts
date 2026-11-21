import { SpelledNote } from "./notation";
export type NamingSystem = "letters" | "solfege";
export declare const solfegeNames: string[];
export declare function letterLabel(letter: number, system: NamingSystem): string;
export declare function noteLabel(n: SpelledNote, system: NamingSystem): string;
