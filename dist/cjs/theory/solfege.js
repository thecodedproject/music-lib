"use strict";
// Naming notes by letter or, in fixed do, by syllable.
Object.defineProperty(exports, "__esModule", { value: true });
exports.solfegeNames = void 0;
exports.letterLabel = letterLabel;
exports.noteLabel = noteLabel;
const notation_1 = require("./notation");
// the fixed-do syllables of each letter, from C up
exports.solfegeNames = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"];
// letterLabel names a letter (by index from C) in the naming system
function letterLabel(letter, system) {
    return system == "solfege" ? exports.solfegeNames[letter] : notation_1.letterNames[letter];
}
// noteLabel names a spelled note in the naming system: "F♯", "Fa♯"
function noteLabel(n, system) {
    return letterLabel(n.letter, system) + (0, notation_1.accidentalSymbol)(n.accidental);
}
