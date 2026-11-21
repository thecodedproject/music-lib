import "./stave.css";
import { ReactNode } from "react";
import { Clef } from "../theory/clef";
import { KeySignature, Measure } from "../theory/notation";
export declare const staveSpace = 10;
export declare const positionY: (pos: number) => number;
export declare const positionAtY: (y: number) => number;
export interface EventLayout {
    measure: number;
    index: number;
    id?: number;
    x: number;
    pos?: number;
}
export interface StaveLayout {
    clef: Clef;
    events: EventLayout[];
    measures: {
        x1: number;
        x2: number;
    }[];
    notesX: number;
    width: number;
    top: number;
    bottom: number;
}
export interface StaveProps {
    measures: Measure[];
    keySignature: KeySignature;
    clef?: Clef;
    timeSignature?: [number, number];
    slotsPerBeat: number;
    beatWidth?: number;
    highlight?: number;
    endBarline?: "repeat" | "final" | "plain";
    className?: string;
    noteClasses?: Record<number, string>;
    extent?: [number, number];
    overlay?: (layout: StaveLayout) => ReactNode;
    scale?: number;
}
export declare function Stave({ measures, keySignature, timeSignature, slotsPerBeat, beatWidth, highlight, endBarline, className, clef, noteClasses, extent, overlay, scale, }: StaveProps): import("react").JSX.Element;
