"use strict";
// Clefs, and where each places a pitch on the stave.
Object.defineProperty(exports, "__esModule", { value: true });
exports.clefBottomLine = clefBottomLine;
exports.stavePosition = stavePosition;
exports.pitchAtPosition = pitchAtPosition;
exports.ledgerLines = ledgerLines;
const notation_1 = require("./notation");
// the pitch on the bottom line of each clef's stave: E4 for the treble, G2 for the bass
const bottomLines = {
    treble: { letter: 2, accidental: 0, octave: 4 },
    bass: { letter: 4, accidental: 0, octave: 2 },
};
function clefBottomLine(clef) {
    return { ...bottomLines[clef] };
}
// stavePosition places the pitch on the clef's stave, counting lines and spaces up from
// its bottom line: 0 for the bottom line, 1 for the space above it, 8 for the top line,
// and below 0 or above 8 for the ledger lines. The accidental makes no difference.
function stavePosition(p, clef) {
    return (0, notation_1.diatonicNumber)(p) - (0, notation_1.diatonicNumber)(bottomLines[clef]);
}
// pitchAtPosition is the pitch written at a position on the clef's stave, with the
// accidental the key signature gives its letter.
function pitchAtPosition(pos, clef, keySignature = 0) {
    const n = (0, notation_1.diatonicNumber)(bottomLines[clef]) + pos;
    const letter = ((n % notation_1.letterNames.length) + notation_1.letterNames.length) % notation_1.letterNames.length;
    return {
        letter: letter,
        accidental: (0, notation_1.keySignatureAccidental)(keySignature, letter),
        octave: Math.floor(n / notation_1.letterNames.length),
    };
}
// ledgerLines lists the positions of the ledger lines a note at the position needs.
function ledgerLines(pos) {
    const lines = [];
    for (let p = -2; p >= pos; p -= 2) {
        lines.push(p);
    }
    for (let p = 10; p <= pos; p += 2) {
        lines.push(p);
    }
    return lines;
}
