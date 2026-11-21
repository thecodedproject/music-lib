"use strict";
// The names the music enums are conventionally written under, kept together here so
// that every table labels the same thing the same way.
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeLabels = exports.tetradQualityLabels = exports.scaleDegreeNumerals = exports.inversionLabels = exports.triadVoicingLabels = exports.voicingLabels = void 0;
const chord_anthology_1 = require("./chord_anthology");
exports.voicingLabels = {
    [chord_anthology_1.TetradVoicing.Close]: "Close",
    [chord_anthology_1.TetradVoicing.Drop2]: "Drop 2",
    [chord_anthology_1.TetradVoicing.Drop3]: "Drop 3",
    [chord_anthology_1.TetradVoicing.Drop2And3]: "Drop 2+3",
    [chord_anthology_1.TetradVoicing.Drop2And4]: "Drop 2+4",
    [chord_anthology_1.TetradVoicing.Spread]: "Spread",
};
exports.triadVoicingLabels = {
    [chord_anthology_1.TriadVoicing.Close]: "Close",
    [chord_anthology_1.TriadVoicing.Open]: "Open",
};
// there is one inversion per chord voice; the first is the chord in root position
exports.inversionLabels = ["Root", "1st", "2nd", "3rd"];
// the scale degrees a chord can be built on, written as harmony numbers them
exports.scaleDegreeNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];
// the suffixes a seventh chord is written with, after the note it is rooted on
exports.tetradQualityLabels = {
    [chord_anthology_1.TetradQuality.Major7]: "maj7",
    [chord_anthology_1.TetradQuality.Dominant7]: "7",
    [chord_anthology_1.TetradQuality.Minor7]: "m7",
    [chord_anthology_1.TetradQuality.MinorMajor7]: "mMaj7",
    [chord_anthology_1.TetradQuality.HalfDiminished7]: "m7♭5",
    [chord_anthology_1.TetradQuality.Diminished7]: "dim7",
    [chord_anthology_1.TetradQuality.Major7_sharp5]: "maj7♯5",
    [chord_anthology_1.TetradQuality.Dominant7_sharp5]: "7♯5",
};
// the modes of the major scale keep their own names; the modes of the other scales are
// named for the major scale mode they alter, and the degree they alter it at
exports.modeLabels = {
    [chord_anthology_1.Mode.Ionian]: "Ionian",
    [chord_anthology_1.Mode.Dorian]: "Dorian",
    [chord_anthology_1.Mode.Phrygian]: "Phrygian",
    [chord_anthology_1.Mode.Lydian]: "Lydian",
    [chord_anthology_1.Mode.Mixolydian]: "Mixolydian",
    [chord_anthology_1.Mode.Aeolian]: "Aeolian",
    [chord_anthology_1.Mode.Locrian]: "Locrian",
    [chord_anthology_1.Mode.Ionian_b3]: "Ionian ♭3",
    [chord_anthology_1.Mode.Dorian_b2]: "Dorian ♭2",
    [chord_anthology_1.Mode.Phrygian_b1]: "Phrygian ♭1",
    [chord_anthology_1.Mode.Lydian_b7]: "Lydian ♭7",
    [chord_anthology_1.Mode.Mixolydian_b6]: "Mixolydian ♭6",
    [chord_anthology_1.Mode.Aeolian_b5]: "Aeolian ♭5",
    [chord_anthology_1.Mode.Locrian_b4]: "Locrian ♭4",
    [chord_anthology_1.Mode.Ionian_sharp5]: "Ionian ♯5",
    [chord_anthology_1.Mode.Dorian_sharp4]: "Dorian ♯4",
    [chord_anthology_1.Mode.Phrygian_natural3]: "Phrygian ♮3",
    [chord_anthology_1.Mode.Lydian_sharp2]: "Lydian ♯2",
    [chord_anthology_1.Mode.Mixolydian_sharp1]: "Mixolydian ♯1",
    [chord_anthology_1.Mode.Aeolian_natural7]: "Aeolian ♮7",
    [chord_anthology_1.Mode.Locrian_natural6]: "Locrian ♮6",
    [chord_anthology_1.Mode.Ionian_b6]: "Ionian ♭6",
    [chord_anthology_1.Mode.Dorian_b5]: "Dorian ♭5",
    [chord_anthology_1.Mode.Phrygian_b4]: "Phrygian ♭4",
    [chord_anthology_1.Mode.Lydian_b3]: "Lydian ♭3",
    [chord_anthology_1.Mode.Mixolydian_b2]: "Mixolydian ♭2",
    [chord_anthology_1.Mode.Aeolian_b1]: "Aeolian ♭1",
    [chord_anthology_1.Mode.Locrian_bb7]: "Locrian ♭♭7",
};
