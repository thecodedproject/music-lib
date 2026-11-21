// Naming notes by letter or, in fixed do, by syllable.
import { accidentalSymbol, letterNames, } from "./notation";
// the fixed-do syllables of each letter, from C up
export const solfegeNames = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"];
// letterLabel names a letter (by index from C) in the naming system
export function letterLabel(letter, system) {
    return system == "solfege" ? solfegeNames[letter] : letterNames[letter];
}
// noteLabel names a spelled note in the naming system: "F♯", "Fa♯"
export function noteLabel(n, system) {
    return letterLabel(n.letter, system) + accidentalSymbol(n.accidental);
}
