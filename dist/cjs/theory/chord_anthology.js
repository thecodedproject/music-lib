"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetradQuality = exports.numTriadVoices = exports.triadVoicings = exports.TriadVoicing = exports.numTetradVoices = exports.tetradVoicings = exports.TetradVoicing = exports.Mode = exports.DiatonicInterval = exports.ScaleType = exports.Interval = exports.Note = void 0;
exports.scaleTypeForMode = scaleTypeForMode;
exports.diatonicScaleIntervals = diatonicScaleIntervals;
exports.semiTonesBetweenNotesUpwards = semiTonesBetweenNotesUpwards;
exports.intervalBetweenNotesUpwards = intervalBetweenNotesUpwards;
exports.diatonicIntervalBetweenScaleDegreesUpwards = diatonicIntervalBetweenScaleDegreesUpwards;
exports.scaleDegreesInDiatonicInterval = scaleDegreesInDiatonicInterval;
exports.diatonicScale = diatonicScale;
exports.modeForScale = modeForScale;
exports.scaleFromIonianRoot = scaleFromIonianRoot;
exports.scaleNotes = scaleNotes;
exports.scaleDegreeNotes = scaleDegreeNotes;
exports.semiTonesInInterval = semiTonesInInterval;
exports.semiTonesBetweenScaleDegreesUpwards = semiTonesBetweenScaleDegreesUpwards;
exports.shiftNote = shiftNote;
exports.scaleDegree = scaleDegree;
exports.vlChordNotes = vlChordNotes;
exports.shiftScaleDiatonically = shiftScaleDiatonically;
exports.shiftChordTonesByMap = shiftChordTonesByMap;
exports.shiftChordToNextNearestInversion = shiftChordToNextNearestInversion;
exports.tetradQualityAtScaleDegree = tetradQualityAtScaleDegree;
exports.normaliseVoicing = normaliseVoicing;
exports.voicingScaleDegrees = voicingScaleDegrees;
exports.invertVoicing = invertVoicing;
exports.shiftVoicesByOctaves = shiftVoicesByOctaves;
exports.dropVoices = dropVoices;
exports.raiseVoices = raiseVoices;
exports.applyTetradVoicing = applyTetradVoicing;
exports.tetradVoicing = tetradVoicing;
exports.applyTriadVoicing = applyTriadVoicing;
exports.triadVoicing = triadVoicing;
exports.createCycle = createCycle;
const util_1 = require("./util");
var Note;
(function (Note) {
    Note["C"] = "C";
    Note["Db"] = "Db";
    Note["D"] = "D";
    Note["Eb"] = "Eb";
    Note["E"] = "E";
    Note["F"] = "F";
    Note["Gb"] = "Gb";
    Note["G"] = "G";
    Note["Ab"] = "Ab";
    Note["A"] = "A";
    Note["Bb"] = "Bb";
    Note["B"] = "B";
})(Note || (exports.Note = Note = {}));
var Interval;
(function (Interval) {
    Interval["Unison"] = "Unison";
    Interval["MinorSecond"] = "MinorSecond";
    Interval["MajorSecond"] = "MajorSecond";
    Interval["MinorThird"] = "MinorThird";
    Interval["MajorThird"] = "MajorThird";
    Interval["Fourth"] = "Fourth";
    Interval["DiminishedFifth"] = "DiminishedFifth";
    Interval["PerfectFifth"] = "PerfectFifth";
    Interval["AugmentedFifth"] = "AugmentedFifth";
    Interval["Sixth"] = "Sixth";
    Interval["MinorSeven"] = "MinorSeven";
    Interval["MajorSeven"] = "MajorSeven";
})(Interval || (exports.Interval = Interval = {}));
var ScaleType;
(function (ScaleType) {
    ScaleType["Major"] = "Major";
    ScaleType["MelodicMinor"] = "MelodicMinor";
    ScaleType["HarmonicMinor"] = "HarmonicMinor";
    ScaleType["HarmonicMajor"] = "HarmonicMajor";
})(ScaleType || (exports.ScaleType = ScaleType = {}));
var DiatonicInterval;
(function (DiatonicInterval) {
    DiatonicInterval["Unison"] = "Unison";
    DiatonicInterval["Second"] = "Second";
    DiatonicInterval["Third"] = "Third";
    DiatonicInterval["Fourth"] = "Fourth";
    DiatonicInterval["Fifth"] = "Fifth";
    DiatonicInterval["Sixth"] = "Sixth";
    DiatonicInterval["Seventh"] = "Seventh";
})(DiatonicInterval || (exports.DiatonicInterval = DiatonicInterval = {}));
var Mode;
(function (Mode) {
    // Major scale modes
    Mode["Ionian"] = "Ionian";
    Mode["Dorian"] = "Dorian";
    Mode["Phrygian"] = "Phrygian";
    Mode["Lydian"] = "Lydian";
    Mode["Mixolydian"] = "Mixolydian";
    Mode["Aeolian"] = "Aeolian";
    Mode["Locrian"] = "Locrian";
    // Melodic minor modes
    Mode["Ionian_b3"] = "Ionian_b3";
    Mode["Dorian_b2"] = "Dorian_b2";
    Mode["Phrygian_b1"] = "Phrygian_b1";
    Mode["Lydian_b7"] = "Lydian_b7";
    Mode["Mixolydian_b6"] = "Mixolydian_b6";
    Mode["Aeolian_b5"] = "Aeolian_b5";
    Mode["Locrian_b4"] = "Locrian_b4";
    // Harmonic minor modes
    Mode["Ionian_sharp5"] = "Ionian_sharp5";
    Mode["Dorian_sharp4"] = "Dorian_sharp4";
    Mode["Phrygian_natural3"] = "Phrygian_natural3";
    Mode["Lydian_sharp2"] = "Lydian_sharp2";
    Mode["Mixolydian_sharp1"] = "Mixolydian_sharp1";
    Mode["Aeolian_natural7"] = "Aeolian_natural7";
    Mode["Locrian_natural6"] = "Locrian_natural6";
    // Harmonic major modes
    Mode["Ionian_b6"] = "Ionian_b6";
    Mode["Dorian_b5"] = "Dorian_b5";
    Mode["Phrygian_b4"] = "Phrygian_b4";
    Mode["Lydian_b3"] = "Lydian_b3";
    Mode["Mixolydian_b2"] = "Mixolydian_b2";
    Mode["Aeolian_b1"] = "Aeolian_b1";
    Mode["Locrian_bb7"] = "Locrian_bb7";
})(Mode || (exports.Mode = Mode = {}));
function scaleTypeForMode(mode) {
    switch (mode) {
        case Mode.Ionian:
        case Mode.Dorian:
        case Mode.Phrygian:
        case Mode.Lydian:
        case Mode.Mixolydian:
        case Mode.Aeolian:
        case Mode.Locrian:
            return ScaleType.Major;
        case Mode.Ionian_b3:
        case Mode.Dorian_b2:
        case Mode.Phrygian_b1:
        case Mode.Lydian_b7:
        case Mode.Mixolydian_b6:
        case Mode.Aeolian_b5:
        case Mode.Locrian_b4:
            return ScaleType.MelodicMinor;
        case Mode.Ionian_sharp5:
        case Mode.Dorian_sharp4:
        case Mode.Phrygian_natural3:
        case Mode.Lydian_sharp2:
        case Mode.Mixolydian_sharp1:
        case Mode.Aeolian_natural7:
        case Mode.Locrian_natural6:
            return ScaleType.HarmonicMinor;
        case Mode.Ionian_b6:
        case Mode.Dorian_b5:
        case Mode.Phrygian_b4:
        case Mode.Lydian_b3:
        case Mode.Mixolydian_b2:
        case Mode.Aeolian_b1:
        case Mode.Locrian_bb7:
            return ScaleType.HarmonicMajor;
        default: throw RangeError("unknown mode: " + mode);
    }
}
function diatonicScaleIntervals(mode) {
    switch (mode) {
        // Major scale modes
        case Mode.Ionian: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Dorian: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Phrygian: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Lydian: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Mixolydian: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Aeolian: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Locrian: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        // Melodic minor modes
        case Mode.Ionian_b3: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Dorian_b2: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Phrygian_b1: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Lydian_b7: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Mixolydian_b6: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Aeolian_b5: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Locrian_b4: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        // Harmonic minor modes
        case Mode.Ionian_sharp5: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Dorian_sharp4: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Phrygian_natural3: return [
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Lydian_sharp2: return [
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Mixolydian_sharp1: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
        ];
        case Mode.Aeolian_natural7: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
        ];
        case Mode.Locrian_natural6: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        // Harmonic major modes
        case Mode.Ionian_b6: return [
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
        ];
        case Mode.Dorian_b5: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Phrygian_b4: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Lydian_b3: return [
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Mixolydian_b2: return [
            Interval.MinorSecond,
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
        ];
        case Mode.Aeolian_b1: return [
            Interval.MinorThird,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
        ];
        case Mode.Locrian_bb7: return [
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MajorSecond,
            Interval.MinorSecond,
            Interval.MinorThird,
        ];
        default: throw RangeError("cannot get scale intervals for unknown diatonic mode:" + mode);
    }
}
function noteAsNumber(n) {
    switch (n) {
        case Note.C: return 0;
        case Note.Db: return 1;
        case Note.D: return 2;
        case Note.Eb: return 3;
        case Note.E: return 4;
        case Note.F: return 5;
        case Note.Gb: return 6;
        case Note.G: return 7;
        case Note.Ab: return 8;
        case Note.A: return 9;
        case Note.Bb: return 10;
        case Note.B: return 11;
        default: throw RangeError("cannot convert unknown note to number:" + n);
    }
}
function semiTonesBetweenNotesUpwards(lowerNote, upperNote) {
    if (lowerNote === upperNote) {
        return 0;
    }
    // Due to our choice of note _values_ the result of the subtraction opperation
    // should be between 0 and 12 (i.e. `|mod(12)|`). Since we know the most negative
    // _absolute value_ we can get between a pair of notes is -11 (i.e. from B to C)
    // we can shift absolute value up by 12 and take the modulo.
    return (noteAsNumber(upperNote) - noteAsNumber(lowerNote) + 12) % 12;
}
function intervalBetweenNotesUpwards(lowerNote, upperNote) {
    const noteDistance = semiTonesBetweenNotesUpwards(lowerNote, upperNote);
    switch (noteDistance) {
        case 0: return Interval.Unison;
        case 1: return Interval.MinorSecond;
        case 2: return Interval.MajorSecond;
        case 3: return Interval.MinorThird;
        case 4: return Interval.MajorThird;
        case 5: return Interval.Fourth;
        case 6: return Interval.DiminishedFifth;
        case 7: return Interval.PerfectFifth;
        case 8: return Interval.AugmentedFifth;
        case 9: return Interval.Sixth;
        case 10: return Interval.MinorSeven;
        case 11: return Interval.MajorSeven;
        default: throw RangeError("cannot convert unknown note distance to interval; lowerNote:" + lowerNote + " upperNote:" + upperNote + " noteDistance:" + noteDistance);
    }
}
function diatonicIntervalBetweenScaleDegreesUpwards(s, lowerDegree, upperDegree) {
    const numNotesInScale = s.intervals.length;
    const distance = (upperDegree - lowerDegree + numNotesInScale) % numNotesInScale;
    switch (distance) {
        case 0: return DiatonicInterval.Unison;
        case 1: return DiatonicInterval.Second;
        case 2: return DiatonicInterval.Third;
        case 3: return DiatonicInterval.Fourth;
        case 4: return DiatonicInterval.Fifth;
        case 5: return DiatonicInterval.Sixth;
        case 6: return DiatonicInterval.Seventh;
        default: throw RangeError("cannot convert unknown scale degree distance to interval; lowerDegree:" + lowerDegree + " upperDegree:" + upperDegree + " distance:" + distance);
    }
}
// scaleDegreesInDiatonicInterval counts the scale degrees a diatonic interval climbs -
// none for a unison, one for a second, and so on up.
function scaleDegreesInDiatonicInterval(i) {
    switch (i) {
        case DiatonicInterval.Unison: return 0;
        case DiatonicInterval.Second: return 1;
        case DiatonicInterval.Third: return 2;
        case DiatonicInterval.Fourth: return 3;
        case DiatonicInterval.Fifth: return 4;
        case DiatonicInterval.Sixth: return 5;
        case DiatonicInterval.Seventh: return 6;
        default: throw RangeError("cannot count the scale degrees of an unknown diatonic interval:" + i);
    }
}
function shiftIntervals(intervals, numShifts) {
    const retVal = [...intervals];
    for (let i = 0; i < numShifts; i++) {
        const e = retVal.shift();
        if (e == undefined) {
            throw new RangeError("got undefined element whilst shifting intervals");
        }
        retVal.push(e);
    }
    return retVal;
}
function diatonicScale(root, mode) {
    return {
        root: root,
        intervals: diatonicScaleIntervals(mode),
    };
}
// modeForScale names the mode the scale is built from.
//
// Every mode of every diatonic scale type has its own pattern of intervals, so the
// pattern alone names the mode however the scale was arrived at - including scales
// shifted diatonically away from the one they started as.
function modeForScale(s) {
    for (const mode of Object.values(Mode)) {
        if ((0, util_1.isEqual)(diatonicScaleIntervals(mode), s.intervals)) {
            return mode;
        }
    }
    throw RangeError("cannot name the mode of a scale whose intervals are not those of a diatonic mode:" + s.intervals);
}
function scaleFromIonianRoot(ionianRoot, scaleType, startingScaleDegree) {
    const ionianScale = (() => {
        switch (scaleType) {
            case ScaleType.Major: return diatonicScale(ionianRoot, Mode.Ionian);
            case ScaleType.MelodicMinor: return diatonicScale(ionianRoot, Mode.Ionian_b3);
            case ScaleType.HarmonicMinor: return diatonicScale(ionianRoot, Mode.Ionian_sharp5);
            case ScaleType.HarmonicMajor: return diatonicScale(ionianRoot, Mode.Ionian_b6);
            default: throw RangeError("cannot get scale from ionian root for unknown diatonic scale type: " + scaleType);
        }
    })();
    const intervalBetweenRoots = diatonicIntervalBetweenScaleDegreesUpwards(ionianScale, 1, startingScaleDegree);
    return shiftScaleDiatonically(ionianScale, intervalBetweenRoots);
}
function scaleNotes(s, octave = 1) {
    let n = [];
    for (let i = 1; i < (s.intervals.length * octave) + 1; i++) {
        n.push(scaleDegree(s, i));
    }
    return n;
}
// scaleDegreeNotes returns notes for the given scale degrees across `octaves` octaves.
// e.g. scaleDegreeNotes(cMaj, [1, 3, 5, 7], 2) returns the two-octave arpeggio of Cmaj7.
function scaleDegreeNotes(s, degrees, octaves = 1) {
    const notes = [];
    const scaleLength = s.intervals.length;
    for (let o = 0; o < octaves; o++) {
        for (const d of degrees) {
            notes.push(scaleDegree(s, d + o * scaleLength));
        }
    }
    return notes;
}
function semiTonesInInterval(i) {
    switch (i) {
        case Interval.Unison: return 0;
        case Interval.MinorSecond: return 1;
        case Interval.MajorSecond: return 2;
        case Interval.MinorThird: return 3;
        case Interval.MajorThird: return 4;
        case Interval.Fourth: return 5;
        case Interval.DiminishedFifth: return 6;
        case Interval.PerfectFifth: return 7;
        case Interval.AugmentedFifth: return 8;
        case Interval.Sixth: return 9;
        case Interval.MinorSeven: return 10;
        case Interval.MajorSeven: return 11;
        default: throw RangeError("cannot convert unknown interval to number:" + i);
    }
}
// semiTonesBetweenScaleDegreesUpwards returns the number of semitones from one scale
// degree up to another.
//
// Unlike semiTonesBetweenNotesUpwards this counts whole octaves too, so degrees more
// than an octave apart are more than 12 semitones apart.
function semiTonesBetweenScaleDegreesUpwards(s, lowerDegree, upperDegree) {
    if (lowerDegree < 1) {
        throw new RangeError("cannot measure from scale degree below the first:" + lowerDegree);
    }
    if (upperDegree < lowerDegree) {
        throw new RangeError("cannot measure upwards from scale degree " + lowerDegree + " to " + upperDegree);
    }
    let semiTones = 0;
    for (let d = lowerDegree; d < upperDegree; d++) {
        semiTones += semiTonesInInterval(s.intervals[(d - 1) % s.intervals.length]);
    }
    return semiTones;
}
function shiftNote(n, i) {
    let noteVal = noteAsNumber(n);
    noteVal = (noteVal + semiTonesInInterval(i)) % 12;
    return (() => {
        switch (noteVal) {
            case 0: return Note.C;
            case 1: return Note.Db;
            case 2: return Note.D;
            case 3: return Note.Eb;
            case 4: return Note.E;
            case 5: return Note.F;
            case 6: return Note.Gb;
            case 7: return Note.G;
            case 8: return Note.Ab;
            case 9: return Note.A;
            case 10: return Note.Bb;
            case 11: return Note.B;
            default: throw RangeError("cannot convert number to note (out of range):" + noteVal);
        }
    })();
}
function scaleDegree(scale, degree) {
    let note = scale.root;
    let iDegree = 0;
    while (iDegree < (degree - 1)) {
        const i = iDegree % scale.intervals.length;
        note = shiftNote(note, scale.intervals[i]);
        iDegree++;
    }
    return note;
}
function vlChordNotes(c) {
    let chordNotes = [];
    for (let t of c.tones) {
        chordNotes.push(scaleDegree(c.scale, t));
    }
    return chordNotes;
}
// shiftChordScaleDiatonically
function shiftScaleDiatonically(s, diatonicInterval) {
    const numIntervalShifts = scaleDegreesInDiatonicInterval(diatonicInterval);
    const retVal = { ...s };
    retVal.root = scaleDegree(s, numIntervalShifts + 1);
    retVal.intervals = shiftIntervals(s.intervals, numIntervalShifts);
    return retVal;
}
// shiftChordTonesByMap changes the tones of a chord based on a mapping - it does not change the chord scale
//
// i.e. the chord tones [1,3,5] shifted with a map {1:3, 5:4, 3:7} will result in chord tones [3,7,4]
//
// -  The map must contain a key entry for every chord tone - if not an error is thrown
// -  The ordering of the map has not affect on the resulting chord tones; i.e. the ordering of the original tones
//    is preserved once the map is applied
function shiftChordTonesByMap(chordTones, mapping) {
    if (chordTones.length != mapping.size) {
        throw new RangeError("empty inversion map");
    }
    const retVal = [];
    for (let i = 0; i < chordTones.length; i++) {
        const newTone = mapping.get(chordTones[i]);
        if (newTone == undefined) {
            throw RangeError("cannot shift chord tone; mapping does not contain all chords tones. Tones:" + chordTones + " Mapping:" + mapping);
        }
        retVal.push(newTone);
    }
    return retVal;
}
// shiftChordToNextNearestInversion inverts the chord (changing only the chord tones)
// by moving each chord tone to nearest chord tone above it.
//
// e.g. chord tones [1,3,5] will be inverted to [3,5,1]
//      chord tones [1,5,3,7] will be inverted to [3,7,5,1]
function shiftChordToNextNearestInversion(chord, numShifts = 1) {
    const sortedTones = (0, util_1.cloneDeep)(chord.tones);
    sortedTones.sort((a, b) => a - b);
    let shiftMap = new Map();
    for (let i = 0; i < sortedTones.length; i++) {
        let destI = (i + numShifts) % sortedTones.length;
        shiftMap.set(sortedTones[i], sortedTones[destI]);
    }
    let chordCopy = (0, util_1.cloneDeep)(chord);
    chordCopy.tones = shiftChordTonesByMap(chordCopy.tones, shiftMap);
    return chordCopy;
}
// A tetrad voicing describes the order the four voices of a tetrad are stacked in.
//
// `Close` is the four chord tones stacked as tightly as possible; the others drop one
// or two of those voices below the rest. Between them the six voicings put the chord
// tones in all 24 of the orders four voices can be stacked in - four per voicing, one
// for each inversion.
//
// Dropping a voice which is already at the bottom, or dropping the bottom two voices
// together, leaves the order they are stacked in unchanged - so drop 4 and drop 3+4
// sound wider than a close voicing but are stacked in the same order as one, and are
// not counted here.
var TetradVoicing;
(function (TetradVoicing) {
    TetradVoicing["Close"] = "Close";
    TetradVoicing["Drop2"] = "Drop2";
    TetradVoicing["Drop3"] = "Drop3";
    TetradVoicing["Drop2And3"] = "Drop2And3";
    TetradVoicing["Drop2And4"] = "Drop2And4";
    TetradVoicing["Spread"] = "Spread";
})(TetradVoicing || (exports.TetradVoicing = TetradVoicing = {}));
// tetradVoicings lists every voicing, in the order they are conventionally shown.
exports.tetradVoicings = [
    TetradVoicing.Close,
    TetradVoicing.Drop2,
    TetradVoicing.Drop3,
    TetradVoicing.Drop2And3,
    TetradVoicing.Drop2And4,
    TetradVoicing.Spread,
];
// numTetradVoices is the number of voices in a tetrad.
exports.numTetradVoices = 4;
// The ways a triad can be voiced: its three voices packed into an octave, or spread out
// over more than one.
var TriadVoicing;
(function (TriadVoicing) {
    TriadVoicing["Close"] = "Close";
    TriadVoicing["Open"] = "Open";
})(TriadVoicing || (exports.TriadVoicing = TriadVoicing = {}));
// triadVoicings lists every triad voicing, in the order they are conventionally shown.
exports.triadVoicings = [
    TriadVoicing.Close,
    TriadVoicing.Open,
];
// numTriadVoices is the number of voices in a triad.
exports.numTriadVoices = 3;
// The seventh chords a scale stacks in thirds on its degrees. Between them these cover
// every tetrad the four diatonic scale types build on any of their degrees.
var TetradQuality;
(function (TetradQuality) {
    TetradQuality["Major7"] = "Major7";
    TetradQuality["Dominant7"] = "Dominant7";
    TetradQuality["Minor7"] = "Minor7";
    TetradQuality["MinorMajor7"] = "MinorMajor7";
    TetradQuality["HalfDiminished7"] = "HalfDiminished7";
    TetradQuality["Diminished7"] = "Diminished7";
    TetradQuality["Major7_sharp5"] = "Major7_sharp5";
    TetradQuality["Dominant7_sharp5"] = "Dominant7_sharp5";
})(TetradQuality || (exports.TetradQuality = TetradQuality = {}));
// tetradQualityAtScaleDegree names the seventh chord the scale stacks on one of its
// degrees, from the semitones between that degree and the third, fifth and seventh the
// scale puts above it.
function tetradQualityAtScaleDegree(s, rootDegree) {
    const semiTonesAbove = (chordDegree) => semiTonesBetweenScaleDegreesUpwards(s, rootDegree, rootDegree + chordDegree - 1);
    const third = semiTonesAbove(3);
    const fifth = semiTonesAbove(5);
    const seventh = semiTonesAbove(7);
    switch ([third, fifth, seventh].join()) {
        case "4,7,11": return TetradQuality.Major7;
        case "4,7,10": return TetradQuality.Dominant7;
        case "3,7,10": return TetradQuality.Minor7;
        case "3,7,11": return TetradQuality.MinorMajor7;
        case "3,6,10": return TetradQuality.HalfDiminished7;
        case "3,6,9": return TetradQuality.Diminished7;
        case "4,8,11": return TetradQuality.Major7_sharp5;
        case "4,8,10": return TetradQuality.Dominant7_sharp5;
        default: throw RangeError("cannot name the tetrad on scale degree " + rootDegree + "; no seventh chord stacks a third of " + third + " semitones under a fifth of " + fifth + " and a seventh of " + seventh);
    }
}
function degreesPerOctave(c) {
    return c.scale.intervals.length;
}
function sortedVoices(c) {
    return [...c.tones].sort((a, b) => a - b);
}
// normaliseVoicing shifts the whole voicing by whole octaves until its lowest voice
// sits in the first octave of the scale.
//
// Every voice moves together, so neither the shape of the voicing nor the notes it
// sounds are changed - only the scale degrees used to describe it.
function normaliseVoicing(c) {
    if (c.tones.length == 0) {
        throw new RangeError("cannot normalise a voicing with no voices");
    }
    const octave = degreesPerOctave(c);
    const octavesBelowFirst = Math.floor((Math.min(...c.tones) - 1) / octave);
    return {
        ...c,
        tones: c.tones.map((t) => t - (octavesBelowFirst * octave)),
    };
}
// voicingScaleDegrees returns the scale degree each voice of the voicing sounds, from
// the lowest voice up to the highest, with the octaves taken off.
//
// e.g. the close tetrad [1,3,5,7] and the drop 2 voicing [5,8,10,14] built from it give
//      [1,3,5,7] and [5,1,3,7] - the order the chord tones are stacked in
function voicingScaleDegrees(c) {
    const octave = degreesPerOctave(c);
    return sortedVoices(c).map((t) => (((t - 1) % octave) + octave) % octave + 1);
}
// invertVoicing inverts the voicing by taking its lowest voice up an octave, so that
// the voicing sounds the same chord tones but sits on the next one up.
//
// e.g. the close tetrad [1,3,5,7] inverted once is [3,5,7,8]
function invertVoicing(c, numInversions = 1) {
    if (numInversions < 0) {
        throw new RangeError("cannot invert a voicing a negative number of times:" + numInversions);
    }
    const octave = degreesPerOctave(c);
    const voices = sortedVoices(c);
    for (let i = 0; i < numInversions; i++) {
        const lowest = voices.shift();
        if (lowest == undefined) {
            throw new RangeError("got undefined voice whilst inverting voicing");
        }
        voices.push(lowest + octave);
    }
    return normaliseVoicing({ ...c, tones: voices });
}
// shiftVoicesByOctaves moves each of the given voices by its own number of octaves. The
// shifts are all measured against the voicing as it is passed in, so a voice moving past
// another does not change which voice the later shifts refer to.
function shiftVoicesByOctaves(c, shifts) {
    const octave = degreesPerOctave(c);
    const voices = sortedVoices(c);
    for (const s of shifts) {
        const i = voices.length - s.voiceFromTop;
        if (i < 0 || i >= voices.length) {
            throw new RangeError("cannot shift voice; voicing of " + voices.length + " voices has no voice " + s.voiceFromTop + " from the top");
        }
        voices[i] = voices[i] + (s.octaves * octave);
    }
    voices.sort((a, b) => a - b);
    return normaliseVoicing({ ...c, tones: voices });
}
// dropVoices takes the given voices down an octave. Voices are counted down from the
// top of the voicing, so voice 1 is the highest sounding voice.
//
// e.g. dropping voice 2 of the close tetrad [1,3,5,7] takes the 5 to the bottom,
//      giving the drop 2 voicing [5,1,3,7] (normalised to [5,8,10,14])
function dropVoices(c, voicesFromTop) {
    return shiftVoicesByOctaves(c, voicesFromTop.map((v) => ({ voiceFromTop: v, octaves: -1 })));
}
// raiseVoices takes the given voices up an octave. Voices are counted up from the
// bottom of the voicing, so voice 1 is the lowest sounding voice.
//
// e.g. raising voice 2 of the close tetrad [1,3,5,7] takes the 3 to the top,
//      giving the raise 2 voicing [1,5,7,3] (normalised to [1,5,7,10])
function raiseVoices(c, voicesFromBottom) {
    return shiftVoicesByOctaves(c, voicesFromBottom.map((v) => ({ voiceFromTop: c.tones.length + 1 - v, octaves: 1 })));
}
// applyTetradVoicing spreads the tetrad's voices out into the given voicing.
function applyTetradVoicing(c, voicing) {
    switch (voicing) {
        case TetradVoicing.Close: return normaliseVoicing({ ...c, tones: sortedVoices(c) });
        case TetradVoicing.Drop2: return dropVoices(c, [2]);
        case TetradVoicing.Drop3: return dropVoices(c, [3]);
        case TetradVoicing.Drop2And3: return dropVoices(c, [2, 3]);
        case TetradVoicing.Drop2And4: return dropVoices(c, [2, 4]);
        // the widest voicing: dropping voice 2 two octaves and voice 3 one octave turns the
        // close voicing upside down, stacking the chord tones in sixths rather than thirds.
        // No combination of single octave drops reaches this order.
        case TetradVoicing.Spread: return shiftVoicesByOctaves(c, [
            { voiceFromTop: 2, octaves: -2 },
            { voiceFromTop: 3, octaves: -1 },
        ]);
        default: throw RangeError("cannot voice tetrad for unknown voicing:" + voicing);
    }
}
// tetradVoicing returns the given inversion of the given voicing of a tetrad.
//
// The tetrad's tones are taken to be its close voicing. The chord is inverted first
// and the voicing is then spread out over that inversion.
function tetradVoicing(c, voicing, inversion) {
    if (c.tones.length != exports.numTetradVoices) {
        throw new RangeError("cannot voice a tetrad of " + c.tones.length + " voices");
    }
    return applyTetradVoicing(invertVoicing(c, inversion), voicing);
}
// applyTriadVoicing spreads the triad's voices out into the given voicing.
function applyTriadVoicing(c, voicing) {
    switch (voicing) {
        case TriadVoicing.Close: return normaliseVoicing({ ...c, tones: sortedVoices(c) });
        // the middle voice goes up an octave, over the top voice. The lowest voice stays
        // where it is, so the open voicing keeps the bass of the close one it is made from:
        // the close root position [1,3,5] opens out to [1,5,3].
        case TriadVoicing.Open: return raiseVoices(c, [2]);
        default: throw RangeError("cannot voice triad for unknown voicing:" + voicing);
    }
}
// triadVoicing returns the given inversion of the given voicing of a triad.
//
// The triad's tones are taken to be its close voicing. The chord is inverted first
// and the voicing is then spread out over that inversion.
function triadVoicing(c, voicing, inversion) {
    if (c.tones.length != exports.numTriadVoices) {
        throw new RangeError("cannot voice a triad of " + c.tones.length + " voices");
    }
    return applyTriadVoicing(invertVoicing(c, inversion), voicing);
}
function createCycle(startingChord, intervalShift, chordToneMapping, maxChords = 30) {
    let cycle = [];
    cycle.push(startingChord);
    let next = { ...startingChord };
    for (let i = 0; i < maxChords - 1; i++) {
        next.scale = shiftScaleDiatonically(next.scale, intervalShift);
        next.tones = shiftChordTonesByMap(next.tones, chordToneMapping);
        if ((0, util_1.isEqual)(next, startingChord)) {
            break;
        }
        cycle.push({ ...next });
    }
    return cycle;
}
