"use strict";
// Keys, and the spelled scales of them.
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyScale = keyScale;
exports.keySignatureOf = keySignatureOf;
exports.keyName = keyName;
exports.sameKey = sameKey;
exports.majorKeys = majorKeys;
exports.minorKeys = minorKeys;
exports.keyForSignature = keyForSignature;
exports.scaleFrom = scaleFrom;
exports.pitchesAscend = pitchesAscend;
const notation_1 = require("./notation");
const interval_1 = require("./interval");
// the steps between the degrees of each mode's scale, from the tonic
const scaleIntervals = {
    major: [
        { number: 1, quality: "P" }, { number: 2, quality: "M" }, { number: 3, quality: "M" },
        { number: 4, quality: "P" }, { number: 5, quality: "P" }, { number: 6, quality: "M" },
        { number: 7, quality: "M" },
    ],
    minor: [
        { number: 1, quality: "P" }, { number: 2, quality: "M" }, { number: 3, quality: "m" },
        { number: 4, quality: "P" }, { number: 5, quality: "P" }, { number: 6, quality: "m" },
        { number: 7, quality: "m" },
    ],
};
// keyScale spells the seven notes of the key's scale, from its tonic
function keyScale(k) {
    return scaleIntervals[k.mode].map((i) => (0, interval_1.transposeNote)(k.tonic, i));
}
// keySignatureOf is the key signature a key is written under: a minor key takes that of
// its relative major, a minor third up
function keySignatureOf(k) {
    if (k.mode == "major") {
        return (0, notation_1.majorKeySignature)(k.tonic);
    }
    return (0, notation_1.majorKeySignature)((0, interval_1.transposeNote)(k.tonic, { number: 3, quality: "m" }));
}
// keyName names a key: "G major", "F♯ minor"
function keyName(k) {
    return (0, notation_1.spelledNoteName)(k.tonic) + " " + k.mode;
}
function sameKey(a, b) {
    return a.mode == b.mode && a.tonic.letter == b.tonic.letter && a.tonic.accidental == b.tonic.accidental;
}
// the tonics of the major keys with up to seven sharps or flats, by key signature from
// seven flats (C♭) to seven sharps (C♯)
function majorKeys() {
    const keys = [];
    // round the circle of fifths: F C G D A E B, flattened or sharpened
    const fifths = [3, 0, 4, 1, 5, 2, 6];
    for (let sig = -7; sig <= 7; sig++) {
        // C major is the second in the circle; each step round adds a sharp
        const n = sig + 1;
        const letter = fifths[((n % 7) + 7) % 7];
        const accidental = Math.floor(n / 7);
        keys.push({ tonic: { letter, accidental }, mode: "major" });
    }
    return keys;
}
// minorKeys are the relative minors of majorKeys, from A♭ minor to A♯ minor
function minorKeys() {
    return majorKeys().map((k) => ({
        tonic: (0, interval_1.transposeNote)(k.tonic, { number: 6, quality: "M" }),
        mode: "minor",
    }));
}
// keyForSignature finds the major (or minor) key written under a key signature
function keyForSignature(sig, mode = "major") {
    const keys = mode == "major" ? majorKeys() : minorKeys();
    const k = keys[sig + 7];
    if (k == undefined) {
        throw RangeError("no key has a key signature of " + sig);
    }
    return k;
}
// scaleFrom spells one octave of the key's scale, rising from the given degree (1 for the
// tonic) in the given octave to the same degree an octave up: eight pitches.
function scaleFrom(k, startDegree, startOctave) {
    const notes = keyScale(k);
    const first = notes[startDegree - 1];
    const firstNumber = startOctave * notation_1.letterNames.length + first.letter;
    return [...Array(8)].map((_, i) => {
        const n = notes[(startDegree - 1 + i) % 7];
        // each degree is the next letter up
        const target = firstNumber + i;
        return { ...n, octave: Math.floor(target / notation_1.letterNames.length) };
    });
}
// pitchesAscend checks that each pitch is written higher than the one before
function pitchesAscend(ps) {
    return ps.every((p, i) => i == 0 || (0, notation_1.diatonicNumber)(p) > (0, notation_1.diatonicNumber)(ps[i - 1]));
}
