export declare enum Note {
    C = "C",
    Db = "Db",
    D = "D",
    Eb = "Eb",
    E = "E",
    F = "F",
    Gb = "Gb",
    G = "G",
    Ab = "Ab",
    A = "A",
    Bb = "Bb",
    B = "B"
}
export declare enum Interval {
    Unison = "Unison",
    MinorSecond = "MinorSecond",
    MajorSecond = "MajorSecond",
    MinorThird = "MinorThird",
    MajorThird = "MajorThird",
    Fourth = "Fourth",
    DiminishedFifth = "DiminishedFifth",
    PerfectFifth = "PerfectFifth",
    AugmentedFifth = "AugmentedFifth",
    Sixth = "Sixth",
    MinorSeven = "MinorSeven",
    MajorSeven = "MajorSeven"
}
export declare enum ScaleType {
    Major = "Major",
    MelodicMinor = "MelodicMinor",
    HarmonicMinor = "HarmonicMinor",
    HarmonicMajor = "HarmonicMajor"
}
export declare enum DiatonicInterval {
    Unison = "Unison",
    Second = "Second",
    Third = "Third",
    Fourth = "Fourth",
    Fifth = "Fifth",
    Sixth = "Sixth",
    Seventh = "Seventh"
}
export declare enum Mode {
    Ionian = "Ionian",
    Dorian = "Dorian",
    Phrygian = "Phrygian",
    Lydian = "Lydian",
    Mixolydian = "Mixolydian",
    Aeolian = "Aeolian",
    Locrian = "Locrian",
    Ionian_b3 = "Ionian_b3",
    Dorian_b2 = "Dorian_b2",
    Phrygian_b1 = "Phrygian_b1",
    Lydian_b7 = "Lydian_b7",
    Mixolydian_b6 = "Mixolydian_b6",
    Aeolian_b5 = "Aeolian_b5",
    Locrian_b4 = "Locrian_b4",
    Ionian_sharp5 = "Ionian_sharp5",
    Dorian_sharp4 = "Dorian_sharp4",
    Phrygian_natural3 = "Phrygian_natural3",
    Lydian_sharp2 = "Lydian_sharp2",
    Mixolydian_sharp1 = "Mixolydian_sharp1",
    Aeolian_natural7 = "Aeolian_natural7",
    Locrian_natural6 = "Locrian_natural6",
    Ionian_b6 = "Ionian_b6",
    Dorian_b5 = "Dorian_b5",
    Phrygian_b4 = "Phrygian_b4",
    Lydian_b3 = "Lydian_b3",
    Mixolydian_b2 = "Mixolydian_b2",
    Aeolian_b1 = "Aeolian_b1",
    Locrian_bb7 = "Locrian_bb7"
}
export interface Scale {
    root: Note;
    intervals: Interval[];
}
export interface VoiceLeadingChord {
    scale: Scale;
    tones: number[];
}
export declare function scaleTypeForMode(mode: Mode): ScaleType;
export declare function diatonicScaleIntervals(mode: Mode): Interval[];
export declare function semiTonesBetweenNotesUpwards(lowerNote: Note, upperNote: Note): number;
export declare function intervalBetweenNotesUpwards(lowerNote: Note, upperNote: Note): Interval;
export declare function diatonicIntervalBetweenScaleDegreesUpwards(s: Scale, lowerDegree: number, upperDegree: number): DiatonicInterval;
export declare function scaleDegreesInDiatonicInterval(i: DiatonicInterval): number;
export declare function diatonicScale(root: Note, mode: Mode): Scale;
export declare function modeForScale(s: Scale): Mode;
export declare function scaleFromIonianRoot(ionianRoot: Note, scaleType: ScaleType, startingScaleDegree: number): Scale;
export declare function scaleNotes(s: Scale, octave?: number): Note[];
export declare function scaleDegreeNotes(s: Scale, degrees: number[], octaves?: number): Note[];
export declare function semiTonesInInterval(i: Interval): number;
export declare function semiTonesBetweenScaleDegreesUpwards(s: Scale, lowerDegree: number, upperDegree: number): number;
export declare function shiftNote(n: Note, i: Interval): Note;
export declare function scaleDegree(scale: Scale, degree: number): Note;
export declare function vlChordNotes(c: VoiceLeadingChord): Note[];
export declare function shiftScaleDiatonically(s: Scale, diatonicInterval: DiatonicInterval): Scale;
export declare function shiftChordTonesByMap(chordTones: readonly number[], mapping: Map<number, number>): number[];
export declare function shiftChordToNextNearestInversion(chord: VoiceLeadingChord, numShifts?: number): VoiceLeadingChord;
export declare enum TetradVoicing {
    Close = "Close",
    Drop2 = "Drop2",
    Drop3 = "Drop3",
    Drop2And3 = "Drop2And3",
    Drop2And4 = "Drop2And4",
    Spread = "Spread"
}
export declare const tetradVoicings: TetradVoicing[];
export declare const numTetradVoices = 4;
export declare enum TriadVoicing {
    Close = "Close",
    Open = "Open"
}
export declare const triadVoicings: TriadVoicing[];
export declare const numTriadVoices = 3;
export declare enum TetradQuality {
    Major7 = "Major7",
    Dominant7 = "Dominant7",
    Minor7 = "Minor7",
    MinorMajor7 = "MinorMajor7",
    HalfDiminished7 = "HalfDiminished7",
    Diminished7 = "Diminished7",
    Major7_sharp5 = "Major7_sharp5",
    Dominant7_sharp5 = "Dominant7_sharp5"
}
export declare function tetradQualityAtScaleDegree(s: Scale, rootDegree: number): TetradQuality;
export declare function normaliseVoicing(c: VoiceLeadingChord): VoiceLeadingChord;
export declare function voicingScaleDegrees(c: VoiceLeadingChord): number[];
export declare function invertVoicing(c: VoiceLeadingChord, numInversions?: number): VoiceLeadingChord;
export interface VoiceShift {
    voiceFromTop: number;
    octaves: number;
}
export declare function shiftVoicesByOctaves(c: VoiceLeadingChord, shifts: VoiceShift[]): VoiceLeadingChord;
export declare function dropVoices(c: VoiceLeadingChord, voicesFromTop: number[]): VoiceLeadingChord;
export declare function raiseVoices(c: VoiceLeadingChord, voicesFromBottom: number[]): VoiceLeadingChord;
export declare function applyTetradVoicing(c: VoiceLeadingChord, voicing: TetradVoicing): VoiceLeadingChord;
export declare function tetradVoicing(c: VoiceLeadingChord, voicing: TetradVoicing, inversion: number): VoiceLeadingChord;
export declare function applyTriadVoicing(c: VoiceLeadingChord, voicing: TriadVoicing): VoiceLeadingChord;
export declare function triadVoicing(c: VoiceLeadingChord, voicing: TriadVoicing, inversion: number): VoiceLeadingChord;
export declare function createCycle(startingChord: VoiceLeadingChord, intervalShift: DiatonicInterval, chordToneMapping: Map<number, number>, maxChords?: number): VoiceLeadingChord[];
