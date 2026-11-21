"use strict";
// Intervals between spelled pitches, named by number and quality the way they are written
// - so C to E♯ is an augmented third, though it sounds the same as the perfect fourth from
// C to F.
Object.defineProperty(exports, "__esModule", { value: true });
exports.letterNameOf = void 0;
exports.isPerfectNumber = isPerfectNumber;
exports.semiTonesInSpelledInterval = semiTonesInSpelledInterval;
exports.intervalBetween = intervalBetween;
exports.transpose = transpose;
exports.transposeNote = transposeNote;
exports.intervalNumberName = intervalNumberName;
exports.intervalShortName = intervalShortName;
exports.intervalName = intervalName;
exports.sameInterval = sameInterval;
const notation_1 = require("./notation");
// the semitones in the major or perfect simple interval of each number, from a unison up
const majorOrPerfectSemiTones = [0, 2, 4, 5, 7, 9, 11];
// unisons, fourths and fifths (and their compounds) are perfect; the rest major or minor
function isPerfectNumber(number) {
    const simple = (number - 1) % 7;
    return simple == 0 || simple == 3 || simple == 4;
}
// how far the quality takes the interval from its major or perfect size, in semitones
function qualityOffset(number, quality) {
    if (isPerfectNumber(number)) {
        switch (quality) {
            case "P": return 0;
            case "A": return 1;
            case "d": return -1;
            default: throw RangeError(`a ${number} cannot be ${quality}`);
        }
    }
    switch (quality) {
        case "M": return 0;
        case "m": return -1;
        case "A": return 1;
        case "d": return -2;
        default: throw RangeError(`a ${number} cannot be perfect`);
    }
}
// semiTonesInSpelledInterval is how many semitones the interval spans
function semiTonesInSpelledInterval(i) {
    const steps = i.number - 1;
    return 12 * Math.floor(steps / 7) + majorOrPerfectSemiTones[steps % 7] + qualityOffset(i.number, i.quality);
}
// intervalBetween names the interval from one pitch to another, whichever is higher. It
// throws for intervals more than doubly augmented or diminished, which have no name.
function intervalBetween(a, b) {
    const [low, high] = (0, notation_1.diatonicNumber)(a) < (0, notation_1.diatonicNumber)(b) ||
        ((0, notation_1.diatonicNumber)(a) == (0, notation_1.diatonicNumber)(b) && (0, notation_1.midiNumber)(a) <= (0, notation_1.midiNumber)(b)) ? [a, b] : [b, a];
    const number = (0, notation_1.diatonicNumber)(high) - (0, notation_1.diatonicNumber)(low) + 1;
    const semiTones = (0, notation_1.midiNumber)(high) - (0, notation_1.midiNumber)(low);
    const steps = number - 1;
    const offset = semiTones - (12 * Math.floor(steps / 7) + majorOrPerfectSemiTones[steps % 7]);
    if (isPerfectNumber(number)) {
        switch (offset) {
            case 0: return { number, quality: "P" };
            case 1: return { number, quality: "A" };
            case -1: return { number, quality: "d" };
        }
    }
    else {
        switch (offset) {
            case 0: return { number, quality: "M" };
            case -1: return { number, quality: "m" };
            case 1: return { number, quality: "A" };
            case -2: return { number, quality: "d" };
        }
    }
    throw RangeError(`cannot name the interval from ${JSON.stringify(low)} to ${JSON.stringify(high)}`);
}
// transpose moves a pitch up (or down) by an interval, spelling the result so that it
// spans the interval's number of letters.
function transpose(p, i, direction = "up") {
    const dir = direction == "up" ? 1 : -1;
    const target = (0, notation_1.diatonicNumber)(p) + dir * (i.number - 1);
    const letter = ((target % 7) + 7) % 7;
    const octave = Math.floor(target / 7);
    const natural = (0, notation_1.midiNumber)({ letter, accidental: 0, octave });
    const wanted = (0, notation_1.midiNumber)(p) + dir * semiTonesInSpelledInterval(i);
    return { letter, accidental: wanted - natural, octave };
}
// transposeNote moves a note, in no particular octave, up by an interval
function transposeNote(n, i) {
    const { letter, accidental } = transpose({ ...n, octave: 4 }, i);
    return { letter, accidental };
}
const ordinals = ["unison", "2nd", "3rd", "4th", "5th", "6th", "7th", "octave",
    "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
const qualityNames = {
    P: "perfect", M: "major", m: "minor", A: "augmented", d: "diminished",
};
// intervalNumberName names an interval's number alone: "3rd", "octave"
function intervalNumberName(number) {
    return ordinals[number - 1];
}
// intervalShortName abbreviates an interval: "M3", "P5", "d7", "P8"
function intervalShortName(i) {
    return i.quality + i.number;
}
// intervalName names an interval in full: "major 3rd", "perfect octave"
function intervalName(i) {
    return qualityNames[i.quality] + " " + intervalNumberName(i.number);
}
function sameInterval(a, b) {
    return a.number == b.number && a.quality == b.quality;
}
// letterNameOf is the letter of a spelled note, as written
const letterNameOf = (n) => notation_1.letterNames[n.letter];
exports.letterNameOf = letterNameOf;
