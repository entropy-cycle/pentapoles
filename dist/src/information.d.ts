import { Polarity } from "./polarity";
import { EnvironmentRoot } from "./envbase";
import { Vector3 } from "./vector";
type EnvironmentalState = 'emission' | 'absorption' | 'vibration' | 'execution' | 'mediation';
export declare class Information {
    parent: EnvironmentRoot;
    source: EnvironmentRoot;
    radius: Vector3;
    polarity: Polarity;
    state: EnvironmentalState;
    constructor(parent: EnvironmentRoot, source: EnvironmentRoot, radius: Vector3);
    polarityBetween(other: Information): Polarity;
    advanceState(): EnvironmentalState;
    static NULL: Information;
    toString(): string;
    clone(): Information;
}
export {};
