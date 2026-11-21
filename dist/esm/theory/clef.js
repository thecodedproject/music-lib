// Clefs, and where each places a pitch on the stave.
import { diatonicNumber, keySignatureAccidental, letterNames, } from "./notation";
// the pitch on the bottom line of each clef's stave: E4 for the treble, G2 for the bass
const bottomLines = {
    treble: { letter: 2, accidental: 0, octave: 4 },
    bass: { letter: 4, accidental: 0, octave: 2 },
};
export function clefBottomLine(clef) {
    return { ...bottomLines[clef] };
}
// stavePosition places the pitch on the clef's stave, counting lines and spaces up from
// its bottom line: 0 for the bottom line, 1 for the space above it, 8 for the top line,
// and below 0 or above 8 for the ledger lines. The accidental makes no difference.
export function stavePosition(p, clef) {
    return diatonicNumber(p) - diatonicNumber(bottomLines[clef]);
}
// pitchAtPosition is the pitch written at a position on the clef's stave, with the
// accidental the key signature gives its letter.
export function pitchAtPosition(pos, clef, keySignature = 0) {
    const n = diatonicNumber(bottomLines[clef]) + pos;
    const letter = ((n % letterNames.length) + letterNames.length) % letterNames.length;
    return {
        letter: letter,
        accidental: keySignatureAccidental(keySignature, letter),
        octave: Math.floor(n / letterNames.length),
    };
}
// ledgerLines lists the positions of the ledger lines a note at the position needs.
export function ledgerLines(pos) {
    const lines = [];
    for (let p = -2; p >= pos; p -= 2) {
        lines.push(p);
    }
    for (let p = 10; p <= pos; p += 2) {
        lines.push(p);
    }
    return lines;
}
