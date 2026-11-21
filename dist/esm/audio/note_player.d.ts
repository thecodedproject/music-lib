export interface Voice {
    sound(ctx: BaseAudioContext, dest: AudioNode, time: number, midi: number, length: number, level: number): void;
}
export declare const midiFrequency: (midi: number) => number;
export declare const struckVoice: Voice;
export interface SequenceNote {
    midi: number[];
    beats: number;
}
export interface PlayOptions {
    bpm?: number;
    onStep?: (index: number) => void;
}
export declare class NotePlayer {
    private newContext;
    private ctx?;
    private out?;
    private timers;
    private finish?;
    volume: number;
    voice: Voice;
    constructor(newContext?: () => AudioContext);
    ensure(): AudioContext;
    playSequence(steps: SequenceNote[], opts?: PlayOptions): Promise<void>;
    playNote(midi: number, seconds?: number): void;
    stop(): void;
    chime(correct: boolean): void;
}
export declare function newAudioContext(): AudioContext;
