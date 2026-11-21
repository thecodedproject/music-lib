export interface PlayerNote {
    midi: number;
    slots: number;
}
export interface PlayerLoop {
    slotsPerBeat: number;
    beatsPerBar: number;
    numBars: number;
    notes: (PlayerNote[] | undefined)[];
}
export interface PlayerPosition {
    loop: number;
    slot: number;
}
export type PlayerState = "stopped" | "playing" | "paused";
export interface PlayerOptions {
    loopAt: (loop: number) => PlayerLoop;
    onPosition: (position: PlayerPosition | undefined) => void;
    tempo: number;
    clickOn: boolean;
    notesOn: boolean;
}
export declare class PatternPlayer {
    private options;
    private ctx?;
    private clickGain?;
    private noteGain?;
    private state;
    private timer?;
    private frame?;
    private next;
    private nextTime;
    private slotsPerBeat?;
    private plays;
    private pending;
    constructor(options: PlayerOptions);
    getState(): PlayerState;
    scheduledLoop(): number;
    setTempo(bpm: number): void;
    setClickOn(on: boolean): void;
    setNotesOn(on: boolean): void;
    play(): Promise<void>;
    pause(): Promise<void>;
    stop(): void;
    dispose(): void;
    private connectOutputs;
    private stopTimers;
    private schedule;
    private track;
    private click;
    private note;
}
